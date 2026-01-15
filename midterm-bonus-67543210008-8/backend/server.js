// backend/server.js
const express = require('express');
const bookRoutes = require('./src/presentation/routes/bookRoutes');
const corsMiddleware = require('./src/presentation/middlewares/cors');
const errorHandler = require('./src/presentation/middlewares/errorHandler');

const app = express();

// 🆕 Middleware
app.use(corsMiddleware);  // เพิ่ม CORS
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Error handling
app.use(errorHandler);

// 🆕 แก้ PORT และ Log message
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`
╔═══════════════════════════════════════════════════╗
║  Library Management System API (Server)           ║
║  Server running on http://172.26.192.162:${PORT}     ║
║  API: http://localhost:${PORT}/api/books             ║
╚═══════════════════════════════════════════════════╝
    `);
});

// Handle errors
server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught exception:', error);
    process.exit(1);
});