import bcrypt from "bcrypt";
import User from "../models/userModel.js";
import { generateToken } from "../utility/generateToken.js";

export const add = async (req, res) => {
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
export const login = async (req, res) => {
  const data = req?.body;

  try {
    const user = await User.findOne({ email: data?.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    const validPassword = await bcrypt.compare(data.password, user.password);

    if (!validPassword) {
      return res.status(404).json({
        success: false,
        error: "invalid password",
      });
    }

    // generate token
    const token = generateToken(
      { email: data?.email, password: data?.password },
      "24h"
    );

    // set cookies
    res.cookie("token", token, {
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// logout and clear cookies
export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "user logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// logged user
export const loggedUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req?.user?.email });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "user not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "user found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// all users
export const allUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({
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
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
