import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      trim: true,
    },
    // later we will add addresses, orders, etc.
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
