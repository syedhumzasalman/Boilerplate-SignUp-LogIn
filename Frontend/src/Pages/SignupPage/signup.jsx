import React, { useState } from 'react'
import InputField from '../../Components/InputField/inputField'
import Swal from 'sweetalert2'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {

  let [firstName, setFirstName] = useState("")
  let [lastName, setLastName] = useState("")
  let [age, setAge] = useState("")
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")
  let navigate = useNavigate();


  const createUser = async () => {

    const userObj = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      age: age.trim(),
      email: email.trim(),
      password: password.trim(),
    };

    //  Validation for empty fields
    if (!firstName || !lastName || !age || !email || !password) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      })
    }

    // Email validation (any domain)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return Swal.fire({
        icon: "error",
        title: "Invalid Email",
        text: "Please enter a valid email address!",
      });
    }

    // console.log(userObj);



    try {

      const response = await axios.post("http://localhost:3000/signup", userObj)
      console.log("response", response);

      console.log(response.data.message);

      if (response.data.message == "User Created") {
        return Swal.fire({
          icon: "success",
          title: "Account Created!",
          text: `Welcome ${firstName, lastName} ! `,
          confirmButtonColor: "#22c55e"
        }).then(() => {
          setFirstName("")
          setLastName("")
          setAge("")
          setEmail("")
          setPassword("")
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

    @keyframes slideInRight {
          from {
        opacity: 0;
        transform: translateX(50px);
      }
          to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes float {
      0 %, 100 % {
        transform: translateY(0px);
      }
      50 % {
        transform: translateY(-20px);
      }
    }

    @keyframes pulse {
      0 %, 100 % {
        opacity: 1;
      }
      50 % {
        opacity: 0.5;
      }
    }

    @keyframes gradientShift {
      0 % {
        background- position: 0 % 50 %;
    }
    50 % {
      background- position: 100 % 50 %;
  }
  100 % {
    background- position: 0 % 50 %;
}
        }

        .animate - fadeInUp {
  animation: fadeInUp 0.6s ease - out forwards;
}

        .animate - slideInRight {
  animation: slideInRight 0.8s ease - out forwards;
}

        .animate - float {
  animation: float 3s ease -in -out infinite;
}

        .animate - pulse - slow {
  animation: pulse 4s ease -in -out infinite;
}

        .input - field - delay - 1 {
  animation - delay: 0.1s;
}

        .input - field - delay - 2 {
  animation - delay: 0.2s;
}

        .input - field - delay - 3 {
  animation - delay: 0.3s;
}

        .gradient - bg {
  background: linear - gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
  background - size: 400 % 400 %;
  animation: gradientShift 15s ease infinite;
}

        .glass - effect {
  background: rgba(255, 255, 255, 0.95);
  backdrop - filter: blur(10px);
}

        .feature - card {
  transition: all 0.3s ease;
}

        .feature - card:hover {
  transform: translateY(-5px);
  box - shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}
`}</style>

      <div className="min-h-screen flex items-center justify-center gradient-bg p-3">
        <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Left Side - Form */}
          <div className="w-full md:w-1/2 p-8 md:p-12 animate-fadeInUp">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <h1 className="text-2xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Create Account
                </h1>
                <p className="text-gray-600">
                  Join us today and start your journey 🚀
                </p>
              </div>

              <div className="flex flex-col space-y-5">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeInUp input-field-delay-1">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      👤 First Name
                    </label>
                    <InputField
                      type="text"
                      text="Enter your First Name"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName} />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      👥 Last Name
                    </label>
                    <InputField
                      type="text"
                      text="Enter your Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName} />
                  </div>
                </div>

                <div className="animate-fadeInUp input-field-delay-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🎂 Age
                  </label>
                  <InputField
                    type="number"
                    text="Enter your Age"
                    onChange={(e) => setAge(e.target.value)}
                    value={age} />
                </div>

                <div className="animate-fadeInUp input-field-delay-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    📧 Email Address
                  </label>
                  <InputField
                    type="email"
                    text="Enter your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email} />
                </div>

                <div className="animate-fadeInUp input-field-delay-3">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    🔒 Password
                  </label>
                  <InputField
                    type="password"
                    text="Enter your Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                <button
                  className="w-full bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl mt-4"
                  onClick={createUser}>
                  Create Account ✨
                </button>

                <p className="text-center text-gray-600 mt-6">
                  Already have an account?
                  <Link to="/login" className="text-indigo-600 hover:text-indigo-700 font-semibold ml-2 hover:underline">
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Illustration */}
          <div className="w-full md:w-1/2 bg-linear-to-br from-indigo-600 via-purple-600 to-pink-500 p-12 relative overflow-hidden hidden md:flex items-center justify-center animate-slideInRight">

            {/* Floating Decorative Circles */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full opacity-10 animate-float"></div>
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-10 w-24 h-24 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
            <div className="absolute bottom-10 left-20 w-28 h-28 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>

            {/* Main Content */}
            <div className="relative z-10 text-center text-white">
              <div className="mb-8 animate-float">
                <div className="w-48 h-48 mx-auto bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white border-opacity-30">
                  <span className="text-8xl">🚀</span>
                </div>
              </div>

              <h2 className="text-4xl font-bold mb-4">
                Welcome Aboard!
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-md mx-auto leading-relaxed">
                Start your amazing journey with us. Create, collaborate, and achieve more together.
              </p>

            </div>

          </div>

        </div>
      </div>

    </>
  )
}

export default Signup