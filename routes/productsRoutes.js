import express from "express";
import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productsController.js";
import {
  createProductValidator,
  updateProductValidator,
  productIdValidator,
} from "../validators/productValidator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", productIdValidator, validate, getSingleProduct);
router.post("/products", createProductValidator, validate, createProduct);
router.put("/products/:id", updateProductValidator, validate, updateProduct);
router.delete("/products/:id", productIdValidator, validate, deleteProduct);

export default router;
