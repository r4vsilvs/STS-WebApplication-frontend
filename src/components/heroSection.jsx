import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-[60vh] md:h-screen w-full overflow-hidden bg-black">

      {/* Video */}
      <video
        autoPlay
        muted
        playsInline
        loop
        className="absolute top-0 left-0 w-full h-full object-cover md:object-cover"
      >
        <source src="/videos/air.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${scrolled ? "bg-black/60" : "bg-black/0"
          }`}
      ></div>

      {/* Content */}
      <div
        className={`relative z-10 flex flex-col justify-center h-full max-w-7xl mx-auto px-6 text-white transition-all duration-1000 ${scrolled ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Welcome to Smart Tech Store
        </h1>

        <p className="text-lg md:text-xl text-gray-200 mb-6 md:mb-8 max-w-2xl">
          Discover the latest Apple products with premium quality and exclusive deals.
        </p>

        <Link
          to="/products"
          className="self-start w-fit bg-white hover:bg-accent text-gray-900 hover:text-white text-sm font-medium py-2 px-5 rounded-full transition duration-300"
        >
          Shop Now
        </Link>
      </div>

    </section>
  );
}