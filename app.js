const express = require('express');
const dotenv = require("dotenv")
//const bootstrap = require('bootstrap');
const mongoose = require('mongoose');
const path = require('path');
const nodemailer = require('nodemailer');

dotenv.config();
const app = express();

port = 3000


// Configuración de la base de datos
URI = 'mongodb://127.0.0.1:27017/Bookstore'
mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on('error', err => {
  console.error('Error de conexión a la base de datos:', err);
});

// Configuración de la aplicación
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use("/assets", express.static(__dirname + "/public"));

// Controladores
const homeController = require('./controllers/homeController');
const bookRoutes = require("./routes/books")
//const emailroutes = require("./routes/emails")
// const userRoutes = require("./routes/users")

app.use('/', bookRoutes);
// app.use('/', userRoutes);

//app.use('/', emailroutes);

// Rutas
app.get('/', homeController.index);

// Inicio del servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});

