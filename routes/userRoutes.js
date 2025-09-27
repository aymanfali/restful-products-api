import express from "express";
import { registerUser } from "../controllers/userController.js";
import { registerValidator } from "../validators/userValidator.js";
import { validate } from "../middlewares/validator.middleware.js";

const router = express.Router();

// Registration route
router.post("/register", registerValidator, validate, registerUser);

export default router;
