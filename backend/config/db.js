import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); // Stop the server if DB connection fails
    }
};
