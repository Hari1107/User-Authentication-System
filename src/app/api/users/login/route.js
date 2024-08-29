import { connectDB } from "@/helper/db";
import { UserModel } from "@/models/userModel";
import bcrypt, { genSalt } from 'bcrypt'
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

export async function POST(request){
    connectDB()
    const {email,password}=await request.json()
    try {


        //1. Get user
    const user=await UserModel.findOne({email})
    if (!user) {
        return NextResponse.json(
            { statusText: 'Invalid email or password' },
            { status: 401}
        );
    }
    
    
    //2. Password match
    const matchPassword=await bcrypt.compare(password,user.password)


    if (!matchPassword) {
        return NextResponse.json(
            { statusText: 'Invalid email or password' },
            { status: 401 }
        );
    }
    
    //  3. Generate Token
    const token=jwt.sign({
        _id:user._id,
        name:user.name
    },process.env.JWT_KEY
    )

    //4. create nextResponse---cookies
    const response =NextResponse.json(user,
        { statusText: 'Login successful' },
        { status: 200 }
        );
    response.cookies.set("loginToken",token,{
        expiresIn:"1d",
        httpOnly:true
    })
    return response;
    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { message: 'An error occurred during login' },
            { status: 500 }
        );
    }
}
