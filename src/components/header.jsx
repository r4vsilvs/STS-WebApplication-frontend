import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { FaUserLarge } from "react-icons/fa6";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = useState(false); // For user dropdown
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // For hamburger menu
    const { isAuthenticated, isAdmin, logout } = useAuth();

    return (
        <header className="sticky top-0 z-50 w-full h-[70px] bg-gray-900 shadow-md border-b border-white/10 flex items-center px-4 md:px-10 font-poppins">
            {/* Hamburger Icon (Mobile Only) */}
            <div className="md:hidden flex items-center mr-4">
                <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="text-white hover:text-gray-300 transition-colors"
                >
                    {mobileMenuOpen ? <FaTimes className="text-[24px]" /> : <FaBars className="text-[24px]" />}
                </button>
            </div>

            <div className="hidden md:flex flex-1 justify-start">
                <img
                    onClick={() => navigate("/")}
                    src="/logo.jpg"
                    alt="Logo"
                    className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-cover cursor-pointer hover:opacity-80 transition-opacity"
                />
            </div>
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
                <Link to="/" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Home
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/products" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Products
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
                <Link to="/contact" className="relative text-white hover: font-medium group transition-colors duration-300">
                    Contact Us
                    <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                </Link>
            </nav>

            <div className="flex-1 flex justify-end items-center gap-5">
                <Link to={location.pathname === "/search" ? "/products" : "/search"}>
                    <FaSearch className="text-[20px] text-white hover:scale-110 transition-all" />
                </Link>


                {/* Desktop User Dropdown */}
                <div className="relative hidden md:block">
                    <button onClick={() => setOpen(!open)}>
                        <FaUserLarge className="text-[20px] text-white hover:scale-110 transition-all cursor-pointer" />
                    </button>

                    {open && (
                        <div className="absolute right-0 mt-3 w-40 bg-white/50 backdrop-blur-md rounded-lg shadow-lg py-2">
                            {isAuthenticated ? (
                                <>
                                    {isAdmin && (
                                        <Link
                                            to="/admin"
                                            className="block px-4 py-2 text-gray-800 group"
                                            onClick={() => setOpen(false)}
                                        >
                                            <span className="block font-semibold font-poppins transition-transform duration-300 group-hover:scale-110">Admin Panel</span>
                                        </Link>
                                    )}
                                    <button
                                        onClick={() => {
                                            logout();
                                            setOpen(false);
                                            navigate("/login");
                                        }}
                                        className="w-full text-left block px-4 py-2 text-red-600 group"
                                    >
                                        <span className="block font-semibold font-poppins transition-transform duration-300 group-hover:scale-110">Logout</span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="block px-4 py-2 text-gray-800 group"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="block font-semibold font-poppins transition-transform duration-300 group-hover:scale-110">Login</span>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block px-4 py-2 text-gray-800 group"
                                        onClick={() => setOpen(false)}
                                    >
                                        <span className="block font-semibold font-poppins transition-transform duration-300 group-hover:scale-110">Sign Up</span>
                                    </Link>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <Link to="/cart">
                    <FaShoppingCart className="text-[22px] text-white hover:scale-110 transition-all" />
                </Link>
            </div>

            {/* Mobile Slide-out Menu */}
            <div
                className={`fixed top-[70px] left-0 h-[calc(100vh-70px)] bg-gray-900 w-64 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-6 border-r border-white/10 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Mobile Menu Logo */}
                <div className="px-8 mb-6 flex items-center">
                    <img
                        onClick={() => {
                            navigate("/");
                            setMobileMenuOpen(false);
                        }}
                        src="/logo.jpg"
                        alt="Logo"
                        className="w-[45px] h-[45px] object-cover cursor-pointer hover:opacity-80 transition-opacity rounded-md"
                    />
                </div>

                <nav className="flex flex-col gap-6 px-8 flex-1">
                    <Link
                        to="/"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        to="/products"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                        Products
                    </Link>

                    <Link
                        to="/contact"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                        Contact Us
                    </Link>

                    <Link
                        to="/about"
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                    >
                        About Us
                    </Link>

                    <div className="h-px bg-white/20 my-4"></div>

                    {isAuthenticated ? (
                        <>
                            {isAdmin && (
                                <Link
                                    to="/admin"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                                >
                                    Admin Panel
                                </Link>
                            )}
                            <button
                                onClick={() => {
                                    logout();
                                    setMobileMenuOpen(false);
                                    navigate("/login");
                                }}
                                className="text-red-400 text-left text-lg font-medium hover:text-red-300 transition-colors mt-2"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                            >
                                Login
                            </Link>
                            <Link
                                to="/register"
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-white text-lg font-medium hover:text-gray-300 transition-colors"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </nav>
            </div>

        </header>
    );
}