import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    age: {
        type: Number,
        required: [true, "Age is required"],
        min: [18, "Age must be greater than 18"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Duplicate Email Address schema"],
        match: [/.+@.+\..+/, "Please enter a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    isVerify: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })


const userModel = mongoose.model("user", UserSchema)
userModel.init();

export default userModel