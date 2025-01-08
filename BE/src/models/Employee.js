const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  fullname: { type: String, required: true },
  time: { type: String, required: true },
  salary: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  bankInfo: {
    bankName: { type: String, required: true },
    bankNumber: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
