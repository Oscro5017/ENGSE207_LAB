// ============================================
// Contact Routes
// Developer: สมหญิง (Backend Dev)
// ============================================

const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// GET /api/contacts - ดูรายชื่อทั้งหมด
router.get('/contacts', contactController.getAllContacts);

// GET /api/contacts/:id - ดูรายชื่อตาม ID
router.get('/contacts/:id', contactController.getContactById);

// POST /api/contacts - เพิ่มรายชื่อใหม่
router.post('/contacts', contactController.createContact);

// DELETE /api/contacts/:id - ลบรายชื่อ
router.delete('/contacts/:id', contactController.deleteContact);

module.exports = router;