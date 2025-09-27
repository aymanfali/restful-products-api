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
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { requireRole } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", productIdValidator, validate, getSingleProduct);
router.post(
  "/products",
  authMiddleware,
  createProductValidator,
  validate,
  createProduct
);
router.put(
  "/products/:id",
  authMiddleware,
  updateProductValidator,
  validate,
  updateProduct
);
router.delete(
  "/products/:id",
  authMiddleware,
  requireRole("admin"),
  productIdValidator,
  validate,
  deleteProduct
);

export default router;
