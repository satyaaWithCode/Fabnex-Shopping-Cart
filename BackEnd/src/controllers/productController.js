import Product from "../models/Product.js";
import mongoose from "mongoose";

// GET all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// GET single product by slug or _id
export const getProduct = async (req, res) => {
  try {
    const idOrSlug = req.params.idOrSlug;

    // check if Mongo ObjectId
    if (mongoose.Types.ObjectId.isValid(idOrSlug)) {
      const p = await Product.findById(idOrSlug);
      if (p) return res.json(p);
    }

    // else search by slug
    const product = await Product.findOne({ slug: idOrSlug });
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// CREATE product (admin)
export const createProduct = async (req, res) => {
  try {
    const p = new Product(req.body);
    await p.save();
    res.status(201).json(p);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// UPDATE product
export const updateProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json(p);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE product
export const deleteProduct = async (req, res) => {
  try {
    const p = await Product.findByIdAndDelete(req.params.id);
    if (!p) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
