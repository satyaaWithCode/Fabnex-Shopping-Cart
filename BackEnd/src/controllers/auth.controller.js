import { User } from "../models/user.model.js";
import { Otp } from "../models/otp.model.js";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";
import { sendOtpEmail } from "../utils/sendEmail.js";

const generateOtpCode = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// 1) SEND OTP
export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const code = generateOtpCode();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await Otp.deleteMany({ email }); // remove previous

    await Otp.create({ email, code, expiresAt });

    await sendOtpEmail(email, code);

    return res.json({ success: true, message: "OTP sent to your email" });
  } catch (err) {
    console.error("Send OTP error:", err);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// 2) VERIFY OTP (LOGIN)
export const verifyOtp = async (req, res) => {
  try {
    const { email, code } = req.body;

    if (!email || !code) {
      return res
        .status(400)
        .json({ success: false, message: "Email and code are required" });
    }

    const otpDoc = await Otp.findOne({ email, code });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "Invalid code" });
    }

    if (otpDoc.expiresAt < new Date()) {
      await Otp.deleteMany({ email });
      return res.status(400).json({ success: false, message: "Code expired" });
    }

    // find or create user
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }

    await Otp.deleteMany({ email }); // use once

    const token = generateTokenAndSetCookie(user, res);

    return res.json({
      success: true,
      message: "Logged in successfully",
      user,
      token,
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    return res.status(500).json({ success: false, message: "Failed to verify OTP" });
  }
};

// 3) CURRENT USER
export const getMe = async (req, res) => {
  return res.json({ success: true, user: req.user });
};

// 4) LOGOUT
export const logout = async (req, res) => {
  res.cookie("fabnex_token", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  return res.json({ success: true, message: "Logged out" });
};
