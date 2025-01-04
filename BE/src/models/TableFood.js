// const mongoose = require("mongoose");

// const tableFoodSchema = new mongoose.Schema({
//   tableName: { type: String, required: true },
//   status: { type: String, required: true },
// });

// module.exports = mongoose.model("TableFood", tableFoodSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tableFoodSchema = new Schema(
  {
    tableName: { type: String, required: true, unique: true },
    status: {
      type: String,
      enum: ["empty", "occupied", "reserved"],
      default: "empty",
      required: true,
    },
    currentBill: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bill",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TableFood", tableFoodSchema);
