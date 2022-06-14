const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.create(req.body);
      res.send(book);
    }
    catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    res.send(books);
  })
  .get('/:id', async (req, res) => {
    const book = await Book.getById(req.params.id);
    res.send(book);
  });
