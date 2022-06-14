const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const author = await Author.create(req.body);
      res.json(author);
    }
    catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    res.send(authors);
  })
  .get('/:id', async (req, res) => {
    const author = await Author.getById(req.params.id);
    res.send(author);
  });
