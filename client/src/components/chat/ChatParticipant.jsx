import React from "react";
import { Link } from "react-router-dom";

const ChatParticipant = ({ user }) => {
  
  return (
    <Link to={`/message/${user?._id}`}>
      <div className="w-full h-24 border-b flex items-center p-10">
        <p className=" text-2xl">{user?.name}</p>
      </div>
    </Link>
  );
};

export default ChatParticipant;
