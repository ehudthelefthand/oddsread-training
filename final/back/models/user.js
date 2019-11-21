const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: String,
  passwordHash: String,
  remember: String,
  reads: [{
    type: Schema.Types.ObjectId,
    ref: 'Book'
  }]
});

module.exports = mongoose.model('User', UserSchema);