import { connect } from "@/dbConfig/dbConfig";
import { NextResponse } from 'next/server';

connect()

export async function GET() {
    try {

        const response = NextResponse.json({
            message: "Log Out Successfully",
            success: true
        })

        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) })

        return response
    }
    catch (error: unknown) {
        return NextResponse.json({ error }, { status: 500 })
    }
}