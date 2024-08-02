import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from 'http';
import { Server } from 'socket.io';
import  { v4 as uuidV4 } from 'uuid';

import connectDB from "./config/connection.js";
import studentRoute from "./routes/studentRoute.js";
import expertRoute from "./routes/expertRoute.js";
import otpRoute from "./routes/otpRoute.js";
import userRoute from "./routes/userRoute.js";
import chatRoute from "./routes/chatRoute.js";
import paymentRoute from "./routes/paymentRoute.js";
import messageRoutes from "./routes/messageRoute.js";
// import meetRouter from './routes/meetRouter.js'

import { app, server } from "./socket/socket.js";

dotenv.config({});

const PORT = process.env.PORT || 5000;
const webserver = http.createServer(app);
const io = new Server(webserver);

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/student", studentRoute);
app.use("/api/v1/expert", expertRoute);
app.use("/api/v1/otp", otpRoute);
app.use("/api/v1/message", messageRoutes);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/chat", chatRoute);
app.use("/api/v1/payment",paymentRoute)
// app.use('api/v1/meeting', meetRouter)



app.get('/new-meeting', (req, res) => {
  const meetingId = uuidV4();
  res.send({ meetingId });
});

io.on('connection', (socket) => {
  socket.on('join room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user joined', socket.id);

    socket.on('offer', (payload) => {
      io.to(payload.target).emit('offer', payload);
    });

    socket.on('answer', (payload) => {
      io.to(payload.target).emit('answer', payload);
    });

    socket.on('candidate', (payload) => {
      io.to(payload.target).emit('candidate', payload);
    });

    socket.on('disconnect', () => {
      socket.to(roomId).emit('user disconnected', socket.id);
    });
  });
});



server.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server Listening on : http://localhost:${PORT}`);
  });
});
