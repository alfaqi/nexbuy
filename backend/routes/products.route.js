import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductByName,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/search", getProductByName);

export default router;
