import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res
      .status(401)
      .json({ message: "You must be logged in to access this resource!" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Authentication token is missing. Please log in!" });

  try {
    const payload = verifyAccessToken(token);
    req.user = payload; // attach user info to request
    next();
  } catch (err) {
    return res
      .status(403)
      .json({
        message:
          "Your session has expired or the token is invalid. Please log in again!",
      });
  }
};
