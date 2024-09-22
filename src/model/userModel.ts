import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: [true, "Username is already taken"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: [true, "Email is already taken"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    verifyToken: String,
    verifyTokenExpiry: Date,

    // forgot password fields
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
})


const User = mongoose.models.users || mongoose.model("users", userSchema)


export default User;