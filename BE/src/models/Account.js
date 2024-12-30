const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  username: String,
  password: String,
  fullname: String
});

module.exports = mongoose.model('Account', accountSchema);
