import userModel from "../Models/userSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sentEmail } from "../Utilities/nodemailer.js"



export const signupController = async (request, response) => {
    try {
        const body = request.body

        const emailExist = await userModel.findOne({ email: body.email })

        if (emailExist) {
            return response.json({
                message: "Email Address Already Exist",
                status: false,
                data: null
            })
        }

        const userPassword = body.password

        if (userPassword.length < 6) {
            return response.json({
                message: "Password must be at least 6 characters long",
                status: false,
                data: null
            })
        }

        const hashPassword = await bcrypt.hash(userPassword, 10)
        const obj = { ...body, password: hashPassword }

        const userResponse = await userModel.create(obj)
        // console.log('userResponse', userResponse);


        // sent verification email
        sentEmail({ email: body.email, name: body.firstName })


        response.json({
            message: "User Created",
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
                message: "User Not Found email or password invalid email",
                status: false,
                data: null
            })
        }

        if (findUser.isVerify == false) {
            return response.json({
                message: "Please Verify your email first",
                status: false,
                data: null
            })
        }


        const matchPass = await bcrypt.compare(password, findUser.password)
        // console.log("matchPass" , matchPass);

        if (!matchPass) {
            response.json({
                message: "User Not Found email or password invalid password",
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