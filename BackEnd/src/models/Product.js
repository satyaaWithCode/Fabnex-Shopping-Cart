import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  price: { type: Number, required: true },
  comparePrice: { type: Number },
  tag: { type: String },
  images: [String],
  shortDesc: { type: String },
  longDesc: { type: String },
  sizes: { type: [String], default: ["S", "M", "L", "XL"] },
  stock: { type: Number, default: 100 },
  createdAt: { type: Date, default: Date.now }
});

// Auto-generate slug if missing
productSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export default mongoose.model("Product", productSchema);
