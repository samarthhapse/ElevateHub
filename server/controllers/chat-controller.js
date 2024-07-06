import Chat from "../models/chat-model.js";

const getChats = async (req, res) => {
  try {
    const { userId } = req;
    if (!userId) {
      return res.status(401).json({ error: "unauthorized access" });
    }
    const userChats = await Chat.find({
      participants: {
        $elemMatch: { user: userId },
      },
    }).populate({
      path: "participants.user",
      refPath: "participants.userType",
      select: "-password",
    });
    console.log(userId);
    const participants =
      userChats[0].participants?.filter((p) => p.user._id != userId) || [];

    res.status(200).json({ users: participants });
  } catch (error) {
    console.log("error while fetching chat participants", error.message);
    res.status(500);
  }
};

export { getChats };
