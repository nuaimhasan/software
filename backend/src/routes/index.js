const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const user = require("../routes/userRoutes");
const client = require("../routes/clientRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------
router.use("/user", user);
router.use("/client", client);

module.exports = router;
