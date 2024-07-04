import { Expert } from "../models/expert-model.js";
import { Student } from "../models/student-model.js";

export const getUserInfo = async (req, res) => {
  try {
    const { id } = req.params;

    const [expert, student] = await Promise.all([
      Expert.findById(id).select("-password"),
      Student.findById(id).select("-password"),
    ]);
    if (expert) {
      return res.status(200).json({ user: expert });
    }
    if (student) {
      return res.status(200).json({ user: student });
    }
    return res.status(404).json({ error: "user not found" });
  } catch (error) {
    console.log("error while fetching user", error);
    res.status(500).json({ error: "internal server error" });
  }
};
