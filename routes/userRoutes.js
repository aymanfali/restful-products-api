import express from "express";
import * as authController from "../controllers/userController.js";
import {
  registerValidator,
  loginValidator,
  refreshValidator,
  logoutValidator,
} from "../validators/userValidator.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, authController.getProfile);

router.post("/register", registerValidator, authController.register);
router.post("/login", loginValidator, authController.login);
router.post("/refresh", refreshValidator, authController.refresh);
router.post("/logout", logoutValidator, authController.logout);

export default router;
