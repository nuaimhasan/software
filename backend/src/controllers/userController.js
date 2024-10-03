const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateToken } = require("../utils/generateToken");

exports.add = async (req, res) => {
  const data = req?.body;

  try {
    // check user is already exist
    const user = await User.findOne({ email: data?.email });

    if (user) {
      return res.status(404).json({
        success: false,
        error: "user already exist",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const result = await User.create({ ...data, password: hashedPassword });

    if (!result) {
      return res.status(404).json({
        success: false,
        error: "user not added",
      });
    }

    res.status(201).json({
      success: true,
      message: "user added successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// login, step:1. check user is exiest, 2. match password, 3. generate token, 4. set cookies, 5. response
exports.login = async (req, res) => {
  const data = req?.body;

  try {
    const user = await User.findOne({ email: data?.email });

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
      return res.json({
        success: false,
        message: "invalid password",
      });
    }

    // generate token
    const token = generateToken(
      { email: data?.email, password: data?.password },
      "24h"
    );

    // set cookies
    res.cookie(user?.role + "_token", token, {
      expires: new Date(Date.now() + 86400000),
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "user login successfully",
      token,
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// logout and clear cookies
exports.logout = async (req, res) => {
  try {
    const { role } = req?.query;

    res.clearCookie(role + "_token");

    res.status(200).json({
      success: true,
      message: "user logout successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// logged user
exports.loggedUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.user?.email });

    if (!user) {
      return res.json({
        success: false,
        message: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user found",
      data: user,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// all users
exports.allUsers = async (req, res) => {
  const { user } = req?.query;
  try {
    let query = {};
    if (user) {
      query.role = user;
    }

    const users = await User.find(query);

    if (!users) {
      return res.json({
        success: false,
        error: "users not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "users found",
      data: users,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
};
