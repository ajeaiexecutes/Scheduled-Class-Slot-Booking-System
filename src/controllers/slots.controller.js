import Slot from "../models/Slot.js";

export const insertSlot = async (req, res) => {
    try {
        const slots = req.body;
        const userId = req.user.userId

        if (!Array.isArray(slots) || slots.length == 0) {
            return res.status(400).json({
                message: "No slots provided"
            })
        }

        const slotsToInsert = slots.map((slot) => ({
            userId,
            batchId: slot.batchId,
            date: slot.date,
            topic: slot.topic
        }))

        const insertedSlots = await Slot.insertMany(slotsToInsert, { ordered: false })

        return res.status(201).json({
            message: "Slot booked sucessfully",
            count: insertedSlots.length
        })
    } catch (error) {
        return res.status(500).json({
            message: "Slot booking failed",
            error:error
            
        })
    }
}


export const getUserSlots = async (req, res) => {
    try {
        const userId = req.user.userId;

        const slotsOfUser = await Slot.find({ userId }).sort({ date: 1 })

        return res.status(200).json({
            message: "Slot recieved",
            data: slotsOfUser
        })
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch slots"
        })
    }
}


export const deleteSlot = async (req, res) => {
    try {
        const slotId = req.params.id;
        const userId = req.user.userId;

        if (!slotId) {
            return res.status(404).json({
                message: "Slot not found"
            })
        }

        const deletedSlot = await Slot.deleteOne({ _id: slotId, userId })

        return res.status(200).json({
            message: "Slot deleted sucessfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Failed to load slot"
        })
    }
}