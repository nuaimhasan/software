const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const hpp = require("hpp");
const cookieParser = require("cookie-parser");
const apiRoutes = require("./src/routes/index");

require("dotenv").config();
const port = process.env.PORT || 3051;

const app = express();

// middlewares "https://www.software.emanagerit.com",
app.use(
  cors({
    origin: [
      "https://software.emanagerit.com",
      "https://www.software.emanagerit.com",
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(hpp());
app.use(cookieParser());
app.use(express.json({ limit: process.env.MAX_JSON_SIZE }));
app.use(express.urlencoded({ extended: process.env.URL_ENCODED }));
const limiter = rateLimit({
  windowMs: process.env.REQUEST_LIMIT_TIME,
  max: process.env.REQUEST_LIMIT_NUMBER,
});
app.use(limiter);

// Web cache validation and conditional requests in Http
// app.set("etag", true);

// Serve static assets for React front end
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

// API Routes
app.use("/api", apiRoutes);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});
