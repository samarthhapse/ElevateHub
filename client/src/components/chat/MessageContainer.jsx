import React, { useEffect, useState } from "react";
import { BsSend } from "react-icons/bs";
import { getMessages } from "../api/basicapi";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "./Message";
import { sendMessage } from "../api/basicapi";

const MessageContainer = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { id } = useParams();
  const model = JSON.parse(localStorage.getItem("userData")).type;
  // console.log(token);
  const token = useSelector((state) => state[model].authToken);

  useEffect(() => {
    if (!token) {
      return;
    }
    getMessages({ token, receiverId: id }).then((res) => {
      console.log(res.data);
      setMessages(res.data);
    });
  }, [token, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (message.length < 1) {
      return;
    }
    const response = await sendMessage({
      receiverId: id,
      token,
      message,
      senderModel: model,
    });
    setMessage("");
    console.log(response);
  };

  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      <div className=" w-3/5 h-4/5 border rounded-md">
        <div className="bg-slate-500 px-4 py-2 rounded-md">
          <span className="label-text">To:</span>{" "}
          <span className="text-gray-900 font-bold">{"hello"}</span>
        </div>
        <div className="w-full h-4/5 border px-4 py-2">
          {messages.map((msg) => (
            <Message key={msg._id} message={msg.message} />
          ))}
        </div>
        <form className="" onSubmit={handleSubmit}>
          <div className="w-full relative">
            <input
              type="text"
              className="border text-sm rounded-lg block w-full p-2.5  bg-gray-700 border-gray-600 text-white"
              placeholder="Send a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              type="submit"
              className="absolute inset-y-0 end-0 flex items-center pe-3"
            >
              <BsSend />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MessageContainer;
