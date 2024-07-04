import asyncHandler from "express-async-handler";
import Chat from "../models/chat-model.js";
import { Expert } from "../models/expert-model.js";
import { Student } from "../models/student-model.js";
import Message from "../models/message-model.js";
import { getSocketId, io } from "../socket/socket.js";

const getUserModel = async (id) => {
  const expert = Expert.findById(id);
  if (expert) {
    return "Expert";
  }
  const student = Student.findById(id);
  if (student) {
    return "Student";
  }
  return null;
};

export const getMessages = async (req, res) => {
  try {
    const { id:receiverId } = req.params;
    const senderId = req.userId;
   
    const chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
  
    if (!chat) return res.status(200).json([]);

    const messages = chat.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    let { message, senderModel } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;
   
    const receiverModel = await getUserModel(receiverId);
  
    senderModel = senderModel?.charAt(0).toUpperCase() + senderModel?.slice(1);
    if (!receiverModel) {
      return res.status(404).json({ error: "receiver not found" });
    }
    let chat = await Chat.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!chat) {
      chat = await Chat.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
      senderModel,
      receiverModel,
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }

    await Promise.all([chat.save(), newMessage.save()]);
    const isOnline = getSocketId(receiverId)
    if (isOnline){
      io.to(isOnline).emit("new-message", newMessage)
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


