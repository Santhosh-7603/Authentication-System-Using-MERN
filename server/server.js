import express from "express";
import cors from "cors";
import dbConnect from "./config/dbConnect.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

dbConnect();

app.get("/", (req, res) => {
  res.send("API is Working... ✅");
});

app.use("/api/auth", authRoutes);

// app.use((err, req, res, next) => {
//   console.error("Error:", err.stack);
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || "Something went wrong!",
//   });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
