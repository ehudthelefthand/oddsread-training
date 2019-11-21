'use strict';

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cookieParser = require('cookie-parser');

const { signup, signin, signout, session } = require('./user');
const { createBook, listBook, deleteBook } = require('./book');
const { listRead, addRead, removeRead } = require('./read');
const { getUser, requireUser } = require('./mw');

const port = 8000;
const mongoHost = 'localhost';
const mongoPort = 27017;
const mongoDBName = 'oddsread';

mongoose.connect(`mongodb://${mongoHost}:${mongoPort}/${mongoDBName}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});
const upload = multer({ storage })
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/images', express.static('uploads'));

app.get('/session', getUser, requireUser, session);
app.post('/signup', signup);
app.post('/signin', signin);
app.post('/signout', getUser, signout);
app.post('/books', getUser, requireUser, upload.single('cover'), createBook);
app.get('/books', getUser, requireUser, listBook);
app.post('/books/:id', getUser, requireUser, deleteBook);
app.get('/reads', getUser, requireUser, listRead);
app.post('/reads', getUser, requireUser, addRead);
app.delete('/reads/:id', getUser, requireUser, removeRead);

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
