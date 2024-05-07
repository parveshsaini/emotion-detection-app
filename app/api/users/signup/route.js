import { connect } from "@/db/config";
import User from "@/model/child.model";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
connect()

export async function POST(request){
    try {
        const reqBody = await request.json()
        const {username,  password} = reqBody

        // console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({username})

        if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log(savedUser);

        const dbUser= await User.findOne({username})

        const tokenData = {
            id: dbUser._id,
            username: dbUser.username
        }

        console.log("db user", dbUser.username)

        //create token
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Signup successful",
            success: true,
        })
        response.cookies.set("token", token, {
            httpOnly: true,   
        })
        return response;

 
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}