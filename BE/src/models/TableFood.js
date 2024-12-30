const mongoose = require('mongoose');

const tableFoodSchema = new mongoose.Schema({
  tableName: String,
  status: String
});

module.exports = mongoose.model('TableFood', tableFoodSchema);
