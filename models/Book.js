const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path')


const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  category: String,
  image: String,
  price: Number,
});

bookSchema.methods.eliminarArchivo = function() {
  const ruta = path.join(__dirname, '..','public/uploads'); // Reemplaza con la ruta deseada
  const nombreArchivo = this.image; // Suponiendo que el nombre del archivo se almacena en el campo 'image'

  // Construir la ruta completa del archivo
  const rutaCompleta = path.join(ruta, nombreArchivo);

  // Verificar si el archivo existe
  if (fs.existsSync(rutaCompleta)) {
    try {
      // Eliminar el archivo
      fs.unlinkSync(rutaCompleta);
      console.log('Archivo eliminado exitosamente:', rutaCompleta);
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
    }
  } else {
    console.log('El archivo no existe:', rutaCompleta);
  }
};

  
const Book = mongoose.model('Book', bookSchema);
module.exports = Book;
// module.exports = mongoose.model('Book', bookSchema);