const Book = require('../models/Book');
const multer = require('multer');
const fs = require('fs');

exports.index = async (req, res) => {
  const books = await Book.find();
  res.render('books/index', { books });
};

exports.new = (req, res) => {
  res.render('books/new');
};

exports.create = async (req, res) => {
  // const { title, author, description, category, price} = req.body.book;
  const image = req.file.filename;
  const book = new Book(req.body.book);
  book.image = image;
 console.log("esta es la imagen creada", image)
 

    // const book = new Book({
    //   title,
    //   author,
    //   description,
    //   category,
    //   price,
    //   image
    // });

  await book.save();
  res.redirect(`/books/${book._id}`);
};

exports.show = async (req, res) => {
  const book = await Book.findById(req.params.id);
  console.log(req.params.id);
  res.render('books/show', { book });
  console.log('books/show', { book })
};

exports.edit = async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render('books/edit', { book });
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByIdAndUpdate(id, { ...req.body.book });
  res.redirect(`/books/${book._id}`);
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  

  const libroeliminar = await Book.findByIdAndDelete(id);
  libroeliminar.eliminarArchivo();
  res.redirect('/books');
};