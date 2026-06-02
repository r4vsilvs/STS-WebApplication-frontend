import { useState } from "react";
import axios from "axios";
import BASE_URL from "../utils/api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { isValidEmail } from "../utils/validator";
import { FaUser, FaEnvelope, FaKey } from "react-icons/fa";

export default function RegisterPage() {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleRegister() {

        if (!firstName || !lastName || !email || !password) {
            toast.error("Please fill all the required fields");
            return;
        }

        if (!isValidEmail(email)) {
            toast.error("Please enter a valid Email address");
            return;
        }

        try {
            await axios.post(`${BASE_URL}/api/user/register`, {
                firstName,
                lastName,
                email,
                password
            });

            toast.success("Registration successful");
            navigate("/login");

        } catch (e) {
            toast.error(e.response?.data?.message || "Registration failed");
        }
    }

    return (
        <div className="w-screen h-screen bg-black bg-cover bg-center flex justify-center items-center font-['SF Pro Display','San Francisco Pro',-apple-system,BlinkMacSystemFont,sans-serif]">

            {/* Glowing border container */}
            <div className="relative z-10 w-[420px] p-[2px] rounded-[32px] bg-gradient from-white/40 via-white/10 to-white/5 shadow-[0_0_50px_rgba(255,255,255,0.25)]">

                {/* Inner Glass Container */}
                <div className="w-full h-full bg-transparent backdrop-blur-75 rounded-[30px] p-10 flex flex-col items-center">

                    <h1 className="text-white text-3xl font-bold tracking-wide mb-10">
                        Register
                    </h1>

                    {/* First Name */}
                    <div className="w-full relative mb-8">
                        <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            placeholder="First Name"
                            className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                        />
                        <FaUser className="absolute right-2 top-2 text-gray-400" />
                    </div>

                    {/* Last Name */}
                    <div className="w-full relative mb-8">
                        <input
                            onChange={(e) => setLastName(e.target.value)}
                            value={lastName}
                            placeholder="Last Name"
                            className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                        />
                        <FaUser className="absolute right-2 top-2 text-gray-400" />
                    </div>

                    {/* Email */}
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

                    {/* Password */}
                    <div className="w-full relative mb-10">
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            placeholder="Password"
                            type="password"
                            className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                        />
                        <FaKey className="absolute right-2 top-2 text-gray-400" />
                    </div>

                    {/* Register Button */}
                    <button
                        onClick={handleRegister}
                        className="w-full h-[52px] bg-white text-black rounded-full font-semibold text-[17px] mb-6 hover:bg-black hover:text-white hover:border-white hover:border active:scale-[0.98] transition-all"
                    >
                        Register
                    </button>

                    {/* Login Text */}
                    <div className="text-gray-400 text-sm">
                        Already have an account?{" "}
                        <a href="/login" className="text-white font-semibold hover:underline">
                            Login
                        </a>
                    </div>

                </div>
            </div>
        </div>
    );
}