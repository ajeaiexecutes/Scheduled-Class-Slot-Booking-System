import mongoose from "mongoose";

const slotSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Users",
        required:true
    },
    batchId:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    }

},
{timestamps:true}
)

slotSchema.index(
    {userId:1,batchId:1,date:1,topic:1},
    {unique:true}
)

export default mongoose.model("Slots",slotSchema)