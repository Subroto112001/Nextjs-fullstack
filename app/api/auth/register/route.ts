import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { error } from "console";
import next from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { email, password } = await request.json()
        
        if (!email || !password) {
            return NextResponse.json(
                { error: "Invalid email or password" },
                { status: 400 }
            )
        }

        await connectToDatabase();
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { error: "User already exists" },
                { status: 400 }
            )
        }
        await User.create({ email, password });
        return NextResponse.json(
            { message: "User Registration Successful" },
            { status: 201 }
        )
    } catch (error) {
        console.log("Error From registration api", error);
        
        return NextResponse.json(
            { error: "User Registration Failed" },
            { status: 400 }
        )  
    }
}