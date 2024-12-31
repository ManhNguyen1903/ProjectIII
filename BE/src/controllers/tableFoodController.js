const tableFoodService = require("../services/tableFoodService");

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
