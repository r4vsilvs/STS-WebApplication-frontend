import { Link } from "react-router-dom";

export function AboutUsPage() {
    return (
        <div className="w-full min-h-screen bg-white">
            {/* Hero Section */}
            <div className="relative w-full h-[40vh] md:h-[50vh] bg-gray-900 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src="/about2.jpg" alt="About Us Hero" className="w-full h-full object-cover opacity-60" />
                </div>
                <div className="z-10 text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-poppins tracking-tight">
                        Our Story
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                        Discover the passion and dedication behind our premium technology products.
                    </p>
                </div>
            </div>

            {/* Content Section 1 */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
                <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                    <div className="w-full md:w-1/2">
                        <img
                            src="/about3.jpg"
                            alt="Our Mission"
                            className="w-full h-auto rounded-3xl shadow-2xl object-cover aspect-video sm:aspect-square md:aspect-auto md:h-[500px] hover:scale-[1.02] transition-transform duration-500"
                        />
                    </div>
                    <div className="w-full md:w-1/2 space-y-6">
                        <div className="inline-block px-4 py-1.5 bg-accent/10 text-accent font-semibold rounded-full text-sm tracking-wide">
                            OUR MISSION
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins leading-tight">
                            Elevating Your Tech Experience
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            We started with a simple belief: everyone deserves access to innovative, high-quality technology that enhances their daily lives. By combining cutting-edge design with uncompromising performance, we've created a curated collection that speaks to the modern consumer.
                        </p>
                        <p className="text-gray-600 leading-relaxed text-lg">
                            Every item in our store is carefully selected and rigorously tested to ensure it meets our exacting standards. We're not just selling devices; we're delivering experiences that you can trust.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content Section 2 */}
            <div className="bg-gray-50 w-full py-16 md:py-24 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col-reverse md:flex-row items-center gap-12 lg:gap-20">
                        <div className="w-full md:w-1/2 space-y-6">
                            <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary font-semibold rounded-full text-sm tracking-wide">
                                OUR COMMITMENT
                            </div>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-poppins leading-tight">
                                Quality You Can Trust
                            </h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Our commitment to excellence doesn't end at the source. It extends to the way we treat our customers and the communities we serve. Transparency, sustainability, and integrity are the cornerstones of everything we do.
                            </p>

                            <div className="grid grid-cols-2 gap-8 pt-6">
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="text-3xl font-bold text-accent mb-2">100%</h4>
                                    <p className="text-gray-500 font-medium">Authentic Products</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                    <h4 className="text-3xl font-bold text-accent mb-2">24/7</h4>
                                    <p className="text-gray-500 font-medium">Customer Support</p>
                                </div>
                            </div>

                            <div className="pt-6">
                                <Link to="/products" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                                    Explore Products
                                </Link>
                            </div>
                        </div>
                        <div className="w-full md:w-1/2">
                            <img
                                src="/about1.jpg"
                                alt="Quality Commitment"
                                className="w-full h-auto rounded-3xl shadow-2xl object-cover aspect-video sm:aspect-square md:aspect-auto md:h-[500px] hover:scale-[1.02] transition-transform duration-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
