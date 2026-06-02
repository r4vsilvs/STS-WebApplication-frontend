import { Route, Routes } from "react-router-dom";
import { Header } from "../components/header";
import { ProductCards } from "../components/productCards";
import { HomePageContent } from "../components/homePageContent";
import { Footer } from "../components/footer";
import ProductOverviewPage from "./client/productOverview";
import CartPage from "./client/cart";
import CheckoutPage from "./client/checkOut";
import { SearchProductPage } from "./client/searchProducts.jsx";
import { ContactUsPage } from "./client/contactUs.jsx";
import { AboutUsPage } from "./client/aboutUs.jsx";

export function HomePage() {

    return (

        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="w-full flex flex-col items-center flex-1">
                <Routes>
                    <Route path="/" element={<HomePageContent />} />
                    <Route path="/products" element={<ProductCards />} />
                    <Route path="/overview/:id" element={<ProductOverviewPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/search" element={<SearchProductPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/contact" element={<ContactUsPage />} />
                    <Route path="/about" element={<AboutUsPage />} />
                </Routes>
            </div>
            <Footer />
        </div>


    )

}