const mongoose = require("mongoose");

const tableFoodSchema = new mongoose.Schema({
  tableName: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model("TableFood", tableFoodSchema);
