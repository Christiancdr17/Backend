const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const uploadPath = path.join(__dirname, 'uploads'); // Carpeta de destino para las imágenes

// Configuración de Multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage: storage });

// Ruta para manejar el envío del formulario
app.post('/books', upload.single('book[image]'), (req, res) => {
  // Aquí puedes procesar los datos del formulario y la imagen adjunta
  const bookData = req.body.book;
  const imageName = req.file.filename;

  // Ejemplo de cómo mostrar la información recibida
  console.log('Datos del libro:', bookData);
  console.log('Nombre de la imagen:', imageName);

  // Lógica adicional para guardar la información en la base de datos, etc.

  res.send('¡Imagen y datos recibidos!');
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});
