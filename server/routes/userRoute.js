import express from "express";
import { getUserInfo } from "../controllers/user-controller.js3";
const router = express.Router();
router.get("/:id", getUserInfo);

export default router;
