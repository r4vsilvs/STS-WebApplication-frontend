import axios from "axios";
import BASE_URL from "../utils/api";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEnvelope, FaKey } from "react-icons/fa";

export default function ForgetPasswordPage() {

    const [otpSent, setOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendOtp() {
        axios.post(`${BASE_URL}/api/user/send-otp`, { email })
            .then(() => {
                setOtpSent(true);
                toast.success("OTP sent to your email");
            })
            .catch(() => {
                toast.error("Error sending OTP or User not found");
            });
    }

    function verifyOtp() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        axios.post(`${BASE_URL}/api/user/reset-password`, {
            email,
            otp: parseInt(otp, 10),
            newPassword
        })
            .then(() => {
                toast.success("Password reset successfully");
                window.location.href = "/login";
            })
            .catch(() => {
                toast.error("Invalid OTP, error resetting password");
            });
    }

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">

            {/* Glowing Border */}
            <div className="relative z-10 w-[420px] p-[2px] rounded-[32px] bg-gradient from-white/40 via-white/10 to-white/5 shadow-[0_0_50px_rgba(255,255,255,0.25)]">

                {/* Glass Container */}
                <div className="w-full h-full backdrop-blur-75 rounded-[30px] p-10 flex flex-col items-center">

                    <h1 className="text-white text-3xl font-bold tracking-wide mb-10">
                        {otpSent ? "Reset Password" : "Forgot Password"}
                    </h1>

                    {!otpSent ? (
                        <>
                            {/* Email */}
                            <div className="w-full relative mb-10">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                                />
                                <FaEnvelope className="absolute right-2 top-2 text-gray-400" />
                            </div>

                            {/* Send OTP Button */}
                            <button
                                onClick={sendOtp}
                                className="w-full h-[52px] bg-white text-black rounded-full font-semibold text-[17px] hover:bg-black hover:text-white hover:border hover:border-white active:scale-[0.98] transition-all"
                            >
                                Send OTP
                            </button>

                        </>
                    ) : (
                        <>
                            {/* OTP */}
                            <div className="w-full relative mb-8">
                                <input
                                    placeholder="Enter OTP"
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                                />
                                <FaKey className="absolute right-2 top-2 text-gray-400" />
                            </div>

                            {/* New Password */}
                            <div className="w-full relative mb-8">
                                <input
                                    type="password"
                                    placeholder="New Password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                                />
                                <FaKey className="absolute right-2 top-2 text-gray-400" />
                            </div>

                            {/* Confirm Password */}
                            <div className="w-full relative mb-10">
                                <input
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full h-[40px] bg-transparent border-0 border-b border-gray-600 focus:border-[#2a6aff] text-white text-lg px-2 pb-2 outline-none transition-colors placeholder:text-gray-400"
                                />
                                <FaKey className="absolute right-2 top-2 text-gray-400" />
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={verifyOtp}
                                className="w-full h-[52px] bg-white text-black rounded-full font-semibold text-[17px] mb-4 hover:bg-black hover:text-white hover:border hover:border-white active:scale-[0.98] transition-all"
                            >
                                Reset Password
                            </button>

                            {/* Back Button */}
                            <button
                                onClick={() => setOtpSent(false)}
                                className="w-full h-[52px] border border-gray-500 text-white rounded-full font-semibold text-[16px] hover:bg-white/5 active:scale-[0.98] transition-all"
                            >
                                Resend OTP
                            </button>
                        </>
                    )}

                </div>
            </div>
        </div>
    );
}