// server/services/whatsappService.js
const { Client, RemoteAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const { MongoStore } = require('wwebjs-mongo');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

class WhatsAppService {
  constructor() {
    // Initialisation des propriétés
    this.client = null;
    this.isReady = false;
    this.qrCodePath = path.join(__dirname, '../public/whatsapp-qr.txt');
    this.qrGenerationInProgress = false;
    this.lastQRGeneration = 0;
    this.qrRefreshInterval = 60000; // 1 minute entre les régénérations
    this.isInitializing = false;
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.reconnectTimeout = null;
    this.clientId = "elc-taxi-app";

    // Utiliser le volume Railway si disponible, sinon chemin par défaut
    this.dataPath = path.join(__dirname, '../.wwebjs_auth');
    
    // S'assurer que les dossiers existent
    if (!fs.existsSync(this.dataPath)) {
      fs.mkdirSync(this.dataPath, { recursive: true });
      console.log(`Dossier de données WhatsApp créé: ${this.dataPath}`);
    }

    const publicDir = path.join(__dirname, '../public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
      console.log(`Dossier public créé: ${publicDir}`);
    }
    
    // Initialisation différée pour laisser le temps à la BD de se connecter
    setTimeout(() => {
      console.log('Démarrage initial du service WhatsApp...');
      this.initialize();
    }, 15000);
  }

  /**
   * Initialise le client WhatsApp avec les bons paramètres
   */
  async initialize() {
    // Éviter les initialisations simultanées
    if (this.isInitializing) {
      console.log('Initialisation du client WhatsApp déjà en cours');
      return;
    }

    this.isInitializing = true;
    
    try {
      // Vérifier si le client est déjà prêt
      if (this.client && this.isReady) {
        console.log('Client WhatsApp déjà initialisé et prêt');
        this.isInitializing = false;
        return;
      }

      console.log('Initialisation du client WhatsApp...');

      // Configuration spécifique pour Puppeteer sur Railway
      const clientOptions = {
        puppeteer: {
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process', // <- Ceci est important sur Railway
            '--disable-gpu'
          ],
          headless: true,
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
          defaultViewport: { width: 1280, height: 720 }
        },
        qrMaxRetries: 5,
        authTimeoutMs: 60000,
        restartOnAuthFail: true
      };

      // Utiliser RemoteAuth avec MongoDB si disponible
      if (mongoose.connection.readyState === 1) {
        try {
          console.log('Configuration de RemoteAuth avec MongoDB...');
          const store = new MongoStore({ mongoose });
          clientOptions.authStrategy = new RemoteAuth({
            store,
            clientId: this.clientId,
            backupSyncIntervalMs: 300000, // 5 minutes
            dataPath: this.dataPath
          });
          console.log('RemoteAuth configurée avec succès');
        } catch (err) {
          console.error('Erreur lors de la configuration de RemoteAuth:', err);
        }
      } else {
        console.warn('MongoDB non connecté, WhatsApp utilisera l\'authentification locale');
      }

      // Création du client WhatsApp
      this.client = new Client(clientOptions);

      // Configuration des écouteurs d'événements
      this.setupEventListeners();

      // Démarrer le client
      console.log('Démarrage du client WhatsApp...');
      await this.client.initialize();
      console.log('Client WhatsApp initialisé avec succès');
    } catch (error) {
      console.error('Erreur lors de l\'initialisation du client WhatsApp:', error);
      
      // Nettoyage
      if (this.client) {
        try {
          await this.client.destroy();
        } catch (e) {
          console.error('Erreur lors de la destruction du client après échec:', e);
        }
        this.client = null;
      }
      
      this.isReady = false;
      
      // Stratégie de reconnexion exponentielle
      this.reconnectAttempts++;
      if (this.reconnectAttempts < this.maxReconnectAttempts) {
        const delay = Math.min(30000 * Math.pow(2, this.reconnectAttempts - 1), 300000);
        console.log(`Tentative de reconnexion #${this.reconnectAttempts} dans ${delay / 1000} secondes...`);
        
        clearTimeout(this.reconnectTimeout);
        this.reconnectTimeout = setTimeout(() => {
          this.isInitializing = false;
          this.initialize();
        }, delay);
      } else {
        console.error(`Nombre maximum de tentatives de reconnexion (${this.maxReconnectAttempts}) atteint`);
      }
    } finally {
      this.isInitializing = false;
    }
  }

  /**
   * Configure tous les écouteurs d'événements pour le client WhatsApp
   */
  setupEventListeners() {
    // Gestion du QR code
    this.client.on('qr', async (qr) => {
      const currentTime = Date.now();
      
      // Limiter la génération du QR code
      if (this.qrGenerationInProgress || (currentTime - this.lastQRGeneration < this.qrRefreshInterval)) {
        return;
      }
      
      this.qrGenerationInProgress = true;
      this.lastQRGeneration = currentTime;
      
      try {
        console.log('Génération du QR code WhatsApp...');
        // Sauvegarder le QR code dans un fichier
        try {
          fs.writeFileSync(this.qrCodePath, qr);
          console.log(`QR code sauvegardé dans: ${this.qrCodePath}`);
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du QR code:', error);
        }
      } catch (error) {
        console.error('Erreur lors de la génération du QR code:', error);
      } finally {
        this.qrGenerationInProgress = false;
      }
    });

    // Gestion de l'authentification
    this.client.on('authenticated', () => {
      console.log('Client WhatsApp authentifié avec succès');
      this.reconnectAttempts = 0;
    });

    // Gestion de l'état prêt
    this.client.on('ready', () => {
      console.log('Client WhatsApp prêt à envoyer des messages');
      this.isReady = true;
      this.reconnectAttempts = 0;
    });

    // Gestion des déconnexions
    this.client.on('disconnected', (reason) => {
      console.log(`Client WhatsApp déconnecté. Raison: ${reason}`);
      this.isReady = false;
      
      // Reconnexion automatique après 30 secondes
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = setTimeout(() => {
        if (!this.isInitializing && !this.isReady) {
          console.log('Tentative de reconnexion automatique après déconnexion...');
          this.initialize();
        }
      }, 30000);
    });

    // Gestion des échecs d'authentification
    this.client.on('auth_failure', (msg) => {
      console.error('Échec d\'authentification WhatsApp:', msg);
      this.isReady = false;
      
      // Essayer de nettoyer le stockage d'auth si problème persistant
      if (this.reconnectAttempts >= 3) {
        console.log('Plusieurs échecs d\'authentification, nettoyage des données d\'authentification...');
        try {
          if (fs.existsSync(this.dataPath)) {
            fs.rmdirSync(this.dataPath, { recursive: true });
            console.log('Données d\'authentification supprimées avec succès');
          }
        } catch (e) {
          console.error('Erreur lors du nettoyage des données d\'authentification:', e);
        }
      }
    });

    // Messages reçus (pour journalisation)
    this.client.on('message', (msg) => {
      console.log(`Message reçu de ${msg.from}: ${msg.body.substring(0, 50)}${msg.body.length > 50 ? '...' : ''}`);
    });
  }

  /**
   * Envoie un message WhatsApp à un numéro donné
   */
  async sendMessage(phoneNumber, message) {
    // Vérifier si le client est prêt
    if (!this.isReady || !this.client) {
      return { 
        success: false, 
        error: 'Client WhatsApp non initialisé ou non connecté' 
      };
    }
    
    try {
      // Formater le numéro pour WhatsApp
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      console.log(`Envoi de message WhatsApp à ${formattedNumber}...`);
      
      // Envoyer le message et attendre la confirmation
      const result = await this.client.sendMessage(formattedNumber, message);
      console.log(`Message envoyé avec succès à ${formattedNumber}, ID: ${result.id._serialized}`);
      
      return {
        success: true,
        messageId: result.id._serialized,
        timestamp: result.timestamp
      };
    } catch (error) {
      console.error(`Erreur lors de l'envoi du message à ${phoneNumber}:`, error);
      return { 
        success: false, 
        error: `Échec d'envoi du message WhatsApp: ${error.message}` 
      };
    }
  }

  /**
   * Formate un numéro de téléphone pour WhatsApp
   */
  formatPhoneNumber(phoneNumber) {
    // Éliminer tous les caractères non numériques sauf le +
    let cleaned = phoneNumber.replace(/[^\d+]/g, '');
    
    // Traitement spécifique pour les numéros français
    if (cleaned.startsWith('+')) cleaned = cleaned.substring(1);
    if (cleaned.startsWith('330')) cleaned = '33' + cleaned.substring(3);
    else if (cleaned.startsWith('0')) cleaned = '33' + cleaned.substring(1);
    else if (!cleaned.startsWith('33') && cleaned.length <= 10) cleaned = '33' + cleaned;
    
    // Format WhatsApp attendu
    return `${cleaned}@c.us`;
  }

  /**
   * Vérifie si un numéro est valide pour WhatsApp
   */
  async isValidWhatsAppNumber(phoneNumber) {
    if (!this.isReady || !this.client) {
      return false;
    }
    
    try {
      const formattedNumber = this.formatPhoneNumber(phoneNumber);
      const isRegistered = await this.client.isRegisteredUser(formattedNumber);
      return isRegistered;
    } catch (error) {
      console.error(`Erreur lors de la vérification du numéro ${phoneNumber}:`, error);
      return false;
    }
  }
  
  /**
   * Retourne l'état actuel du client
   */
  getStatus() {
    return {
      isReady: this.isReady,
      status: this.isReady ? 'connected' : (this.isInitializing ? 'initializing' : 'disconnected'),
      sessionPath: this.dataPath,
      qrPath: this.qrCodePath,
      sessionExists: fs.existsSync(this.dataPath),
      qrExists: fs.existsSync(this.qrCodePath)
    };
  }
  
  /**
   * Indique si le client est prêt
   */
  isClientReady() {
    return this.isReady;
  }

  /**
   * Redémarre le client WhatsApp
   */
  async restart() {
    try {
      console.log('Redémarrage du client WhatsApp...');
      if (this.client) {
        await this.client.destroy();
      }
      this.isReady = false;
      this.isInitializing = false;
      this.initialize();
      return { success: true };
    } catch (error) {
      console.error('Erreur lors du redémarrage du client WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }
}

// Instance singleton du service
const whatsAppService = new WhatsAppService();

// Gérer les arrêts proprement
process.on('SIGTERM', async () => {
  console.log('Signal SIGTERM reçu, nettoyage avant arrêt...');
  try {
    if (whatsAppService && whatsAppService.client) {
      console.log('Déconnexion du client WhatsApp...');
      await whatsAppService.client.destroy();
      console.log('Client WhatsApp déconnecté proprement');
    }
  } catch (error) {
    console.error('Erreur lors de la déconnexion de WhatsApp:', error);
  }
  process.exit(0);
});

module.exports = whatsAppService;