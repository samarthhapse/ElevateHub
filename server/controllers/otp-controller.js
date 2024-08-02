import { Expert } from "../models/expert-model.js";
import OTP from "../models/otp-model.js";
import { Student } from "../models/student-model.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import { otpTemplate } from "../utils/emailTemplates.js";
import { sendMail } from "../utils/mailer.js";

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const expertExists = await Expert.findOne({ email });
    const studentExists = await Student.findOne({ email });
    if (expertExists || studentExists) {
      return res.status(401).json({
        success: false,
        message: "User already registered.",
      });
    }

    // generating a unique otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTP.findOne({ otp });
    while (result) {
      let otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTP.findOne({ otp });
    }
    const otpSent = await OTP.create({
      email,
      otp,
    });
    if (!otpSent) {
      return res
        .status(500)
        .json({ message: "internal server error", success: false, err });
    }

    // now sending otp using nodeMailer

    const info = await sendMail({receiver:email, otp})
    if (!info) {
      console.log("something went wrong while sending email");
      return res
        .status(500)
        .json({ message: "internal server error", success: false, err });
    }

    return res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (err) {
    console.log("something went wrong while sending otp", err);
    return res
      .status(500)
      .json({ message: "internal server error", success: false, err });
  }
};

export default sendOTP;
