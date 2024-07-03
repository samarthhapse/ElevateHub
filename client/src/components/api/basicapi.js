import axios from "axios";

const MESSAGE_URL = "http://localhost:5000/api/v1/message";

const getMessages = ({ token, receiverId }) =>
  axios.get(`${MESSAGE_URL}/${receiverId}`, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: token,
    },
  });

const sendMessage = ({ token, message, senderModel, receiverId }) =>
  axios.post(
    `${MESSAGE_URL}/send/${receiverId}`,
    { message, senderModel },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: token,
      },
    }
  );
export { getMessages, sendMessage };
