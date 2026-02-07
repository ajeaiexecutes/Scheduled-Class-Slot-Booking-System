import mongoose from "mongoose";

async function connectDB() {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection failed ");
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB;
