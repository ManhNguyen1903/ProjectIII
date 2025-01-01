const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Import Category model
const Category = require('./Category');

// Tạo schema cho Product
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  image: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category', // Tham chiếu đến Category
    required: true
  },
  status: { type: String, default: 'available' },
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
