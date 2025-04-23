// server/app.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const fs = require('fs');

// Créer les dossiers nécessaires s'ils n'existent pas
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const whatsappAuthDir = path.join(__dirname, '.wwebjs_auth');
if (!fs.existsSync(whatsappAuthDir)) {
  fs.mkdirSync(whatsappAuthDir, { recursive: true });
}

// Import routes
const bookingRoutes = require('./routes/bookingRoutes');
const priceRoutes = require('./routes/priceRoutes');
const userRoutes = require('./routes/userRoutes');
const contactRoutes = require('./routes/contactRoutes');
const whatsappRoutes = require('./routes/whatsappRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Pour servir les fichiers QR code générés par WhatsApp
app.use('/public', express.static(path.join(__dirname, 'public')));

// Middleware pour vérifier l'état de WhatsApp
app.use((req, res, next) => {
  // Log simple pour vérifier l'état du service WhatsApp
  if (req.path.startsWith('/api/whatsapp')) {
    const whatsappService = require('./services/whatsappService');
    console.log('État du service WhatsApp:', whatsappService.getStatus());
  }
  next();
});

// Define Routes
app.use('/api/bookings', bookingRoutes);
app.use('/api/price', priceRoutes);
app.use('/api/users', userRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/whatsapp', whatsappRoutes);

// Route simple pour vérifier que le serveur est opérationnel
app.get('/healthcheck', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Le serveur est opérationnel',
    timestamp: new Date().toISOString()
  });
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });
}

// Error handling middleware
app.use(errorHandler);

module.exports = app;