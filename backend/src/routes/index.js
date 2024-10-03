const express = require("express");
const router = express.Router();

//------------------------------------------------------------------------------
// import Routes
//------------------------------------------------------------------------------
const user = require("../routes/userRoutes");

const service = require("../routes/serviceRoutes");
const client = require("../routes/clientRoutes");
const clientPayament = require("../routes/clientPaymentRoutes");

const asign = require("../routes/asignProjectRoutes");

//------------------------------------------------------------------------------
// use Routes
//------------------------------------------------------------------------------
router.use("/user", user);

router.use("/service", service);
router.use("/client", client);
router.use("/client/payment", clientPayament);

router.use("/project/asign", asign);

module.exports = router;
