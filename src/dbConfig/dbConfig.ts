import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!)
        const connection = mongoose.connection

        connection.on('connected', () => {
            console.log("MongoDB Connected")
        })
        connection.on('error', (err) => {
            console.log("Error Connecting MongoDB", err)
            process.exit(1)
        })
    } catch (error) {
        console.log("Something went wrong in connecting to DB", error);
    }
}