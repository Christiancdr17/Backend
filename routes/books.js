const express = require('express');
const router = express.Router();
const multer = require('multer');

const bookController = require('../controllers/bookController');
const EmailController = require('../controllers/emailcontroller');

// Configuración de Multer para subir imágenes

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
    }
  });
  const upload = multer({ storage: storage });


router.get('/books', bookController.index);
router.get('/books/new', bookController.new);
router.post('/books', upload.single('image'), bookController.create);
router.get('/books/:id', bookController.show);
router.get('/books/:id/edit', bookController.edit);
router.post('/books/:id', bookController.update);
router.post('/books/:id/delete', bookController.delete);
router.get('/emails', EmailController.emails)
router.post('/send-email', EmailController.sendEmail);



module.exports = router;