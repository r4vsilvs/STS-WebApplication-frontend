import { Routes, Route, Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { AdminProductsPage } from "./admin/products";
import { AddProductsPage } from "./admin/addProducts";
import { AdminUsersPage } from "./admin/users";
import { EditProductsPage } from "./admin/editProducts";
import { FaBoxOpen, FaUsers, FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { AdminOrdersPage } from "./admin/orders";
import Logout from "./logout";
import { useAuth } from "../context/AuthContext";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;
  const { user } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userName = user ? `${user.firstName} ${user.lastName}` : "Admin";

  function getClass(name) {
    return `flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300
    ${path.includes(name)
        ? "bg-[#547792] text-white shadow-lg"
        : "text-gray-600 hover:bg-[#547792]/10 hover:text-[#547792]-600"
      }`;
  }

  return (
    <div className="w-full h-screen flex bg-gray-50 overflow-hidden font-poppins relative">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:static top-0 left-0 h-full w-[260px] bg-white shadow-xl lg:shadow-md p-6 flex flex-col z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 overflow-y-auto ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >

        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Admin Panel
          </h1>
          <button
            className="lg:hidden text-gray-500 hover:text-gray-800"
            onClick={() => setIsSidebarOpen(false)}
          >
            <FaTimes size={24} />
          </button>
        </div>

        <nav className="flex flex-col gap-3">
          <Link className={getClass("/products")} to="/admin/products" onClick={() => setIsSidebarOpen(false)}>
            <FaBoxOpen size={18} /> <span className="font-medium">Products</span>
          </Link>

          <Link className={getClass("/orders")} to="/admin/orders" onClick={() => setIsSidebarOpen(false)}>
            <FaShoppingCart size={18} /> <span className="font-medium">Orders</span>
          </Link>

          <Link className={getClass("/users")} to="/admin/users" onClick={() => setIsSidebarOpen(false)}>
            <FaUsers size={18} /> <span className="font-medium">Users</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">

        {/* Top Header */}
        <div className="bg-white px-6 py-4 shadow-sm border-b border-gray-100 flex items-center justify-between z-10">

          <div className="flex items-center gap-4">
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900 transition-colors"
              onClick={() => setIsSidebarOpen(true)}
            >
              <FaBars size={24} />
            </button>
            <h2 className="text-xl font-bold text-gray-800 hidden sm:block">
              Dashboard
            </h2>
          </div>

          {/* Desktop Welcome Message (Hidden on small screens) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 font-medium text-gray-500">
            Welcome back, <span className="text-gray-800">{userName}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-800 text-sm font-semibold rounded-lg hover:bg-gray-200 transition-colors">
              Shop
            </Link>
            <Logout />
          </div>

        </div>

        {/* Page Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-gray-50">
          <div className="max-w-7xl mx-auto w-full">
            <Routes>
              <Route path="/products" element={<AdminProductsPage />} />
              <Route path="/products/add" element={<AddProductsPage />} />
              <Route path="/products/edit-products" element={<EditProductsPage />} />
              <Route path="/orders" element={<AdminOrdersPage />} />
              <Route path="/users" element={<AdminUsersPage />} />
            </Routes>
          </div>
        </div>

      </div>
    </div>
  );
}