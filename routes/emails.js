const express = require('express');
const EmailController = require('../controllers/emailcontroller');

const router = express.Router();

router.get('/emails', EmailController.emails)
router.post('/send-email', EmailController.sendEmail);

module.exports = router;
