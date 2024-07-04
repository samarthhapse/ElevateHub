import React from "react";

const Message = ({ message, fromUser }) => {
return (
  <div
    className={`max-w-[60%] my-2 overflow-visible break-words whitespace-pre-wrap p-1 rounded-md
      ${fromUser ? "bg-green-500 self-end" : "bg-blue-500 self-start"}
    `}
  >
    {message}
  </div>
);
}

export default Message;
