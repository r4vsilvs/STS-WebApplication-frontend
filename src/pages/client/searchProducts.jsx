import { Header } from "../../components/header";
import { SearchProductCard } from "../../components/searchProductCard";
import { useState, useEffect, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../../utils/api";
import Loading from "../../components/loading";
import toast from "react-hot-toast";

export function SearchProductPage() {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [query, setQuery] = useState("");
    const timeoutRef = useRef(null); // Ref to store the debounce timeout

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        setIsInitialLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/product`);
            const availableProducts = response.data.filter(product => product.isAvailable);
            const uniqueProducts = availableProducts.filter((product, index, self) =>
                index === self.findIndex((p) => p.productId === product.productId)
            );
            setProducts(uniqueProducts);
        } catch (error) {
            toast.error("Failed to load products");
        } finally {
            setIsInitialLoading(false);
        }
    };

    const searchProducts = async (searchQuery) => {
        if (searchQuery.length === 0) {
            fetchAllProducts();
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/product/search/${searchQuery}`);
            const availableProducts = response.data.filter(product => product.isAvailable);
            const uniqueProducts = availableProducts.filter((product, index, self) =>
                index === self.findIndex((p) => p.productId === product.productId)
            );
            setProducts(uniqueProducts);
        } catch (error) {
            toast.error("Search failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            searchProducts(value);
        }, 500);
    };

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center">
            {/* <Header /> */}

            <div className="sticky top-[70px] z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 py-6 px-4 shadow-sm animate-in fade-in slide-in-from-top-5 duration-700">
                <div className="max-w-2xl mx-auto relative group">
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-100 border-none rounded-2xl focus:ring-2 focus:ring-black/5 transition-all outline-none font-poppins text-gray-700 shadow-inner"
                        value={query}
                        onChange={handleSearch}
                    />
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-black transition-colors" />
                </div>

                {query.length > 0 && !isLoading && (
                    <div className="max-w-2xl mx-auto mt-2 px-2 text-xs text-gray-400 font-poppins">
                        Found {products.length} product{products.length !== 1 ? 's' : ''} for "{query}"
                    </div>
                )}
            </div>

            {/* Products Grid */}
            <div className="w-full max-w-7xl px-6 py-8">
                {isInitialLoading || isLoading ? (
                    <div className="flex justify-center items-center min-h-[400px]">
                        <Loading />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-full text-center py-20">
                                <h1 className="text-xl text-gray-400 font-medium font-poppins">
                                    {query.length > 0
                                        ? `No products found for "${query}"`
                                        : "No products available"}
                                </h1>
                            </div>
                        ) : (
                            products.map((product) => (
                                <SearchProductCard
                                    key={product._id || product.productId}
                                    product={product}
                                />
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}