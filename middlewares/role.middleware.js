// middlewares/role.middleware.js
import ApiError from "../utils/ApiError.js";

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      // Make sure authMiddleware ran first
      return next(new ApiError("User not authenticated", 401));
    }

    if (req.user.role !== role) {
      return next(new ApiError(`Access denied: ${role} role required`, 403));
    }

    next(); // User has the required role
  };
};
