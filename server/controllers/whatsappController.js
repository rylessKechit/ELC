// server/controllers/whatsappController.js
const whatsappService = require('../services/whatsappService');

// @desc    Obtenir le statut actuel du service WhatsApp
// @route   GET /api/whatsapp/status
// @access  Admin
exports.getStatus = (req, res) => {
  try {
    const status = whatsappService.getStatus();
    
    res.status(200).json({
      success: true,
      data: status
    });
  } catch (error) {
    console.error('Erreur lors de la récupération du statut WhatsApp:', error);
    res.status(500).json({ 
      success: false,
      error: error.message
    });
  }
};

// @desc    Redémarrer le client WhatsApp
// @route   POST /api/whatsapp/restart
// @access  Admin
exports.restart = async (req, res) => {
  try {
    const result = await whatsappService.restart();
    res.status(200).json({
      success: result.success,
      message: result.success ? 'Client WhatsApp redémarré' : result.error
    });
  } catch (error) {
    console.error('Erreur lors du redémarrage du client WhatsApp:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Envoyer un message de test
// @route   POST /api/whatsapp/send-test
// @access  Admin
exports.sendTest = async (req, res) => {
  const { phoneNumber, message } = req.body;
  
  if (!phoneNumber || !message) {
    return res.status(400).json({
      success: false,
      error: 'Le numéro de téléphone et le message sont requis'
    });
  }
  
  try {
    const result = await whatsappService.sendMessage(phoneNumber, message);
    res.status(200).json({
      success: result.success,
      data: result
    });
  } catch (error) {
    console.error('Erreur lors de l\'envoi du message WhatsApp:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// @desc    Obtenir le QR code actuel
// @route   GET /api/whatsapp/qr
// @access  Admin
exports.getQR = (req, res) => {
  try {
    const fs = require('fs');
    const path = require('path');
    const status = whatsappService.getStatus();
    const qrFilePath = status.qrPath;
    
    if (fs.existsSync(qrFilePath)) {
      const qrCode = fs.readFileSync(qrFilePath, 'utf8');
      res.status(200).json({
        success: true,
        data: qrCode
      });
    } else {
      res.status(404).json({
        success: false,
        error: 'QR code non disponible'
      });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du QR code:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};