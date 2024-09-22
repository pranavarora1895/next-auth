import { connect } from "@/dbConfig/dbConfig";
import User from "@/model/userModel";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs'
import { sendEmail } from "@/helper/mailer";

connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { username, email, password } = reqBody
        // TODO: User Validation

        console.log(reqBody)

        const user = await User.findOne({ email })

        if (user) {
            return NextResponse.json({ error: "User Already exists" }, { status: 400 })
        }


        const salt = await bcryptjs.genSalt(10);

        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username, email, password: hashedPassword
        })

        const savedUser = await newUser.save()
        console.log('Saved: ', savedUser)

        // send verification email

        await sendEmail({ email, emailType: 'VERIFY', userID: savedUser._id })

        return NextResponse.json({
            message: "User Registered Successfully",
            success: true,
            savedUser,
            status: 200
        })

    } catch (error: any) {
        return NextResponse.json({ error}, { status: 500 })
    }
}