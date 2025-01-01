const express = require("express");
const router = express.Router();
const upload = require("../middlewares/upload");

// API upload ảnh
router.post("/image", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  // Trả về đường dẫn ảnh
  const filePath = `http://localhost:8017/uploads/${req.file.filename}`;
  res.status(200).json({ url: filePath });
});

module.exports = router;
