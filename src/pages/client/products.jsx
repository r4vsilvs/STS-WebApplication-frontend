// pages/client/products.jsx
import { Header } from "../../components/header";
import { Footer } from "../../components/footer";
import { ProductCards } from "../../components/productCards";
import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router-dom";

export function ClientProductsPage() {
    const location = useLocation();
    const [appliedSort, setAppliedSort] = useState("newest");
    const [selectedCategory, setSelectedCategory] = useState(location.state?.category || "All");
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const sortLabels = {
        newest: "Newest",
        priceLow: "Price, Low to High",
        priceHigh: "Price, High to Low",
    };

    const categories = [
        { id: "All", name: "All Products" },
        { id: "M", name: "iPhone" },
        { id: "P", name: "Mac" },
        { id: "W", name: "Apple Watch" },
        { id: "H", name: "AirPods" },
    ];



    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        setAppliedSort(value);
        setDropdownOpen(false);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <main className="w-full max-w-7xl mx-auto px-6 py-8 flex-1">

                {/* Top bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                    {/* Categories */}
                    <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id
                                    ? "bg-black text-white"
                                    : "bg-white border border-gray-300 text-gray-700 hover:border-gray-500"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 w-full sm:w-auto justify-end">
                        <span className="font-medium shrink-0">Sort by:</span>

                        {/* Dropdown wrapper */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen((prev) => !prev)}
                                className="flex items-center gap-2 border border-gray-300 rounded-full px-4 py-1.5 text-sm font-medium text-gray-800 hover:border-gray-500 transition-colors bg-white"
                            >
                                {sortLabels[appliedSort]}
                                <ChevronDown
                                    size={14}
                                    className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {/* Dropdown menu */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-200 rounded-xl shadow-lg z-40 overflow-hidden">
                                    {Object.entries(sortLabels).map(([value, label]) => (
                                        <button
                                            key={value}
                                            onClick={() => handleSelect(value)}
                                            className={`w-full text-left px-4 py-3 text-sm transition-colors hover:bg-gray-50
                                                ${appliedSort === value
                                                    ? "font-semibold text-gray-900 bg-gray-50"
                                                    : "text-gray-600"
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <ProductCards sortOption={appliedSort} category={selectedCategory} />
            </main>

            <Footer />
        </div>
    );
}
