import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { Token } from "../models/tokenModel.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";
import ApiError from "../utils/ApiError.js";

/* REGISTER */
export const register = async (name, email, password) => {
  const normalizedEmail = email.toLowerCase();
  const existingUser = await User.findOne({ email: normalizedEmail });
  if (existingUser) throw new ApiError("Email already in use", 400);

  const user = new User({ name, email: normalizedEmail, password });
  await user.save();

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await Token.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

/* LOGIN */
export const login = async (email, password) => {
  const normalizedEmail = email.toLowerCase();
  const user = await User.findOne({ email: normalizedEmail });
  if (!user || !(await user.comparePassword(password)))
    throw new ApiError("Invalid credentials", 401);

  await Token.deleteMany({ userId: user._id });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await Token.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

/* REFRESH */
export const refreshToken = async (currentRefreshToken) => {
  if (!currentRefreshToken) throw new ApiError("Refresh token required", 400);

  const storedToken = await Token.findOneAndDelete({
    token: currentRefreshToken,
  });
  if (!storedToken) throw new ApiError("Invalid or expired refresh token", 401);

  let payload;
  try {
    payload = jwt.verify(currentRefreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    throw new ApiError("Invalid or expired refresh token", 401);
  }

  const user = await User.findById(payload.id);
  if (!user) throw new ApiError("User not found", 404);

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  await Token.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return { accessToken, refreshToken };
};

/* LOGOUT */
export const logout = async (currentRefreshToken) => {
  if (!currentRefreshToken) throw new ApiError("Refresh token required", 400);

  const deleted = await Token.findOneAndDelete({ token: currentRefreshToken });
  if (!deleted)
    throw new ApiError("Refresh token not found or already logged out", 404);

  return { message: "Logged out successfully" };
};
