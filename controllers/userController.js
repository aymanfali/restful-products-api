import * as authService from "../services/auth.service.js";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

/* Validation handler */
const handleValidation = (req) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ApiError(
      "Validation failed",
      400,
      errors.array().map((err) => ({ field: err.path, message: err.msg }))
    );
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
      errors: [],
    });
  }
};

/* REGISTER */
export const register = async (req, res) => {
  try {
    handleValidation(req);
    const { name, email, password } = req.body;
    const tokens = await authService.register(name, email, password);
    res.status(201).json({ success: true, data: tokens });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      errors: err.details || [],
    });
  }
};

/* LOGIN */
export const login = async (req, res) => {
  try {
    handleValidation(req);
    const { email, password } = req.body;
    const tokens = await authService.login(email, password);
    res.json({ success: true, data: tokens });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      errors: err.details || [],
    });
  }
};

/* REFRESH */
export const refresh = async (req, res) => {
  try {
    handleValidation(req);
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.json({ success: true, data: tokens });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      errors: err.details || [],
    });
  }
};

/* LOGOUT */
export const logout = async (req, res) => {
  try {
    handleValidation(req);
    const { refreshToken } = req.body;
    const result = await authService.logout(refreshToken);
    res.json({ success: true, data: result });
  } catch (err) {
    res.status(err.status || 500).json({
      success: false,
      message: err.message,
      errors: err.details || [],
    });
  }
};
