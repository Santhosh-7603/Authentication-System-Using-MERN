import db from "../config/model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";
import generateOtp from "../utils/generateOtp.js";
import sendEmail from "../utils/sendEmail.js";

// REGISTER
export async function registerController(req, res) {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const exists = await db.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "User Already Exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const generatedOtp = generateOtp();

    await db.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      otp: generatedOtp,
    });

    sendEmail(email, "Verify Your Account", `Your OTP is : ${generatedOtp}`);

    res.status(201).json({ message: "OTP Sent to Email" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// VERIFY OTP
export async function verifyOtpController(req, res) {
  const { email, otp } = req.body;

  try {
    const user = await db.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User Not Found :(" });
    }

    if (String(user.otp) !== String(otp)) {
      return res.status(400).json({ message: "Invalid OTP :(" });
    }

    user.isVerified = true;
    user.otp = undefined;

    await user.save();

    generateToken(res, user.id);

    res.status(200).json({
      message: "OTP Verified Successfully",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// LOGIN
export async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.findOne({ email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Didn't Match" });
    }

    if (!user.isVerified) {
      return res.status(400).json({ message: "Please Verify Your Account" });
    }

    generateToken(res, user.id);

    res.status(200).json({
      message: "Login Successful",
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// LOGOUT
export function logoutController(req, res) {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logout Successful" });
}

// VIEW PROFILE
export function viewProfileController(req, res) {
  res.status(200).json({ message: "User Verified", user: req.user });
}
