import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const onlineUsers = {};
const getSocketId = (id) => {
  return onlineUsers[id];
};
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const { userId } = socket.handshake.query;
  onlineUsers[userId] = socket.id;
  console.log("a user connected ", socket.id);

  socket.on("disconnect", () => {
    delete onlineUsers[userId]
  })
});

export { app, io, getSocketId, server };
