import asyncHandler from 'express-async-handler';
import Chat from '../models/chat-model.js';
import { Expert } from '../models/expert-model.js';
import { Student } from '../models/student-model.js';
import Message from '../models/message-model.js';

export const getMessages = async (req, res) => {
  try {
    const { receiverId} = req.params;
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
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.userId;

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
    });

    if (newMessage) {
      chat.messages.push(newMessage._id);
    }


    await Promise.all([chat.save(), newMessage.save()]);

   

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};