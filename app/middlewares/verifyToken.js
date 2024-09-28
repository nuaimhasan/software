import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json({
        success: false,
        error: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({
      success: false,
      error,
    });
  }
};
