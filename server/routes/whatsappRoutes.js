// server/routes/whatsappRoutes.js
const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

// @route   GET /api/whatsapp/status
// @desc    Obtenir le statut de la connexion WhatsApp
// @access  Admin
router.get('/status', whatsappController.getStatus);

// @route   POST /api/whatsapp/restart
// @desc    Redémarrer le client WhatsApp
// @access  Admin
router.post('/restart', whatsappController.restart);

// @route   POST /api/whatsapp/send-test
// @desc    Envoyer un message de test
// @access  Admin
router.post('/send-test', whatsappController.sendTest);

// @route   GET /api/whatsapp/qr
// @desc    Obtenir le QR code actuel
// @access  Admin
router.get('/qr', whatsappController.getQR);

module.exports = router;