import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connection.js";
import studentRoute from "./routes/studentRoute.js";
import expertRoute from "./routes/expertRoute.js";
import otpRoute from "./routes/otpRoute.js";
import userRoute from "./routes/userRoute.js"


import messageRoutes from "./routes/messageRoute.js";

import { app, server } from "./socket/socket.js";


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

server.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server Listening on : http://localhost:${PORT}`);
  });
});
