import { Expert } from "../models/expert-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendAuthorizationEmail from "./auth-expert.js"
import { Student } from "../models/student-model.js";
import OTP from "../models/otp-model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const express = import('express');
const app = (await express).default();

//Expert SignUP Endpoint

const pendingExperts = {};

export const register = async (req, res) => {
  try {
    let user, checkStudent;
    const {
      name,
      email,
      phoneNo,
      expertise,
      field,
      jobTitle,
      password,
      confirmPassword,
      otp,
    } = req.body;

    if (
      !name ||
      !password ||
      !confirmPassword ||
      !phoneNo ||
      !expertise ||
      !field ||
      !jobTitle
    ) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ message: "Passwords do not match", success: false });
    }

    const existingUser = await Expert.findOne({ email });
    const existingStudent = await Student.findOne({ email });

    if (existingUser || existingStudent) {
      return res.status(400).json({
        message: "Email already exists, try a different email",
        success: false,
      });
    }

    const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
    if (!recentOtp || otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      return res.status(401).json({
        success: false,
        message: "Avatar is required",
      });
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      return res.status(401).json({
        success: false,
        message: "Avatar upload failed",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    // const newExpert = new Expert({
    //   name,
    //   email,
    //   phoneNo,
    //   password: hashedPassword,
    //   expertise,
    //   field,
    //   jobTitle,
    //   avatar: avatar.url,
    // });

    // // Save the new expert to pending storage
    // pendingExperts[email] = newExpert;

    // // Send authorization email
    // await sendAuthorizationEmail(newExpert);

    // return res.status(200).json({
    //   message: "Registration request sent. Awaiting authorization.",
    //   success: true,
    // });
  } catch (err) {
    console.log("Error while registering:", err);
    return res.status(500).json({
      message: "Internal server error",
      err,
      success: false,
    });
  }
};

//Authorization From Owner Endpoint

// Authorize the expert
// export const authorizeExpert = async (req, res) => {
//   const { email } = req.query;

//   if (pendingExperts[email]) {
//     try {
//       await pendingExperts[email].save();
//       delete pendingExperts[email];
//       res.status(200).json({ message: "Expert authorized and saved to the database." });
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   } else {
//     res.status(400).json({ message: "No pending expert found with this email." });
//   }
// };



//Expert Login Endpoint

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const user = await Expert.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect username or password",
        success: false,
      });
    }
    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      // expiresIn: "1d",
    });
    const userData = await Expert.findById(user._id).select("-password");

    if (!token) {
      return res
        .status(500)
        .json({ message: "internal server error", success: false });
    }
    return res.status(200).json({
      token,
      userData,
      message: "logged in successful.",
      success: true,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", err, success: false });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { email, current_password, new_password, confirm_new_password } =
      req.body;
    if (new_password !== confirm_new_password) {
      return res.status(400).json({
        message: "Confirm password do not match.",
        success: false,
      });
    }
    const user = await Expert.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "No user found!", success: false });
    }
    const isPasswordMatch = await bcrypt.compare(
      current_password,
      user.password
    );
    if (!isPasswordMatch)
      return res.status(400).json({
        message: "Current password is incorrect.",
        success: false,
      });
    const new_hash_pass = await bcrypt.hash(new_password, 10);
    user.password = new_hash_pass;
    await user.save();

    return res
      .status(200)
      .json({ message: "password changed successfully.", success: true });
  } catch (err) {
    return res
      .status(400)
      .json({ message: "internal server error", err, success: false });
  }
};

export const expertDetails = async (req, res) => {
  const userID = req.params.id;
  try {
    const user = await Expert.findById(userID).select("-password");
    if (!user) {
      return res
        .status(500)
        .json({ message: "internal server error", err, success: false });
    }
    return res.status(200).json({ user, success: true });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "internal server error", err, success: false });
  }
};

export const getAllExperts = async (req, res) => {
  try {
    const user = await Expert.find().select("-password");
    if (!user) {
      return res
        .status(500)
        .json({ message: "internal server error", err, success: false });
    }
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "internal server error", err, success: false });
  }
};

export const updateExpertDetails = async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    return res
      .status(401)
      .json({ message: "unauthorized access", success: false });
  }
  const { updatedData } = req.body;
  const user = await Expert.findByIdAndUpdate(
    userId,
    { $set: updatedData },
    { new: true }
  ).select("-password");
  if (!user) {
    return res.status(404).json({ message: "user not found", success: false });
  }
  return res.status(200).json({ user, success: true });
};
