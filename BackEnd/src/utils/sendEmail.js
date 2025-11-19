import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // 👈 make sure env vars are loaded here

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendOtpEmail = async (toEmail, otpCode) => {
  // Optional: quick debug to be sure values exist (remove later)
  // console.log("SMTP_USER:", process.env.SMTP_USER, "SMTP_PASS present:", !!process.env.SMTP_PASS);

  const mailOptions = {
    from: `"Fabnex" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Your Fabnex Login Code",
    html: `
      <p>Hi,</p>
      <p>Your Fabnex login code is:</p>
      <h2 style="letter-spacing:4px;">${otpCode}</h2>
      <p>This code will expire in 10 minutes.</p>
      <p>If you did not request this, you can ignore this email.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
