import { useState } from "react"
import { addToCart, getCart, getTotal, removeFromCart } from "../../utils/cart"
import { BiMinus, BiPlus, BiTrash, BiShoppingBag } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function CartPage() {
    const [cart, setCart] = useState(getCart())

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

            {/* Desktop Checkout Card - Moved to better position */}
            <div className="z-30 hidden lg:flex w-[320px] bg-white/90 backdrop-blur-sm 
                          h-[100px] shadow-xl rounded-xl sticky top-24 self-end mr-8 
                          flex-row items-center justify-between px-6 border border-accent/20">
                <div>
                    <p className="text-xs text-gray-500">Total</p>
                    <p className="text-2xl font-bold text-accent">
                        LKR {getTotal().toFixed(2)}
                    </p>
                </div>
                <Link to="/checkout" state={{ cart: cart }}
                    className="bg-gradient-to-r from-accent to-secondary text-white 
                               px-5 py-2.5 rounded-lg font-bold text-sm
                               hover:from-secondary hover:to-accent 
                               transform hover:scale-105 transition-all duration-300 
                               shadow-lg whitespace-nowrap">
                    Checkout
                </Link>
            </div>

            {/* Cart Header */}
            <div className="w-full max-w-4xl px-4 md:px-8 mb-6">
                <h1 className="text-3xl font-bold text-secondary">Shopping Cart</h1>
                <p className="text-gray-500 mt-1">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
            </div>

            {/* Cart Items Container */}
            <div className="w-full max-w-4xl px-4 md:px-8 space-y-4 mb-8">
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
                                <div className="flex-shrink-0">
                                    <img src={item.imgUrls}
                                        className="w-[100px] h-[100px] object-cover rounded-xl 
                                                  shadow-md group-hover:shadow-lg 
                                                  transition-all duration-300"/>
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <h1 className="text-lg md:text-xl text-secondary font-bold 
                                                 group-hover:text-accent transition-colors">
                                        {item.productName}
                                    </h1>
                                    <p className="text-xs text-gray-400 mb-2">
                                        ID: {item.productId}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {item.labeledPrice > item.sellingPrice ? (
                                            <>
                                                <span className="text-sm text-gray-400 line-through">
                                                    LKR {item.labeledPrice.toFixed(2)}
                                                </span>
                                                <span className="text-base md:text-lg font-bold text-accent">
                                                    LKR {item.sellingPrice.toFixed(2)}
                                                </span>
                                            </>
                                        ) : (
                                            <span className="text-base md:text-lg font-bold text-accent">
                                                LKR {item.sellingPrice.toFixed(2)}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quantity Controls and Price Row */}
                            <div className="flex flex-row items-center justify-between w-full md:w-auto mt-4 md:mt-0 md:ml-4 gap-4">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                    <button className="w-8 h-8 rounded-lg bg-accent/10 
                                                     hover:bg-accent text-accent 
                                                     hover:text-white transition-all duration-300 
                                                     flex items-center justify-center text-lg 
                                                     font-bold"
                                        onClick={() => {
                                            addToCart(item, -1)
                                            setCart(getCart())
                                        }}>
                                        <BiMinus />
                                    </button>
                                    <span className="w-8 text-center text-lg font-bold 
                                                   text-secondary">
                                        {item.qty}
                                    </span>
                                    <button className="w-8 h-8 rounded-lg bg-accent/10 
                                                     hover:bg-accent text-accent 
                                                     hover:text-white transition-all duration-300 
                                                     flex items-center justify-center text-lg 
                                                     font-bold"
                                        onClick={() => {
                                            addToCart(item, 1)
                                            setCart(getCart())
                                        }}>
                                        <BiPlus />
                                    </button>
                                </div>

                                {/* Item Total */}
                                <div className="text-right min-w-[100px]">
                                    <p className="text-xs text-gray-400">Subtotal</p>
                                    <h1 className="text-lg font-bold text-secondary whitespace-nowrap">
                                        LKR {(item.sellingPrice * item.qty).toFixed(2)}
                                    </h1>
                                </div>
                            </div>

                            {/* Remove Button - Repositioned with better spacing */}
                            <button className="absolute -top-2 -right-2 md:static 
                                             w-8 h-8 rounded-full bg-red-50 
                                             text-red-500 hover:bg-red-500 
                                             hover:text-white transition-all duration-300 
                                             flex items-center justify-center 
                                             shadow-md hover:shadow-lg md:ml-2"
                                onClick={() => {
                                    removeFromCart(item.productId)
                                    setCart(getCart())
                                }}
                                title="Remove item">
                                <BiTrash className="text-sm" />
                            </button>
                        </div>
                    )
                })}
            </div>

            {/* Checkout Section - Improved placement */}
            <div className="w-full max-w-4xl px-4 md:px-8 mt-4">
                {/* Desktop Bottom Checkout (for medium screens where floating card might not show) */}
                <div className="hidden md:flex lg:hidden bg-white rounded-xl shadow-lg 
                              p-6 items-center justify-between border border-accent/20">
                    <div>
                        <p className="text-sm text-gray-500">Total Amount</p>
                        <p className="text-3xl font-bold text-accent">
                            LKR {getTotal().toFixed(2)}
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <Link to="/products"
                            className="px-6 py-3 border-2 border-accent text-accent 
                                       rounded-xl font-bold hover:bg-accent/5 
                                       transition-colors duration-300">
                            Continue Shopping
                        </Link>
                        <Link to="/checkout" state={{ cart: cart }}
                            className="bg-gradient-to-r from-accent to-secondary 
                                       text-white px-8 py-3 rounded-xl font-bold 
                                       hover:from-secondary hover:to-accent 
                                       transform hover:scale-105 transition-all duration-300 
                                       shadow-lg">
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>

                {/* Mobile Checkout Bar - Improved visibility and spacing */}
                <div className="md:hidden fixed bottom-4 left-4 right-4 
                              bg-white shadow-2xl rounded-xl 
                              flex flex-col items-center p-4 
                              border-2 border-accent/20 z-50">
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-500">Total Amount</p>
                            <p className="text-2xl font-bold text-accent">
                                LKR {getTotal().toFixed(2)}
                            </p>
                        </div>
                        <Link to="/checkout" state={{ cart: cart }}
                            className="bg-gradient-to-r from-accent to-secondary 
                                       text-white px-6 py-3 rounded-xl font-bold 
                                       hover:from-secondary hover:to-accent 
                                       transition-all duration-300 
                                       shadow-lg">
                            Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}