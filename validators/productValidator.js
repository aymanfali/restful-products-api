import { body, param } from "express-validator";

export const createProductValidator = [
  body("name")
    .notEmpty()
    .withMessage("Product name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
];

export const updateProductValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),
  body("name")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("price")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("Price must be greater than 0"),
  body("description")
    .optional()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters"),
];

export const productIdValidator = [
  param("id").isMongoId().withMessage("Invalid product ID"),
];
