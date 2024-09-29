const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const verifySeo = require("../middleware/verifySeo");
const { add, all } = require("../controllers/clientController");

router.post("/add", verifySeo, add);
router.get("/all", verifyToken, all);

module.exports = router;
