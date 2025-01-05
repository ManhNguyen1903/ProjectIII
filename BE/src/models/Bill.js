const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billSchema = new Schema(
  {
    dateCheckIn: { type: Date, default: Date.now },
    dateCheckOut: { type: Date },
    idTable: { type: mongoose.Schema.Types.ObjectId, ref: "TableFood", required: true },
    status: { type: String, enum: ["pending", "processing","complete","delivered", "paid"], default: "pending" },
    totalPrice: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    bartender: { type: String },
    billInfo: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        note: { type: String, default: "" },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bill", billSchema);
