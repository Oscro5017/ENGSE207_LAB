// ============================================
// Contact Manager - Backend Server
// Developer: สมหญิง (Backend Dev)
// ============================================

const express = require('express');
const cors = require('cors');
const contactRoutes = require('./src/routes/contactRoutes');
const db = require('./src/database/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} | ${req.method} ${req.url}`);
    next();
});

// Health check
app.get('/health', async (req, res) => {
    try {
        await db.query('SELECT 1');
        res.json({
            status: 'ok',
            database: 'connected',
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            database: 'disconnected',
            error: error.message
        });
    }
});

// Routes
app.use('/api', contactRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        error: err.message || 'Internal Server Error'
    });
});

// Start server
async function start() {
    try {
        await db.initialize();
        
        app.listen(PORT, '0.0.0.0', () => {
            console.log('');
            console.log('╔════════════════════════════════════════════════════╗');
            console.log('║         📇 Contact Manager API                     ║');
            console.log('╠════════════════════════════════════════════════════╣');
            console.log(`║  🚀 Server running on port ${PORT}                 ║`);
            console.log('║  📊 Database: PostgreSQL                           ║');
            console.log('║  📍 Endpoints:                                     ║');
            console.log('║     GET    /health                                 ║');
            console.log('║     GET    /api/contacts                           ║');
            console.log('║     POST   /api/contacts                           ║');
            console.log('║     DELETE /api/contacts/:id                       ║');
            console.log('╚════════════════════════════════════════════════════╝');
            console.log('');
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
}

start();