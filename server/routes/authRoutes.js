import express from "express";
import {
  registerController,
  verifyOtpController,
  loginController,
  logoutController,
  viewProfileController,
} from "../controllers/authController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/verify-otp", verifyOtpController);
router.post("/login", loginController);
router.post("/logout", logoutController);

// View profile (protected route)
router.get("/me", protect, viewProfileController);

export default router;
