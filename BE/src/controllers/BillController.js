const Bill = require("../models/Bill");
const Product = require("../models/Product");

exports.getBill = async (req, res) => {
  try {
    const bills = await Bill.find().populate("idTable billInfo.productId");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBill = async (req, res) => {
  const { billId } = req.params;
  const { billInfo, totalPrice, bartender } = req.body;

  try {
    const bill = await Bill.findByIdAndUpdate(
      billId,
      { billInfo, totalPrice, bartender, status: "processing" },
      { new: true }
    ).populate("billInfo.productId");

    if (!bill) return res.status(404).json({ message: "Bill not found" });
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
