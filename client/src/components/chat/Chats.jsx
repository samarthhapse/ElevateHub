import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getChats } from "../api/basicapi";
import ChatParticipant from "./ChatParticipant";

const Chats = () => {
  const [chats, setChats] = useState([]);
  const userId = useSelector(
    (state) => state.expert.expertData?._id || state.student.studentData?._id
  );
  const token = useSelector(
    (state) => state.expert.authToken || state.student.authToken
  );
  useEffect(() => {
    if (!token) {
      return;
    }
    getChats({ token }).then((res) => setChats(res.data?.users));
  }, []);
  return (
    <div className=" max-w-lg border mx-auto h-80 mt-10 rounded-md overflow-auto">
      {chats.map((user) => (
        <ChatParticipant key={user._id} user={user.user} />
      ))}
    </div>
  );
};

export default Chats;
