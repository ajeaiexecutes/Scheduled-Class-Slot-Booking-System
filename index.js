import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/utils/database.js";
import slotRouter from "./src/routes/slot.route.js";
import authRouter from "./src/routes/auth.route.js";
import cors from "cors";
import generateMonthlyCaledar from "./src/services/calendar.service.js";

const app = express();
dotenv.config();

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
generateMonthlyCaledar(2026, 2)
app.use("/api/auth", authRouter);
app.use("/api", slotRouter);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Backend running on port ${process.env.PORT}`);
});