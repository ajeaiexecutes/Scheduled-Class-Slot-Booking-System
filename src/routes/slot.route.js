import express from "express";
import { deleteSlot, getUserSlots, insertSlot } from "../controllers/slots.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const slotRouter = express.Router();

slotRouter.get("/slots", authMiddleware, getUserSlots);
slotRouter.post("/slots", authMiddleware, insertSlot);
slotRouter.delete("/slots/:id", authMiddleware, deleteSlot);



export default slotRouter;