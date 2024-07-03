import axios from "axios";


const MESSAGE_URL = "http://localhost:5000/api/v1/message";

const getMessages = ({ token, receiverId }) =>
  axios.get(
    `${MESSAGE_URL/receiverId}`,
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: token,
      },
    }
  );

const sendMessage = ({ token, message }) =>
  axios.post(
    MESSAGE_URL,
    { message },
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        authorization: token,
      },
    }
  );
export { getMessages , sendMessage};
