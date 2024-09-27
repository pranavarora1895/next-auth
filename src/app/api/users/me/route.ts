import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';
import { getDatafromToken } from "@/helper/getDataFromToken";

connect()

export async function POST(request: NextRequest) {
    try {
        // extract data from token
        const userID = await getDatafromToken(request)

        const user = await User.findOne({ _id: userID }).select("-password")

        // check if their is no user
        if (!user) return NextResponse.json({ message: "Invalid Token", status: 400 })

        return NextResponse.json({
            message: 'User Found',
            status: 200,
            data: user
        })

    }
    catch (error: unknown) {
        return NextResponse.json({ error }, { status: 500 })
    }
}