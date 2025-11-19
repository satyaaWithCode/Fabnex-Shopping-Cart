import express from "express";
import { sendOtp, verifyOtp, getMe, logout } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/send-otp", sendOtp);        // user enters email
router.post("/verify-otp", verifyOtp);    // user enters code
router.get("/me", protect, getMe);        // check logged-in user
router.post("/logout", protect, logout);  // logout

export default router;
