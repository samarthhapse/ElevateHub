import express from "express";
import {
  // authorizeExpert,
  changePassword,
  expertDetails,
  getAllExperts,
  login,
  register,
  updateExpertDetails
} from "../controllers/expert-controller.js";
import { upload } from "../middleware/multer.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { sendConfirmationCode,authorizeExpert, confirmExpert } from "../controllers/auth-expert.js";

const router = express.Router();
//Nodemailer routes
router.post('/authorization',authorizeExpert) ;
router.post('/sendCode',sendConfirmationCode) ;
router.post('/confirm-registration',confirmExpert)
//nodemailer routes 

//once the above part is done the user should get the "/register" route and register himself

router.post(
  "/register",
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
  ]),
  register
);
// router.get("/authorize",authorizeExpert)

router.post("/login", login);
router.post("/resetpassword", changePassword);
router.get("/:id", expertDetails);
router.get("/", getAllExperts);
router.patch("/update", isAuthenticated, updateExpertDetails);

export default router;
