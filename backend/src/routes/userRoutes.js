const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  login,
  logout,
  allUsers,
  loggedUser,
} = require("../controllers/userController");

router.post("/add", add);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/all", allUsers);
router.get("/me", verifyToken, loggedUser);

module.exports = router;
