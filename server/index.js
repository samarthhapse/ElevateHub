import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server as SocketIOServer } from 'socket.io';
import webpack from "webpack";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server); // Use SocketIOServer instead of socketIO

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(express.static("public"));

// Define your API routes
app.use("/api/v1/student", studentRoute);
app.use("/api/v1/expert", expertRoute);

app.get("/", (req, res) => {
  res.sendFile(new URL("./public/index.html", import.meta.url).pathname); // Adjusted for ES modules
});

// WebSocket setup
let connectedPeers = [];
let connectedPeersStrangers = [];

io.on("connection", (socket) => {
  connectedPeers.push(socket.id);

  socket.on("pre-offer", (data) => {
    const { calleePersonalCode, callType } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === calleePersonalCode
    );

    if (connectedPeer) {
      io.to(calleePersonalCode).emit("pre-offer", {
        callerSocketId: socket.id,
        callType,
      });
    } else {
      io.to(socket.id).emit("pre-offer-answer", {
        preOfferAnswer: "CALLEE_NOT_FOUND",
      });
    }
  });

  socket.on("pre-offer-answer", (data) => {
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === data.callerSocketId
    );

    if (connectedPeer) {
      io.to(data.callerSocketId).emit("pre-offer-answer", data);
    }
  });

  socket.on("webRTC-signaling", (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("webRTC-signaling", data);
    }
  });

  socket.on("user-hanged-up", (data) => {
    const { connectedUserSocketId } = data;
    const connectedPeer = connectedPeers.find(
      (peerSocketId) => peerSocketId === connectedUserSocketId
    );

    if (connectedPeer) {
      io.to(connectedUserSocketId).emit("user-hanged-up", data);
    }
  });

  socket.on("stranger-connection-status", (data) => {
    const { status } = data;

    if (status) {
      connectedPeersStrangers.push(socket.id);
    } else {
      connectedPeersStrangers = connectedPeersStrangers.filter(
        (peerSocketId) => peerSocketId !== socket.id
      );
    }
  });

  socket.on("get-stranger-socket-id", () => {
    const filteredConnectedPeersStrangers = connectedPeersStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );

    const randomStrangerSocketId =
      filteredConnectedPeersStrangers.length > 0
        ? filteredConnectedPeersStrangers[
            Math.floor(Math.random() * filteredConnectedPeersStrangers.length)
          ]
        : null;

    io.to(socket.id).emit("stranger-socket-id", { randomStrangerSocketId });
  });

  socket.on("disconnect", () => {
    connectedPeers = connectedPeers.filter((peerSocketId) => peerSocketId !== socket.id);
    connectedPeersStrangers = connectedPeersStrangers.filter(
      (peerSocketId) => peerSocketId !== socket.id
    );
  });
});

server.listen(PORT, () => {
  connectDB().then(() => {
    console.log(`Server listening on: http://localhost:${PORT}`);
  });
});
