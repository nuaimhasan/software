import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config.js";

export const generateToken = (payload, expiresIn) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-empty object");
  }

  try {
    const token = jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn,
    });
    return token;
  } catch (error) {
    console.log(error);
  }
};
