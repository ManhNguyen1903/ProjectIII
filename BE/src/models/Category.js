const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Tạo schema cho Category
const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  }

);

module.exports = mongoose.model('Category', CategorySchema);
