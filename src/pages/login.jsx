import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/validator";
import { FaEnvelope, FaKey } from "react-icons/fa";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import BASE_URL from "../utils/api";
import { FcGoogle } from "react-icons/fc";

export default function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const googleLogin = useGoogleLogin({
        flow: "implicit",

        onSuccess: async (tokenResponse) => {
            try {
                const res = await axios.post(
                    `${BASE_URL}/api/user/login/google`,
                    {
                        accessToken: tokenResponse.access_token
                    }
                );

                login(res.data.token); // syncs context state immediately

                if (res.data.role == "admin") {
                    navigate("/admin")
                } else {
                    navigate("/home")
                }

            } catch (error) {
                console.error("Google login failed", error);
            }
        },

        onError: () => {
            console.error("Google Login Failed");
        }
    });


    async function handleLogin() {


        if (!isValidEmail(email)) {
            toast.error("Please enter a valid Email address");
            return;
        }

        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`, {
                email: email,
                password: password
            })

            toast.success("login sucessful")
            login(response.data.token); // syncs context state immediately

            if (response.data.role == "admin") {

                navigate("/admin")

            } else {

                navigate("/home")
            }

        } catch (e) {
            toast.error(e.response.data.message);
        }
    }


    return (
        <div className="w-screen h-screen bg-black bg-cover bg-center flex justify-center items-center font-['SF Pro Display', 'San Francisco Pro', -apple-system, BlinkMacSystemFont, sans-serif]">


            {/* Glowing border container */}
            <div className="relative z-10 w-[420px] p-[2px] rounded-[32px] bg-gradient from-white/40 via-white/10 to-white/5 shadow-[0_0_50px_rgba(255,255,255,0.25)]">
                {/* Inner Glass Container */}
                <div className="w-full h-full bg-transparent backdrop-blur-75 rounded-[30px] p-10 flex flex-col items-center">
                    <h1 className="text-white text-3xl font-bold tracking-wide mb-10">Login</h1>

                    {/* Email Input Group */}
                    <div className="w-full relative mb-8">
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            placeholder="Email"
                            type="email"
                            className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                        />
                        <FaEnvelope className="absolute right-2 top-2 text-gray-400" />
                    </div>

                    {/* Password Input Group */}
                    <div className="w-full relative mb-4">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            type="password"
                            className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                        />
                        <FaKey className="absolute right-2 top-2 text-gray-400" />
                    </div>

                    {/* Options Row */}
                    <div className="w-full flex justify-between items-center text-xs text-gray-400 mb-10 px-1 font-medium">
                        <a href="/forget-password" className="hover:text-white transition">Forgot password?</a>
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={handleLogin}
                        className="w-full h-[52px] bg-white text-black rounded-full font-semibold text-[17px] mb-6 hover:bg-black hover:text-white hover:border-white hover:border active:scale-[0.98] transition-all"
                    >
                        Login
                    </button>

                    {/* Google Button */}
                    <button
                        onClick={googleLogin}
                        className="w-full h-[52px] bg-transparent border border-gray-500 text-white rounded-full font-semibold text-[16px] mb-8 hover:bg-white/5 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                    >
                        <FcGoogle className="w-[18px] h-[18px]" />
                        <span>Sign in with Google</span>
                    </button>

                    {/* Register Text */}
                    <div className="text-gray-400 text-sm">
                        Don't have an account? <a href="/register" className="text-white font-semibold hover:underline">Register</a>
                    </div>

                </div>
            </div>
        </div>
    )
} 