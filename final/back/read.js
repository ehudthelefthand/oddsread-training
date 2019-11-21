'use strict';

const Book = require('./models/book');

exports.listRead = async (req, res) => {
  try {
    await req.User
      .populate('reads')
      .execPopulate();
    res.json(req.User.reads);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

exports.addRead = async (req, res) => {
  const { _id } = req.body;
  try {
    const book = await Book
      .findById(_id)
      .populate('readers')
      .exec();
    if (!req.User.reads.includes(book._id)) {
      req.User.reads.push(book._id);
      await req.User.save();
    }
    if (!book.readers.includes(req.User._id)) {
      book.readers.push(req.User._id);
      await book.save();
    }
    res.json(book);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}

exports.removeRead = async (req, res) => {
  const bookId = req.params.id;
  const user = req.User;
  try {
    const book = await Book
      .findById(bookId)
      .populate('readers')
      .exec();
    book.readers = book.readers.filter(r => r._id !== user._id);
    await book.save();
    user.reads = user.reads.filter(b => b !== bookId);
    await user.save();
    res.sendStatus(200);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
}