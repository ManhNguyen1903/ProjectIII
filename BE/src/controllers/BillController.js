const Bill = require('../models/Bill');

// Lấy tất cả hóa đơn
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate('idTable').populate('billInfo.productId');
    res.json(bills);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Lấy hóa đơn theo ID
exports.getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('idTable').populate('billInfo.productId');
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Tạo một hóa đơn mới
exports.createBill = async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(201).json(newBill);
  } catch (err) {
    res.status(500).json({ message: "Error creating bill" });
  }
};

// Cập nhật trạng thái hóa đơn (Thanh toán, đang xử lý...)
exports.updateBillStatus = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.json(bill);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
