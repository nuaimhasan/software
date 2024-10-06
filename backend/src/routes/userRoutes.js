const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  login,
  logout,
  allUsers,
  loggedUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.post("/add", verifyToken, add);
router.post("/login", login);
router.get("/logout", verifyToken, logout);
router.get("/all", verifyToken, allUsers);
router.get("/me", verifyToken, loggedUser);
router.put("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

module.exports = router;
