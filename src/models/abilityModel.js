import mongoose from "mongoose"
import { UserModel } from "./userModel"
const abilitySchema=new mongoose.Schema({
    day: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
})


export const AbilityModel=mongoose.models.Abilityseat || mongoose.model("Abilityseat",abilitySchema)
