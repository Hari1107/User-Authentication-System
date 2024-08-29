import { connectDB } from "@/helper/db";
import { UserModel } from "@/models/userModel";
import bcrypt, { genSalt } from 'bcrypt'
import { NextResponse } from "next/server";
export async function POST(request){
    connectDB()
    const {password,...data}=await request.json()
    
    try {
        const salts=await bcrypt.genSalt(10)
        const hashPassword=await bcrypt.hash(password,salts)
        const sendData={...data,password:hashPassword}
        const userInfo=await new UserModel(sendData)
        const saveUserInfo=await userInfo.save()
        return NextResponse.json(saveUserInfo,{
            status:201,
            statusText:"User created...",
            message:"success"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json(error)
    }
}
