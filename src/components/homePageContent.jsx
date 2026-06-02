import { useState, useEffect } from "react";
import axios from "axios";
import BASE_URL from "../utils/api";
import { Link } from "react-router-dom";
import { ProductCards } from "./productCards";
import Loading from "./loading";
import { ChevronRight } from "lucide-react";
import HeroSection from "./heroSection";
import { useInView } from "react-intersection-observer";

// Reusable component to animate individual product cards
function AnimatedProductCard({ product }) {
	const { ref, inView } = useInView({
		triggerOnce: true,
		threshold: 0.1,
		rootMargin: "50px 0px"
	});

	return (
		<div
			ref={ref}
			className={`relative bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-700 flex flex-col items-center group ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
				}`}
		>
			<Link to={`/overview/${product.productId}`} className="w-full flex flex-col items-center">
				<div className="w-full h-32 md:h-48 mb-4 md:mb-6 mt-2 md:mt-4 flex items-center justify-center">
					<img
						src={product.imgUrls[0]}
						alt={product.altNames[0]}
						className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
					/>
				</div>

				<div className="text-center w-full">
					<p className="text-[11px] font-medium text-gray-500 uppercase tracking-[0.15em] mb-1.5">
						Apple
					</p>

					<h3 className="font-medium text-sm md:text-lg text-gray-900 mb-1 md:mb-2 line-clamp-1">
						{product.productName}
					</h3>

					<p className="text-gray-600 text-xs md:text-sm">
						From <span className="text-gray-900 font-medium tracking-wide">Rs {product.sellingPrice}</span>
					</p>
				</div>
			</Link>
		</div>
	);
}

export function HomePageContent() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const categoryConfig = {
		M: { name: "iPhone" },
		W: { name: "Apple Watch" },
		H: { name: "AirPods" },
		P: { name: "Mac" },
	};

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const res = await axios.get(`${BASE_URL}/api/product`);
				setProducts(res.data);
				setLoading(false);
			} catch (err) {
				setError(err.message || "Failed to load products");
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const categorizeProducts = (productsList) => {
		const categorized = {
			M: [],
			W: [],
			H: [],
			P: [],
		};

		productsList.forEach((product) => {
			const prefix = product.productId?.charAt(0)?.toUpperCase();
			if (prefix && categorized[prefix]) {
				categorized[prefix].push(product);
			}
		});

		return categorized;
	};

	const getCategoryProducts = (category) => {
		const categorized = categorizeProducts(products);
		return categorized[category] || [];
	};

	const getFeaturedProducts = () => {
		return products.slice(0, 4);
	};

	if (loading) {
		return <Loading />;
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-screen text-black-500">
				<div className="text-center">
					<h2 className="font-bold text-lg">Error loading products</h2>
					<p>{error}</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full">

			<HeroSection />


			{/* Featured Products */}
			<section className="py-16 px-4 bg-gray-50">
				<div className="max-w-7xl mx-auto">
					<div className="flex justify-between items-center mb-8">
						<h2 className="text-4xl font-bold text-gray-900">Featured Products</h2>
						<Link
							to="/products"
							className="text-black font-semibold flex items-center gap-1"
						>
							View All <ChevronRight size={20} />
						</Link>
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
						{getFeaturedProducts().map((product) => (
							<AnimatedProductCard key={product.productId} product={product} />
						))}
					</div>
				</div>
			</section>

			{/* Products by Category */}
			{Object.entries(categoryConfig).map(([key, category]) => {
				const categoryProducts = getCategoryProducts(key);
				if (categoryProducts.length === 0) return null;

				return (
					<section key={key} id={key.toLowerCase()} className="py-16 px-4 bg-white">
						<div className="max-w-7xl mx-auto">
							<div className="flex justify-between items-center mb-8">
								<div className="flex items-center gap-3">
									<h2 className="text-4xl font-bold text-gray-900">
										{category.name}
									</h2>
								</div>
								<Link
									to="/products"
									state={{ category: key }}
									className="text-black hover: font-semibold flex items-center gap-1"
								>
									View All <ChevronRight size={20} />
								</Link>
							</div>

							<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
								{categoryProducts.slice(0, 4).map((product) => (
									<AnimatedProductCard key={product.productId} product={product} />
								))}
							</div>
						</div>
					</section>
				);
			})}
		</div>
	);
}
