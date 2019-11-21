const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  tags: [String],
  cover: String,
  readers: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

BookSchema.path('cover').get((v) => {
  return `/images/${v}`
});
BookSchema.set('toJSON', { getters: true, virtuals: false });

module.exports = mongoose.model('Book', BookSchema);