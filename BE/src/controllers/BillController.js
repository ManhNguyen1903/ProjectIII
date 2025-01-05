const mongoose = require("mongoose");
const Table = require("../models/TableFood");  // Assuming Table model is imported
const Bill = require("../models/Bill");    

// CREATE - Tạo hóa đơn mới
const createBill = async (req, res) => {
  try {
    const { idTable, billInfo = [] } = req.body;

    // Kiểm tra thông tin bàn và hóa đơn
    if (!idTable) {
      return res.status(400).json({ message: "Table ID is required." });
    }

    // Kiểm tra nếu bàn đã tồn tại và có trạng thái là 'empty'
    const table = await Table.findById(idTable); 
    if (!table) {
      return res.status(404).json({ message: "Table not found." });
    }
    
    // Nếu trạng thái bàn không phải 'empty', trả về lỗi
    if (table.status !== 'empty') {
      return res.status(400).json({ message: "The table is not empty." });
    }

    // Tạo hóa đơn mới với trạng thái 'pending'
    const newBill = new Bill({
      idTable,
      billInfo: billInfo, // Mới tạo không có món ăn, chỉ có billInfo rỗng
      status: "pending",  // Hóa đơn được tạo với trạng thái pending
      totalPrice: 0,      // Tổng giá ban đầu là 0
    });

    // Lưu hóa đơn vào cơ sở dữ liệu
    const savedBill = await newBill.save();

    // Cập nhật trạng thái bàn thành 'occupied'
    table.status = "occupied";
    await table.save();

    // Trả về hóa đơn mới vừa tạo
    res.status(201).json(savedBill);  // Trả lại hóa đơn đã được tạo thành công
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating bill", error });
  }
};

const getBillByTableId = async (req, res) => {
  try {
    const { idTable } = req.params;
    const bill = await Bill.findOne({
      idTable,
      status: { $in: ["pending", "processing"] },
    }).populate("idTable").populate("billInfo.productId");

    if (!bill) {
      return res.status(404).json({ message: "No active bill found for this table" });
    }

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bill for table", error });
  }
};

// READ - Lấy danh sách hóa đơn
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().populate("idTable").populate("billInfo.productId");
    res.status(200).json(bills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills", error });
  }
};

// READ - Lấy một hóa đơn theo ID
const getBillById = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)
      .populate("idTable")
      .populate("billInfo.productId");
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bill", error });
  }
};

// UPDATE - Cập nhật hóa đơn
const updateProductBill = async (req, res) => {
  const session = await mongoose.startSession(); // Bắt đầu session
  session.startTransaction();

  try {
    const { id } = req.params; // ID hóa đơn
    const { productId } = req.body; // ID sản phẩm, số lượng mặc định là 1

    // Kiểm tra hóa đơn
    const bill = await Bill.findById(id).session(session);
    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    // Kiểm tra nếu sản phẩm đã tồn tại trong hóa đơn
    const productIndex = bill.billInfo.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex > -1) {
      // Sản phẩm đã tồn tại => Tăng số lượng lên 1
      bill.billInfo[productIndex].quantity += 1;
    } else {
      // Sản phẩm chưa tồn tại => Thêm vào hóa đơn
      bill.billInfo.push({ productId, quantity: 1, note: "" });
    }

    // Cập nhật tổng giá hóa đơn
    await bill.populate("billInfo.productId");
    bill.totalPrice = bill.billInfo.reduce((total, item) => {
      return total + item.quantity * (item.productId.price || 0);
    }, 0);

    // Lưu hóa đơn
    await bill.save({ session });

    // Commit transaction
    await session.commitTransaction();
    session.endSession();

    res.status(200).json(bill);
  } catch (error) {
    // Rollback transaction nếu lỗi
    await session.abortTransaction();
    session.endSession();

    console.error("Error updating bill:", error);
    res.status(500).json({ message: "Error updating bill", error });
  }
};

// DELETE - Xóa hóa đơn
const deleteBill = async (req, res) => {
  try {
    const deletedBill = await Bill.findByIdAndDelete(req.params.id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bill deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting bill", error });
  }
};

// UPDATE - Cập nhật trạng thái hóa đơn thành "paid"
const updateBillStatus = async (req, res) => {
  const { id } = req.params;  // ID hóa đơn từ request params
  const { status, dateCheckOut } = req.body; // Nhận thêm dateCheckOut từ body

  // Kiểm tra trạng thái cập nhật hợp lệ
  if (!['pending', 'processing','complete', 'paid'].includes(status)) {
    return res.status(400).json({ message: 'Trạng thái không hợp lệ' });
  }

  try {
    const bill = await Bill.findById(id); // Tìm hóa đơn theo ID

    if (!bill) {
      return res.status(404).json({ message: "Hóa đơn không tìm thấy" });
    }

    // Cập nhật ngày thanh toán (checkout) nếu trạng thái là 'paid'
    if (status === 'paid' && !bill.dateCheckOut) {
      bill.dateCheckOut = dateCheckOut || new Date();
    }

    // Cập nhật trạng thái hóa đơn
    bill.status = status;

    // Lưu lại hóa đơn đã cập nhật
    await bill.save();

    res.status(200).json({
      message: "Hóa đơn đã được cập nhật",
      bill: bill
    });
  } catch (error) {
    console.error("Lỗi khi cập nhật trạng thái hóa đơn:", error);
    res.status(500).json({ message: "Lỗi khi cập nhật trạng thái hóa đơn", error });
  }
};


module.exports = {
  createBill,
  getBillByTableId,
  getBills,
  getBillById,
  updateProductBill,
  deleteBill,
  updateBillStatus
};
