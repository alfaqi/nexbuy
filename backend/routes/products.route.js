import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductName,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.delete("/", getProductName);

export default router;
