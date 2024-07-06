import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "participants.userType",
        },
        userType: {
          type: String,
          enum: ["Expert", "Student"],
          required: true,
        },
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);
export default Chat;
