import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} from "../controllers/productController.js";

const router = express.Router();

// PUBLIC ROUTES
router.get("/", getProducts);
router.get("/:idOrSlug", getProduct);

// ADMIN ROUTES (protect later if needed)
router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
