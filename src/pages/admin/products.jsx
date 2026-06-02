import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import BASE_URL from "../../utils/api";
import { FiEdit } from "react-icons/fi";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";


export function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      axios
        .get(`${BASE_URL}/api/product`)
        .then((res) => {
          setProducts(res.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoading]);

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("User Not authorized");
      return;
    }

    axios
      .delete(`${BASE_URL}/api/product/` + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch((e) => {
        toast.error("Delete failed");
      });
  }

  return (
    <div className="w-full h-full relative">

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">
          Product Management
        </h2>

        <Link
          to="/admin/products/add"
          className="bg-[#547792] text-white px-5 py-2 rounded-lg shadow hover:bg-[#547792]/80 transition cursor-pointer cursor-text-black-600 font-semibold"
        >
          + Add Product
        </Link>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh] flex-col gap-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading products...</p>
        </div>
      ) : (

        /* Table Card */
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-600 whitespace-nowrap">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4">ID</th>
                  <th className="px-6 py-4">Image</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Label Price</th>
                  <th className="px-6 py-4">Selling Price</th>
                  <th className="px-6 py-4">Stock</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-center">Actions</th>
                </tr>
              </thead>

              <tbody>
                {products.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      {item.productId}
                    </td>

                    <td className="px-6 py-4">
                      <img
                        src={item.imgUrls[0]}
                        alt="product"
                        className="w-14 h-14 object-cover rounded-lg shadow"
                      />
                    </td>

                    <td className="px-6 py-4 font-semibold">
                      {item.productName}
                    </td>

                    <td className="px-6 py-4 text-gray-500 max-w-xs truncate">
                      {item.description}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      Rs. {item.labeledPrice}
                    </td>

                    <td className="px-6 py-4 text-secondary-600 font-bold">
                      Rs. {item.sellingPrice}
                    </td>

                    <td className="px-6 py-4">
                      {item.stock}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs rounded-full font-semibold ${item.isAvailable
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                          }`}
                      >
                        {item.isAvailable ? "Available" : "Out of Stock"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center items-center gap-4">
                        <FaTrash

                          onClick={() => deleteProduct(item.productId)}
                          className="text-[22px] cursor-pointer hover:scale-125 transition text-primary"
                        />

                        <FiEdit
                          onClick={() =>
                            navigate("/admin/products/edit-products", {
                              state: item,
                            })
                          }
                          className="text-[22px] cursor-pointer hover:scale-125 transition text-primary"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}
    </div>
  );
}