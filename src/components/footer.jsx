import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa6";

export function Footer() {
	return (
		<footer className="bg-gray-900 text-white py-12">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
					{/* Company Info */}
					<div>
						<h3 className="text-xl font-bold mb-4">Smart Tech Store</h3>
						<p className="text-gray-400 text-sm mb-4">
							Your premium destination for Apple products and accessories.
						</p>
						<div className="flex space-x-4">
							<a href="#" className="hover:text-blue-400 transition">
								<FaFacebook size={20} />
							</a>
							<a href="#" className="hover:text-blue-400 transition">
								<FaTwitter size={20} />
							</a>
							<a href="#" className="hover:text-blue-400 transition">
								<FaInstagram size={20} />
							</a>
							<a href="#" className="hover:text-blue-400 transition">
								<FaLinkedin size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Quick Links</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<Link to="/" className="text-gray-400 hover:text-white transition">
									Home
								</Link>
							</li>
							<li>
								<Link to="/products" className="text-gray-400 hover:text-white transition">
									Shop
								</Link>
							</li>
							<li>
								<Link to="/cart" className="text-gray-400 hover:text-white transition">
									Cart
								</Link>
							</li>
							<li>
								<Link to="/about" className="text-gray-400 hover:text-white transition">
									About Us
								</Link>
							</li>
						</ul>
					</div>

					{/* Categories */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Categories</h4>
						<ul className="space-y-2 text-sm">
							<li>
								<a href="#iphone" className="text-gray-400 hover:text-white transition">
									iPhone
								</a>
							</li>
							<li>
								<a href="#iwatch" className="text-gray-400 hover:text-white transition">
									Apple Watch
								</a>
							</li>
							<li>
								<a href="#airpods" className="text-gray-400 hover:text-white transition">
									AirPods
								</a>
							</li>
							<li>
								<a href="#macs" className="text-gray-400 hover:text-white transition">
									Mac
								</a>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h4 className="text-lg font-semibold mb-4">Contact Us</h4>
						<ul className="space-y-3 text-sm">
							<li className="flex items-center gap-2 text-gray-400">
								<Phone size={16} />
								+94 78 554 5340
							</li>
							<li className="flex items-center gap-2 text-gray-400">
								<Mail size={16} />
								dinethnethsaradev@gmail.com
							</li>
							<li className="flex items-center gap-2 text-gray-400">
								<MapPin size={16} />
								Colombo, Sri Lanka
							</li>
						</ul>
					</div>
				</div>

				{/* Divider */}
				<div className="border-t border-gray-800 pt-8">
					<div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
						<p>&copy; 2026 Smart Tech Store. All rights reserved.</p>
						<div className="flex space-x-6 mt-4 md:mt-0">
							<a href="#" className="hover:text-white transition">
								Privacy Policy
							</a>
							<a href="#" className="hover:text-white transition">
								Terms of Service
							</a>
							<a href="#" className="hover:text-white transition">
								Cookie Settings
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
