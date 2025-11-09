import nodemailer from "nodemailer"
import { emailTemplate } from "./emilTemp.js";



export const sentEmail = async ({ email, name, otp }) => {
    try {

        // console.log("email", process.env.EMAIL);
        // console.log("APP_PASS", process.env.APP_PASS);
        // console.log("email", email);



        const transporter = nodemailer.createTransport({
            service: "Gmail",
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASS,
            },
        });


        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Please Verify your Account",
            html: emailTemplate({ otp: otp, name: name }),
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {

        response.json({
            message: error.message || "Some thing went Wrong",
            status: false,
            data: null
        })

    }
}
