import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: 3,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      minlength: 10,
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
