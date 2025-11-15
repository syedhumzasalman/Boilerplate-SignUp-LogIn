import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const OTPVerification = () => {
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    let navigate = useNavigate();

    const location = useLocation()
    const userEmail = location?.state?.email
    console.log(location?.state?.email);

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/")
        }
    }, [])


    useEffect(() => {
        // Auto focus input on page load
        const input = document.getElementById("otpInput");
        if (input) input.focus();
    }, []);

    const verifyOTP = async () => {
        try {

            if (otp.length !== 6) {
                showMessage("Please enter a 6-digit OTP", "error");
                return;
            }


            const userOTP = {
                email: userEmail,
                otp,
            }

            const response = await axios.post("http://localhost:3000/api/verify-otp", userOTP)
            // console.log("response", response);

            if (response.data.message == "OTP Verify Successfully") {
                return Swal.fire({
                    icon: "success",
                    title: "OTP Verify Successfully",
                    confirmButtonColor: "#22c55e"
                }).then(() => {
                    setOtp("")
                    navigate("/login")
                });
            }


            Swal.fire({
                icon: "error",
                title: `${response.data.message}`,
                text: `Please try Again`,
                confirmButtonColor: "#ef4444"
            })


        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: "error",
                title: error.message,
                text: "Something went wrong! Please try again.",
                confirmButtonColor: "#ef4444"
            })
        }
    };

    const resendOTP = async () => {

        try {

            const resetOTP = {
                email: userEmail,
            }

            const response = await axios.post("http://localhost:3000/api/reset-otp", resetOTP)
            // console.log("response", response);

            if (response.data.message == "Sent OTP Please check you email") {
                return Swal.fire({
                    icon: "success",
                    title: "Sent OTP Please check you email",
                    confirmButtonColor: "#22c55e"
                })
            }


            Swal.fire({
                icon: "error",
                title: `${response.data.message}`,
                text: `Please try Again`,
                confirmButtonColor: "#ef4444"
            })


        } catch (error) {
            console.log(error.message);
            Swal.fire({
                icon: "error",
                title: error.message,
                text: "Something went wrong! Please try again.",
                confirmButtonColor: "#ef4444"
            })
        }

    };

    const showMessage = (text, type) => {
        setMessage(text);
        setMessageType(type);

        setTimeout(() => {
            setMessage("");
            setMessageType("");
        }, 3000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-400 to-purple-600 font-sans">

            <div className="bg-white p-10 rounded-2xl shadow-2xl text-center w-[90%] max-w-md">

                <div className="w-20 h-20 bg-linear-to-br from-indigo-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl text-white">
                    🔒
                </div>

                <h1 className="text-3xl font-semibold text-gray-800 mb-2">OTP Verification</h1>

                <p className="text-gray-600 text-sm mb-6">
                    Enter the 6-digit code sent to your Email
                </p>

                <input
                    type="text"
                    id="otpInput"
                    value={otp}
                    onChange={(e) => {
                        setOtp(e.target.value);
                    }}
                    onKeyPress={(e) => e.key === "Enter" && verifyOTP()}
                    placeholder="000000"
                    maxLength="6"
                    className="w-full p-4 text-2xl text-center border-2 border-gray-300 rounded-xl tracking-[10px] outline-none transition-all duration-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 mb-4"
                />

                <button
                    onClick={verifyOTP}
                    className="w-full py-4 bg-linear-to-br from-indigo-400 to-purple-600 text-white font-semibold rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:translate-y-0"
                >
                    Verify OTP
                </button>

                {/* Message */}
                {message && (
                    <div
                        className={`mt-4 p-3 rounded-lg ${messageType === "success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                    >
                        {message}
                    </div>
                )}

                <div className="mt-4 text-gray-600 text-sm">
                    Didn't receive the code?{" "}
                    <button
                        onClick={resendOTP}
                        className="text-indigo-500 font-semibold hover:underline"
                    >
                        Resend
                    </button>
                </div>

            </div>
        </div>
    );
};

export default OTPVerification;
