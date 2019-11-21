'use strict';

const Book = require('./models/book');

exports.createBook = async (req, res) => {
  const { title, tags } = req.body;
  const book = new Book();
  book.title = title;
  book.tags = tags;
  book.cover = req.file.filename;
  try {
    await book.save();
    res.json(book);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

exports.listBook = async (req, res) => {
  try {
    const books = await Book
      .find()
      .populate('readers')
      .exec();
    res.json(books);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};

exports.deleteBook = async (req, res) => {
  const id = req.params.id;
  try {
    await Book.deleteOne({ _id: id }).exec();
    res.json(book);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
};
