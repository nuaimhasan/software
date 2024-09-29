const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const role = "seo";
    let tokenName = role + "_token";

    const token = req.cookies[tokenName];

    if (!token) {
      return res.json({
        success: false,
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded?.email) {
      req.user = decoded;
      next();
    } else {
      return res.json({
        success: false,
        message: "You are not authorized",
      });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      error,
    });
  }
};
