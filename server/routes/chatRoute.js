import express from "express"
import isAuthenticated from "../middleware/isAuthenticated.js";
import { getChats } from "../controllers/chat-controller.js";

const router = express.Router();

router.get("/", isAuthenticated, getChats);


export default router;