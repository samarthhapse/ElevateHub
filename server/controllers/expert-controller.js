import { Expert } from "../models/expert-model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Student } from "../models/student-model.js";
import OTP from "../models/otp-model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const register = async (req, res) => {
    try {
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
            avatar,
            GoogleLogin,
        } = req.body;

        // Validation checks for required fields
        if (!GoogleLogin) {
            if (
                !name ||
                !password ||
                !confirmPassword ||
                !phoneNo ||
                !expertise ||
                !field ||
                !jobTitle
            ) {
                return res.status(400).json({
                    message: "All fields are required",
                    success: false,
                });
            }
            if (password !== confirmPassword) {
                return res.status(400).json({
                    message: "Passwords do not match",
                    success: false,
                });
            }
        }

        // Check if the email already exists
        const userExists = await Expert.findOne({ email });
        if (userExists) {
            return res.status(400).json({
                message: "Email already exists, try a different email",
                success: false,
            });
        }

        // OTP verification if not GoogleLogin
        if (!GoogleLogin) {
            const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1);
            if (!recentOtp || otp !== recentOtp.otp) {
                return res.status(400).json({
                    message: "Invalid OTP",
                    success: false,
                });
            }

            // Upload avatar to Cloudinary
            const avatarLocalPath = req.files?.avatar[0]?.path;
            if (!avatarLocalPath) {
                return res.status(401).json({
                    message: "Avatar is required",
                    success: false,
                });
            }

            const avatarUrl = await uploadOnCloudinary(avatarLocalPath);
            if (!avatarUrl) {
                return res.status(401).json({
                    message: "Avatar upload failed",
                    success: false,
                });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await Expert.create({
            name,
            email,
            phoneNo,
            password: hashedPassword,
            expertise,
            field,
            jobTitle,
            avatar: avatar?.url || avatar, // Assuming avatar is already a URL if not GoogleLogin
        });

        if (!newUser) {
            return res.status(500).json({
                message: "Internal server error, failed to create user",
                success: false,
            });
        }

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (err) {
        console.error("Error while registering:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
            success: false,
        });
    }
};


export const login = async (req, res) => {
    try {
        const { email, password, GoogleLogin } = req.body;

        // Validation checks for required fields
        if (!email || (!GoogleLogin && !password)) {
            return res.status(400).json({
                message: "All fields are required",
                success: false,
            });
        }

        // Find user by email
        const user = await Expert.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "No user with the given email. Try signing up",
                success: false,
            });
        }

        // Validate password if not GoogleLogin
        if (!GoogleLogin) {
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.status(400).json({
                    message: "Incorrect username or password",
                    success: false,
                });
            }
        }

        // Generate JWT token
        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
            expiresIn: "1d",
        });

        // Return user data and token
        const userData = await Expert.findById(user._id).select("-password");
        return res.status(200).json({
            token,
            userData,
            message: "Logged in successfully.",
            success: true,
        });
    } catch (err) {
        console.error("Error while logging in:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
            success: false,
        });
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
            return res.status(500).json({
                message: "internal server error",
                err,
                success: false,
            });
        }
        return res.status(200).json({ userDetails: user, success: true });
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
            return res.status(500).json({
                message: "internal server error",
                err,
                success: false,
            });
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
        return res.status(401).json({
            message: "Unauthorized access",
            success: false,
        });
    }
    const { updatedData } = req.body;
    try {
        const user = await Expert.findByIdAndUpdate(
            userId,
            { $set: updatedData },
            { new: true }
        ).select("-password");
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }
        return res.status(200).json({
            user,
            success: true,
        });
    } catch (err) {
        console.error("Error while updating expert details:", err);
        return res.status(500).json({
            message: "Internal server error",
            error: err.message,
            success: false,
        });
    }
};
