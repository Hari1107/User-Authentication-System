import mongoose from "mongoose"

export const connectDB=async()=>{
    try {
        mongoose.connect(process.env.DATABASE_URL,{
            dbName:"shiftting"
        })
        console.log("database connection created...")        
    } catch (error) {
        console.log(error)
    }
}