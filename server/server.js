const app = require('./app');
const config = require('./config/environment');
const connectDB = require('./config/db');

// Afficher les informations de l'environnement
console.log('=== INFORMATIONS ENVIRONNEMENT ===');
console.log(`NODE_ENV: ${config.nodeEnv}`);
console.log(`PORT: ${config.port}`);
console.log(`WhatsApp Notifications: ${config.whatsappNotificationsEnabled ? 'Activées' : 'Désactivées'}`);
console.log('=================================');

// Connect to MongoDB
connectDB();

const PORT = config.port;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${config.nodeEnv} mode on port ${PORT}`);
  console.log(`Server started at: ${new Date().toISOString()}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});