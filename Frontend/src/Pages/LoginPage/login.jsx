import React, { useState } from 'react'
import InputField from '../../Components/InputField/inputField'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'

const Login = ({ setUser }) => {

  const [userEmailLogin, setUserEmailLogin] = useState("")
  const [userPasswordLogin, setUserPasswordLogin] = useState("")
  const navigate = useNavigate();


  const loginUser = async () => {

    //  Validation for empty fields
    if (!userEmailLogin || !userPasswordLogin) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      })
    }

    // Email validation (any domain)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(userEmailLogin)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
    }

    try {

      const uerObj = {
        email: userEmailLogin.trim(),
        password: userPasswordLogin.trim()
      }

      const response = await axios.post("http://localhost:3000/api/login", uerObj)
      console.log("response", response);

      if (response?.data?.message == "User Successfully Login")
        return Swal.fire({
          icon: "success",
          title: "Logged In successfully",
          confirmButtonColor: "#22c55e"
        }).then(() => {
          setUserEmailLogin("")
          setUserPasswordLogin("")
          localStorage.setItem("token", response?.data?.token);
          navigate("/dashboard")
        });

      if (response?.data?.message == "Please Verify your Account first") {
        return Swal.fire({
          icon: "warning",
          title: "Verification Required",
          text: "Please verify your account before login.",
          confirmButtonColor: "#22c55e"
        }).then(() => {
          navigate("/verifiOTP", {
            state: {
              email: userEmailLogin,
            }
          });
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
      }).then(() => {
        setUserEmailLogin("")
        setUserPasswordLogin("")
      });
    }

  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shine {
          0% {
            left: -100%;
          }
          100% {
            left: 100%;
          }
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .animate-slideInLeft {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .input-field-delay-1 {
          animation-delay: 0.1s;
        }

        .input-field-delay-2 {
          animation-delay: 0.2s;
        }

        .gradient-bg {
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
        }

        .feature-card {
          transition: all 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          animation: shine 3s infinite;
        }
      `}</style>

      <div className="min-h-screen flex items-center justify-center gradient-bg p-4">
        <div className="w-full max-w-6xl flex flex-col md:flex-row-reverse bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 animate-fadeInUp">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Welcome Back
                </h1>
                <p className="text-gray-600">
                  Login to continue your journey 🎯
                </p>
              </div>

              <div className="flex flex-col space-y-5">

                <div className="animate-fadeInUp input-field-delay-1">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📧 Email Address
                  </label>
                  <InputField
                    type="email"
                    text="Enter your Email"
                    onChange={(e) => setUserEmailLogin(e.target.value)}
                    value={userEmailLogin} />
                </div>

                <div className="animate-fadeInUp input-field-delay-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🔒 Password
                  </label>
                  <InputField
                    type="password"
                    text="Enter your Password"
                    onChange={(e) => setUserPasswordLogin(e.target.value)}
                    value={userPasswordLogin}
                  />
                </div>

                <div className="flex flex-wrap gap-5 items-center justify-between text-sm">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">
                    Forgot Password?
                  </Link>
                </div>

                <button
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl mt-4 shine-effect"
                  onClick={loginUser}>
                  Login 🚀
                </button>



                <p className="text-center text-gray-600 mt-6 text-sm md:text-md ">
                  Don't have an account?
                  <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-semibold ml-2 hover:underline">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="w-full md:w-1/2 bg-linear-to-br from-blue-600 via-indigo-600 to-purple-600 p-12 relative overflow-hidden hidden md:flex items-center justify-center animate-slideInLeft">

            {/* Floating Decorative Circles */}
            <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full opacity-10 animate-float"></div>
            <div className="absolute bottom-20 left-20 w-40 h-40 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-10 w-24 h-24 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 right-20 w-28 h-28 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>

            {/* Main Content */}
            <div className="relative z-10 text-center text-white">
              <div className="mb-8 animate-pulse-slow">
                <div className="w-48 h-48 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30">
                  <span className="text-8xl">👋</span>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-4">
                Good to see you again!
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-md mx-auto leading-relaxed">
                Access your account and continue where you left off. Your journey awaits!
              </p>

            </div>

          </div>
        </div>
      </div>

    </>
  )
}

export default Login