const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verifyToken");
const {
  add,
  all,
  single,
  update,
  destroy,
} = require("../controllers/asignProjectController");

router.post("/add", verifyToken, add);
router.get("/all", verifyToken, all);
router.get("/:id", verifyToken, single);
router.put("/update/:id", verifyToken, update);
router.delete("/delete/:id", verifyToken, destroy);

module.exports = router;
