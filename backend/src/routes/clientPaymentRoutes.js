const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const { add, all, single } = require("../controllers/clientPaymentController");

router.post("/add", verifyToken, add);
router.get("/all", verifyToken, all);
router.get("/:id", verifyToken, single);

module.exports = router;
