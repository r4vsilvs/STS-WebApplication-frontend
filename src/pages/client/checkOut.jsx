import axios from "axios"
import BASE_URL from "../../utils/api"
import { useState } from "react"
import { BiMinus, BiPlus, BiTrash, BiShoppingBag } from "react-icons/bi"
import { Link, useLocation } from "react-router-dom"

export default function CheckoutPage() {
    const location = useLocation()

    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")

    const [cart, setCart] = useState(location.state?.cart || [])

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.sellingPrice * item.qty;
        })
        return total;
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item, i) => i !== index);
        setCart(newCart);
    }

    function changeQty(index, qty) {
        const newQty = cart[index].qty + qty;
        if (newQty <= 0) {
            removeFromCart(index)
            return
        } else {
            const newCart = [...cart]
            newCart[index].qty = newQty;
            setCart(newCart)
        }

    }

    async function placeOrder() {
        const token = localStorage.getItem("token")
        if (!token) {
            alert("Please login to place order")
            return
        }

        const orderInformation = {
            products: [],
            phone: phoneNumber,
            address: address

        }

        for (let i = 0; i < cart.length; i++) {

            const item = {
                productId: cart[i].productId,
                qty: cart[i].qty
            }

            orderInformation.products.push(item)
        }

        try {
            const res = await axios.post(`${BASE_URL}/api/order`, orderInformation, {
                headers: {
                    Authorization: "Bearer " + token
                }
            })
            alert("Order placed successfully")
        } catch (err) {
            alert("Error placing order")
        }
    }



    if (cart.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
                <div className="bg-primary/30 p-8 rounded-full">
                    <BiShoppingBag className="text-6xl text-accent/50" />
                </div>
                <h2 className="text-3xl font-bold text-secondary">Your cart is empty</h2>
                <p className="text-gray-500 text-center max-w-md">
                    Looks like you haven't added anything to your cart yet.
                    Explore our products and find something you'll love!
                </p>
                <Link
                    to="/products"
                    className="bg-accent text-white px-8 py-3 rounded-xl font-bold 
                             hover:bg-secondary transform hover:scale-105 
                             transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                    Continue Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full max-w-full min-h-screen bg-gradient-to-b from-white to-primary/10 
                      flex flex-col items-center pt-8 pb-8 relative">

            {/* Desktop Checkout Card - Right Sidebar */}
            <div className="z-40 hidden lg:flex flex-col w-[360px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                          absolute top-8 right-8 p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Items ({cart.length})</span>
                        <span>LKR {getTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="h-px bg-gray-100 my-4"></div>
                    <div className="flex justify-between items-center">
                        <span className="text-base font-semibold text-gray-900">Total</span>
                        <span className="text-2xl font-bold text-gray-900">
                            LKR {getTotal().toFixed(2)}
                        </span>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Delivery Details</label>
                        <input type="tel" placeholder="Phone Number"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 hover:border-gray-300 transition-all duration-300"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    <div>
                        <input type="text" placeholder="Full Delivery Address"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 hover:border-gray-300 transition-all duration-300"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>
                </div>

                <button
                    disabled={!phoneNumber || !address}
                    className="w-full bg-black text-white py-4 rounded-xl font-medium text-sm
                               hover:bg-gray-800 transform hover:-translate-y-0.5 transition-all duration-300 shadow-xl shadow-black/10 disabled:bg-gray-300 disabled:text-gray-500 disabled:transform-none disabled:shadow-none disabled:cursor-not-allowed"
                    onClick={placeOrder} >
                    Complete Order
                </button>
            </div>

            {/* Cart Header */}
            <div className="w-full max-w-6xl px-4 md:px-8 mb-6 lg:pr-[400px]">
                <h1 className="text-3xl font-bold text-gray-900 font-poppins tracking-tight">Checkout</h1>
                <p className="text-gray-500 mt-2 text-sm">{cart.length} {cart.length === 1 ? 'item' : 'items'} in your bag.</p>
            </div>

            {/* Cart Items Container */}
            <div className="w-full max-w-6xl px-4 md:px-8 space-y-4 mb-32 lg:mb-8 lg:pr-[400px]">
                {cart.map((item, index) => {
                    return (
                        <div key={item.productId}
                            className="group w-full bg-white rounded-2xl shadow-lg 
                                      hover:shadow-xl transition-all duration-300 
                                      flex flex-col md:flex-row relative 
                                      justify-between items-start md:items-center p-4 
                                      border border-gray-100 hover:border-accent/30">

                            {/* Product Image & Details Row */}
                            <div className="flex flex-col sm:flex-row w-full md:w-auto items-start gap-4">
                                {/* Product Image */}
                                <div className="flex-shrink-0 bg-gray-50 rounded-xl p-2 h-24 w-24 flex items-center justify-center border border-gray-100 group-hover:border-gray-200 transition-colors">
                                    <img src={item.imgUrls}
                                        className="max-h-full max-w-full object-contain mix-blend-multiply
                                                  transition-transform duration-500 group-hover:scale-110"/>
                                </div>

                                {/* Product Details */}
                                <div className="flex-1 space-y-1">
                                    <h1 className="text-base md:text-lg text-gray-900 font-semibold 
                                                 group-hover:text-black transition-colors line-clamp-2">
                                        {item.productName}
                                    </h1>
                                    <div className="flex flex-wrap items-center gap-2 mt-2">
                                        {item.labeledPrice > item.sellingPrice ? (
                                            <>
                                                <span className="text-lg font-semibold text-gray-900">
                                                    LKR {item.sellingPrice.toFixed(2)}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    LKR {item.labeledPrice.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-lg font-semibold text-gray-900">
                                                LKR {item.sellingPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Controls and Price Row */}
                            <div className="flex flex-row items-center justify-between w-full md:w-auto mt-4 md:mt-0 md:ml-4 gap-4">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-3 bg-gray-50 border border-gray-100 rounded-lg p-1">
                                    <button className="w-8 h-8 rounded-md bg-white shadow-sm border border-gray-100
                                                     hover:bg-gray-100 text-gray-600 hover:text-black
                                                     transition-all duration-300 flex items-center justify-center text-lg active:scale-95"
                                        onClick={() => {
                                            changeQty(index, -1);
                                        }}>
                                        <BiMinus size={14} />
                                    </button>
                                    <span className="w-6 text-center text-sm font-semibold text-gray-900">
                                        {item.qty}
                                    </span>
                                    <button className="w-8 h-8 rounded-md bg-white shadow-sm border border-gray-100
                                                     hover:bg-gray-100 text-gray-600 hover:text-black
                                                     transition-all duration-300 flex items-center justify-center text-lg active:scale-95"
                                        onClick={() => {
                                            changeQty(index, +1);
                                        }}>
                                        <BiPlus size={14} />
                                    </button>
                                </div>

                                {/* Item Total */}
                                <div className="text-right min-w-[90px] hidden sm:block">
                                    <h1 className="text-base font-semibold text-gray-900 whitespace-nowrap">
                                        LKR {(item.sellingPrice * item.qty).toFixed(2)}
                                    </h1>
                                </div>
                            </div>

                            {/* Remove Button */}
                            <button className="absolute -top-2 -right-2 
                                             w-7 h-7 rounded-full bg-white border border-gray-200
                                             text-gray-400 hover:bg-gray-100 hover:text-red-500 hover:border-red-200
                                             transition-all duration-300 shadow-sm
                                             flex items-center justify-center z-10"
                                onClick={() => {
                                    removeFromCart(index)
                                }}
                                title="Remove item">
                                <BiTrash size={14} />
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Mobile Checkout Bar - Improved visibility and styling */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-8px_30px_rgb(0,0,0,0.06)] 
                          rounded-t-3xl p-5 border-t border-gray-100 z-50 animate-in slide-in-from-bottom-5">

                <div className="max-w-6xl mx-auto">
                    {/* Inputs */}
                    <div className="flex flex-col gap-3 mb-4">
                        <input type="tel" placeholder="Phone Number"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 transition-all"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />

                        <input type="text" placeholder="Full Delivery Address"
                            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm
                                    focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-500 transition-all"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)} />
                    </div>

                    <div className="w-full flex items-center justify-between gap-4">
                        <div>
                            <p className="text-xs text-gray-500 font-medium tracking-wide uppercase">Total Amount</p>
                            <p className="text-xl sm:text-2xl font-bold text-gray-900 leading-tight">
                                LKR {getTotal().toFixed(2)}
                            </p>
                        </div>
                        <button
                            disabled={!phoneNumber || !address}
                            className="flex-1 max-w-[200px] bg-black text-white px-6 py-3.5 rounded-xl font-medium text-sm
                                       hover:bg-gray-800 transition-all duration-300 shadow-xl shadow-black/10
                                       disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none disabled:cursor-not-allowed"
                            onClick={placeOrder} >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}