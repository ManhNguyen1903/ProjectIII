const tableFoodService = require("../services/tableFoodService");

const TableFood = require("../models/TableFood");
const Bill = require("../models/Bill");

exports.getTableBill = async (req, res) => {
  try {
    const tables = await TableFood.find().populate("currentBill");
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.selectTable = async (req, res) => {
  const { tableId } = req.params;

  try {
    const table = await TableFood.findById(tableId).populate("currentBill");

    if (!table) {
      return res.status(404).json({ message: "Table not found" });
    }

    if (table.status === "occupied") {
      // Trả về thông tin hóa đơn hiện tại
      return res.status(200).json({ message: "Existing bill", bill: table.currentBill });
    } else if (table.status === "empty") {
      // Tạo hóa đơn mới nếu bàn đang trống
      const newBill = await Bill.create({ idTable: tableId });
      table.currentBill = newBill._id;
      table.status = "occupied";
      await table.save();
      return res.status(201).json({ message: "New bill created", bill: newBill });
    }

    res.status(400).json({ message: "Invalid table status" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateTableStatus = async (req, res) => {
  const { tableId } = req.params;
  const { status } = req.body;

  try {
    const table = await TableFood.findByIdAndUpdate(tableId, { status }, { new: true });
    if (!table) return res.status(404).json({ message: "Table not found" });
    res.status(200).json(table);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Lấy tất cả bàn
exports.getTables = async (req, res) => {
  try {
    const tables = await tableFoodService.getAllTables();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách bàn", error });
  }
};

// Thêm bàn mới
exports.addTable = async (req, res) => {
  try {
    const newTable = await tableFoodService.createTable(req.body);
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi thêm bàn", error });
  }
};

// Sửa bàn
exports.updateTable = async (req, res) => {
  try {
    const updatedTable = await tableFoodService.updateTable(req.params.id, req.body);
    if (!updatedTable) {
      res.status(404).json({ message: "Không tìm thấy bàn này" });
    } else {
      res.status(200).json(updatedTable);
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi cập nhật bàn", error });
  }
};

// Xóa bàn
exports.deleteTable = async (req, res) => {
  try {
    const deletedTable = await tableFoodService.deleteTable(req.params.id);
    if (!deletedTable) {
      res.status(404).json({ message: "Không tìm thấy bàn này" });
    } else {
      res.status(200).json({ message: "Xóa bàn thành công" });
    }
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa bàn", error });
  }
};
