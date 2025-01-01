const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.post("/", ProductController.createProduct);
router.get("/", ProductController.getProducts);

module.exports = router;
