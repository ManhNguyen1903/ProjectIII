const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  dateCheckIn: Date,
  dateCheckOut: Date,
  idTable: { type: mongoose.Schema.Types.ObjectId, ref: 'TableFood' },
  status: String,
  totalPrice: Number,
  discount: Number,
  billInfo: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      count: Number
    }
  ]
});

module.exports = mongoose.model('Bill', billSchema);
