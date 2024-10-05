const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const user = require("../routes/userRoutes");

const service = require("../routes/serviceRoutes");
const client = require("../routes/clientRoutes");
const clientPayament = require("../routes/clientPaymentRoutes");

const developerProject = require("../routes/developerProjectRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------
router.use("/user", user);

router.use("/service", service);
router.use("/client", client);
router.use("/client/payment", clientPayament);

router.use("/project/developer", developerProject);

module.exports = router;
