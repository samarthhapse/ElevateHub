import express from 'express'
import { getMessages, sendMessage } from '../controllers/message-controller.js';
import isAuthenticated from '../middleware/isAuthenticated.js';

const router = express.Router();

router.get("/:id", isAuthenticated, getMessages);
router.post("/send/:id", isAuthenticated, sendMessage);

export default router;
