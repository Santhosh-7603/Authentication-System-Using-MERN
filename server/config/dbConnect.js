import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log(" Database Connected Successfully");
  } catch (err) {
    console.error("Error Connecting to Database:", err.message);
    process.exit(1);
  }
};

export default dbConnect;
