const express = require('express');
const EmailController = require('../controllers/emailcontroller');

const router = express.Router();

router.get('/emails', EmailController.emails)
router.post('/send-email', EmailController.sendEmail);
router.get('/success', EmailController.emails)

module.exports = router;
