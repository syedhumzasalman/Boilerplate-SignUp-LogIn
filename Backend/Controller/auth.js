import userModel from "../Models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sentEmail } from "../Utilities/nodemailer.js"
import { v4 as uuidv4 } from 'uuid';
import OTPModel from "../Models/otpschema.js";




export const signupController = async (request, response) => {
    try {
        // Extract body form request ****
        const body = request.body
        // Generate OPT from UUID ****
        const otp = uuidv4().slice(0, 6)

        // Checking if email email already Exist ****
        const emailExist = await userModel.findOne({ email: body.email })

        // if email already Exist Return **** 
        if (emailExist) {
            return response.json({
                message: "Email Address Already Exist",
                status: false,
                data: null
            })
        }

        // Extract password from body ****
        const userPassword = body.password

        // if password length is less than 6 word Return ****
        if (userPassword.length < 6) {
            return response.json({
                message: "Password must be at least 6 characters long",
                status: false,
                data: null
            })
        }

        // Hashpassword using bcrypt ****
        const hashPassword = await bcrypt.hash(userPassword, 10)
        // putting the hashed password into my object ****
        const obj = { ...body, password: hashPassword }

        // creating a user collection in MongoDB ****
        const userResponse = await userModel.create(obj)
        // console.log('userResponse', userResponse);


        // sent verification email ****
        sentEmail({ email: body.email, name: body.firstName, otp: otp })
        // console.log(otp);


        // create otpObj to store in database ****
        const otpObj = {
            otp,
            email: body.email
        }

        // creating a otp collection in MongoDB ****
        await OTPModel.create(otpObj)

        // if all good user created Successfully ****
        response.json({
            message: "User Created Successfully",
            status: true,
        })

    } catch (error) {
        // console.log(error.message);
        const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
        response.json({
            message: firstError || "Some thing went Wrong",
            status: false,
            data: null
        })
    }
}



export const loginController = async (request, response) => {

    try {
        const { email, password } = request.body

        const findUser = await userModel.findOne({ email })
        // console.log('findUser', findUser);
        if (!findUser) {
            response.json({
                message: "User Not Found email or password invalid",
                status: false,
                data: null
            })
        }


        if (findUser.isVerify == false) {
            return response.json({
                message: "Please Verify your Account first",
                status: false,
                data: null
            })
        }

        const matchPass = await bcrypt.compare(password, findUser.password)
        // console.log("matchPass" , matchPass);

        if (!matchPass) {
            response.json({
                message: "User Not Found email or password invalid",
                status: false,
                data: null
            })
        }



        // console.log(findUser);

        const userDetails = {
            firstName: findUser.firstName,
            lastName: findUser.lastName,
            age: findUser.age,
            email: findUser.email,
            createdAt: findUser.createdAt,
            updatedAt: findUser.updatedAt,
        }

        // console.log(userDetails);

        // Create Json web token
        const data = { _id: findUser._id }
        const PRIVATE_KEY = process.env.SECRET_KEY
        const token = jwt.sign(data, PRIVATE_KEY, { expiresIn: "24h", });

        console.log("token", token);

        response.json({
            message: "User Successfully Login",
            status: true,
            token,
            data: userDetails,
        })


    } catch (error) {
        const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
        response.json({
            message: firstError || "Some thing went Wrong",
            status: false,
            data: null
        })
    }

}




export const verifyOtpController = async (request, response) => {
    try {

        const { email, otp } = request.body

        if (!email || !otp) {
            return response.json({
                message: "Required Field are missing",
                status: false,
                data: null
            })
        }

        const isExist = await OTPModel.findOne({ email, isUsed: false }).sort({ createdAt: -1 })

        // console.log("isExist", isExist);


        if (!isExist) {
            return response.json({
                message: "Invalid OTP",
                status: false,
                data: null
            })
        }

        if (isExist.otp !== otp) {
            return response.json({
                message: "Invalid OTP",
                status: false,
                data: null
            })
        }

        await OTPModel.findByIdAndUpdate(isExist._id, { isUsed: true })
        await userModel.findOneAndUpdate({ email }, { isVerify: true })


        response.json({
            message: "OTP Verify Successfully",
            status: true,
            data: null
        })


    } catch (error) {
        const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
        response.json({
            message: firstError || "Some thing went Wrong",
            status: false,
            data: null
        })
    }
}



export const resetOtpController = async (request, response) => {
    try {

        const { email } = request.body

        if (!email) {
            return response.json({
                message: "Required Field are missing",
                status: false,
                data: null
            })
        }

        const findUser = await userModel.findOne({ email })
        // console.log('findUser', findUser);
        if (!findUser) {
            response.json({
                message: "User Not Found",
                status: false,
                data: null
            })
        }
        // console.log("findUser", findUser);


        // Generate OPT from UUID ****
        const otp = uuidv4().slice(0, 6)
        // console.log(otp);


        // sent verification email ****
        sentEmail({ email: findUser.email, name: findUser.firstName, otp: otp })

        // create otpObj to store in database ****
        const otpObj = {
            otp,
            email: findUser.email
        }

        // creating a otp collection in MongoDB ****
        await OTPModel.create(otpObj)



        response.json({
            message: "Sent OTP Please check you email",
            status: true,
            data: null
        })


    } catch (error) {
        const firstError = error?.errors ? Object.values(error.errors)[0].message : error.message;
        response.json({
            message: firstError || "Some thing went Wrong",
            status: false,
            data: null
        })
    }
}