/* @flow */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: Schema.ObjectId,
  sub: String,
  name: String,
  email: String
});

module.exports = mongoose.model('User', UserSchema);
