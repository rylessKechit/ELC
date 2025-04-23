// server/services/whatsappService.js
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');

class WhatsAppService {
  constructor() {
    this.client = null;
    this.isReady = false;
    this.sessionDataPath = path.join(__dirname, '../.wwebjs_auth');
    this.qrFilePath = path.join(__dirname, '../public/whatsapp-qr.txt');
    this.connectionStatus = 'disconnected';
    
    // Logs pour le débogage
    console.log('Chemin session WhatsApp:', this.sessionDataPath);
    console.log('Chemin QR code:', this.qrFilePath);
    
    // Vérifier si les dossiers existent
    console.log('Dossier session existe:', fs.existsSync(this.sessionDataPath));
    console.log('Dossier public existe:', fs.existsSync(path.dirname(this.qrFilePath)));
    
    this.init();
  }

  init() {
    // Créer les dossiers nécessaires
    try {
      if (!fs.existsSync(this.sessionDataPath)) {
        fs.mkdirSync(this.sessionDataPath, { recursive: true });
        console.log('Dossier session créé');
      }
      
      const publicDir = path.dirname(this.qrFilePath);
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
        console.log('Dossier public créé');
      }
    } catch (error) {
      console.error('Erreur lors de la création des dossiers:', error);
    }

    // Configuration spécifique pour Railway
    try {
      this.client = new Client({
        authStrategy: new LocalAuth({
          clientId: 'taxi-vlb-server',
          dataPath: this.sessionDataPath
        }),
        puppeteer: {
          headless: true,
          args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
          ],
        }
      });

      // Gérer l'événement QR code
      this.client.on('qr', (qr) => {
        this.connectionStatus = 'qr-received';
        console.log('QR Code reçu. Scannez-le avec WhatsApp sur votre téléphone.');
        
        // Générer QR code dans le terminal
        qrcode.generate(qr, { small: true });
        
        // Sauvegarder le QR code dans un fichier
        try {
          fs.writeFileSync(this.qrFilePath, qr);
          console.log(`QR code sauvegardé dans: ${this.qrFilePath}`);
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du QR code:', error);
        }
      });

      // Gérer l'initialisation du client
      this.client.on('ready', () => {
        this.isReady = true;
        this.connectionStatus = 'connected';
        console.log('Client WhatsApp prêt!');
      });

      // Gérer les erreurs d'authentification
      this.client.on('auth_failure', (error) => {
        this.connectionStatus = 'auth-failed';
        console.error('Échec d\'authentification WhatsApp:', error);
      });

      // Gérer la déconnexion
      this.client.on('disconnected', (reason) => {
        this.isReady = false;
        this.connectionStatus = 'disconnected';
        console.log('Client WhatsApp déconnecté:', reason);
        
        // Réinitialiser la session et reconnecter après un délai
        setTimeout(() => {
          console.log('Tentative de reconnexion WhatsApp...');
          this.client.initialize();
        }, 10000);
      });

      // Initialiser le client
      console.log('Initialisation du client WhatsApp...');
      this.client.initialize().catch(err => {
        console.error('Erreur lors de l\'initialisation du client WhatsApp:', err);
      });
      
    } catch (error) {
      console.error('Erreur lors de la création du client WhatsApp:', error);
    }
  }

  async sendMessage(phoneNumber, message) {
    if (!this.isReady) {
      console.warn('Client WhatsApp non prêt. Message non envoyé.');
      return { success: false, error: 'Client not ready' };
    }

    try {
      // Formater le numéro de téléphone (ajouter @c.us)
      const formattedNumber = phoneNumber.includes('@c.us') 
        ? phoneNumber 
        : `${phoneNumber.replace(/[^0-9]/g, '')}@c.us`;

      // Vérifier si le numéro existe sur WhatsApp
      const isRegistered = await this.client.isRegisteredUser(formattedNumber);
      if (!isRegistered) {
        console.warn(`Le numéro ${phoneNumber} n'est pas enregistré sur WhatsApp.`);
        return { success: false, error: 'Number not registered on WhatsApp' };
      }

      // Envoyer le message
      const result = await this.client.sendMessage(formattedNumber, message);
      console.log(`Message envoyé à ${phoneNumber}`);
      return { success: true, messageId: result.id._serialized };
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }

  getStatus() {
    return {
      isReady: this.isReady,
      status: this.connectionStatus,
      sessionPath: this.sessionDataPath,
      qrPath: this.qrFilePath,
      sessionExists: fs.existsSync(this.sessionDataPath),
      publicDirExists: fs.existsSync(path.dirname(this.qrFilePath))
    };
  }

  // Méthode pour redémarrer le client
  async restart() {
    try {
      console.log('Redémarrage du client WhatsApp...');
      if (this.client) {
        await this.client.destroy();
      }
      this.init();
      return { success: true };
    } catch (error) {
      console.error('Erreur lors du redémarrage du client WhatsApp:', error);
      return { success: false, error: error.message };
    }
  }
}

// Créer l'instance et l'exporter
const whatsappService = new WhatsAppService();
module.exports = whatsappService;