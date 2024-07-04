import { Expert } from "../models/expert-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Student } from "../models/student-model.js";
import OTP from "../models/otp-model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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
        .json({ message: "Password do not match", success: false });
    }
    user = await Expert.findOne({ email });
    checkStudent = await Student.findOne({ email });
    if (user || checkStudent) {
      return res.status(400).json({
        message: "Email already exist, try different email",
        success: false,
      });
    }

    const recentOtp = await OTP.findOne({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (recentOtp.length === 0) {
      return res.status(400).json({
        success: false,
        message: "OTP Not Found!",
      });
    }
    if (otp !== recentOtp.otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    if (!avatarLocalPath) {
      console.log("avatarLocalPath not found");
      return res.status(401).json({
        success: false,
        message: "Avatar is required",
      });
    }
    console.log(avatarLocalPath);
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
      console.log("avatar not uploaded on cloudinary");

      return res.status(401).json({
        success: false,
        message: "Avatar is required",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await Expert.create({
      name,
      email,
      phoneNo,
      password: hashedPassword,
      expertise,
      field,
      jobTitle,
      avatar: avatar.url,
    });
    if (!user) {
      console.log("user not created in database");
      return res
        .status(500)
        .json({ message: "internal server error", success: false });
    }
    return res.status(201).json({
      message: "Account created successfully.",
      success: true,
    });
  } catch (err) {
    console.log("error while registering", err);
    return res
      .status(500)
      .json({ message: "internal server error", err, success: false });
  }
};

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
