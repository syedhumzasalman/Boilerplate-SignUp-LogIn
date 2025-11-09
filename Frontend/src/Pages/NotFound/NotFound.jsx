import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    navigate('/');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    return (
        <>
            <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
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

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-bounce-slow {
          animation: bounce 2s ease-in-out infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }

        .animate-pulse-slow {
          animation: pulse 2s ease-in-out infinite;
        }

        .gradient-bg {
          background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #4facfe);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .text-shadow {
          text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .card-hover {
          transition: all 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .glow {
          box-shadow: 0 0 20px rgba(139, 92, 246, 0.5);
        }

        .countdown-circle {
          width: 80px;
          height: 80px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
      `}</style>

            <div className="min-h-screen gradient-bg flex items-center justify-center p-4 relative overflow-hidden">

                {/* Floating Background Elements */}
                <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full opacity-10 animate-float"></div>
                <div className="absolute bottom-20 right-20 w-40 h-40 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-40 w-24 h-24 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute bottom-40 left-40 w-36 h-36 bg-white rounded-full opacity-10 animate-float" style={{ animationDelay: '1.5s' }}></div>

                <div className="max-w-4xl w-full text-center relative z-10">

                    {/* 404 Main Text */}
                    <div className="animate-fadeIn mb-8">
                        <div className="text-9xl md:text-[150px] font-black text-white text-shadow animate-bounce-slow">
                            404
                        </div>
                    </div>

                    {/* Lost Astronaut Icon */}
                    <div className="animate-fadeIn mb-7" style={{ animationDelay: '0.2s' }}>
                        <div className="text-8xl md:text-9xl animate-float">
                            🚀
                        </div>
                    </div>

                    {/* Main Message */}
                    <div className="animate-fadeIn mb-6" style={{ animationDelay: '0.4s' }}>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Oops! Page Not Found
                        </h1>
                        <p className="text-xl md:text-2xl text-white opacity-90 mb-2">
                            Looks like you've ventured into uncharted territory! 🌌
                        </p>
                        <p className="text-lg text-white opacity-80">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    {/* Countdown */}
                    <div className="animate-fadeIn mb-8" style={{ animationDelay: '0.6s' }}>
                        <div className="inline-flex items-center gap-4 bg-white-100 bg-opacity-20 backdrop-blur-lg rounded-2xl px-8 py-4">
                            <div className="countdown-circle flex items-center justify-center">
                                <span className="text-3xl font-bold text-white">{countdown}</span>
                            </div>
                            <div className="text-left">
                                <p className="text-white text-sm opacity-80">Redirecting to home in</p>
                                <p className="text-white text-lg font-semibold">{countdown} seconds</p>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {/* <div className="animate-fadeIn flex flex-col sm:flex-row gap-4 justify-center mb-12" style={{ animationDelay: '0.8s' }}>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl card-hover"
                        >
                            🏠 Go Home
                        </button>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white bg-opacity-20 backdrop-blur-lg text-white-100 border-2 border-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 card-hover"
                        >
                            ⬅️ Go Back
                        </button>
                    </div> */}


                    {/* Fun Message */}
                    <div className="animate-fadeIn mt-12" style={{ animationDelay: '1.2s' }}>
                        <p className="text-white text-sm opacity-70">
                            Error Code: 404 | Houston, we have a problem! 🛸
                        </p>
                    </div>

                </div>

            </div>
        </>
    );
};

export default NotFound;