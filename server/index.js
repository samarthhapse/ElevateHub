
import express from 'express';
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connection.js";
import studentRoute from "./routes/studentRoute.js";
import expertRoute from "./routes/expertRoute.js";
import otpRoute from "./routes/otpRoute.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";


const app = express();
const port = 3000;

app.use(express.json());

// Temporary storage for signup requests
const pendingUsers = {};

// Configure the email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Endpoint for the home page
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint for signup requests
app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // Store the signup request temporarily
  pendingUsers[email] = { name, email, password: hashedPassword };

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_TO,
    subject: 'New Expert Signup',
    text: `A new expert has signed up.\n\nName: ${name}\nEmail: ${email}\n\nTo authorize this user, visit: http://localhost:${port}/authorize/${email}`
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Signup request sent to the website owner. Please wait for authorization.');
    
dotenv.config({});

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/student", studentRoute);
app.use("/api/v1/expert", expertRoute);
app.use("/api/v1/otp", otpRoute);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);

server.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server Listening on : http://localhost:${PORT}`);

  });
});

// Endpoint for authorizing a user
app.get('/authorize/:email', (req, res) => {
  const { email } = req.params;

  if (pendingUsers[email]) {
    // Here you would save the user to the database
    // For demonstration purposes, we're just logging the user
    console.log('User authorized:', pendingUsers[email]);

    // Remove the user from the temporary storage
    delete pendingUsers[email];

    res.send('User authorized and saved to the database.');
  } else {
    res.status(404).send('No signup request found for this email.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
