import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/verifyToken.js";
import {
  add,
  allUsers,
  loggedUser,
  login,
  logout,
} from "../controllers/userController.js";

router.post("/add", add);
router.post("/login", login);
router.get("/logout", logout);
router.get("/all", allUsers);
router.get("/me", verifyToken, loggedUser);

export default router;
