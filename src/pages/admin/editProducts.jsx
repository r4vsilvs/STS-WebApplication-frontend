import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import BASE_URL from "../../utils/api";

export function EditProductsPage() {

  const location = useLocation()
  const [productId, setProductId] = useState(location.state.productId);
  const [productName, setProductName] = useState(location.state.productName);
  const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
  const [sellingPrice, setSellingPrice] = useState(location.state.sellingPrice);
  const [stock, setStock] = useState(location.state.stock);
  const [description, setDescription] = useState(location.state.description || "");
  // const [isAvailable, setIsAvailable] = useState(true);
  const [imgUrls, setImgUrls] = useState([]);
  const [altNames, setAltNames] = useState(location.state.altNames.join(","));
  const navigate = useNavigate()



  async function EditProducts(e) {

    const token = localStorage.getItem("token")
    if (token == null) {
      toast.error("You are not authorized to perform this action");
      toast.error("Please login as admin to continue");
      return;
    }

    let finalImgUrls = location.state.imgUrls;

    const promisesArray = [];

    // Only upload new images if user selected them
    if (imgUrls.length > 0) {
      for (let i = 0; i < imgUrls.length; i++) {
        promisesArray.push(mediaUpload(imgUrls[i]));
      }
    }
    try {
      if (promisesArray.length > 0) {
        finalImgUrls = await Promise.all(promisesArray);
      }

      const altNamesArray = altNames.split(",")

      const product = {
        productId: productId,
        productName: productName,
        labeledPrice: Number(labeledPrice),
        sellingPrice: Number(sellingPrice),
        stock: Number(stock),
        imgUrls: finalImgUrls,
        description: description,
        altNames: altNamesArray
      }

      axios.put(`${BASE_URL}/api/product/${productId}`, product, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).then((response) => {
        toast.success("Product updated successfully");
        navigate("/admin/products")

      }).catch((error) => {
        console.log("Error response:", error.response);
        toast.error(error.response?.data?.message || "Failed to update product");
      })



    } catch (e) {
      toast.error("Image upload failed. Please try again.");
      return;
    }
  }

  return (
    <div className="w-full flex justify-center py-10 px-4 flex flex-col">
      <h1 className="text-2xl font-bold text-secondary w-full">
        Edit Product
      </h1>
      <div className="w-full max-w-6xl bg-white rounded-2xl  relative">

        {/* Header */}
        <div className="flex justify-between items-start mb-10">



          {/* Current Image Top Right */}
          <div className="flex flex-col items-center">
            <img
              src={location.state.imgUrls[0]}
              alt="product"
              className="w-32 h-32 object-cover rounded-xl shadow-md border"
            />
          </div>

        </div>

        {/* 2 Column Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* LEFT COLUMN */}
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Product ID
              </label>
              <input
                type="text"
                disabled
                value={productId}
                className="w-full px-4 py-3 border rounded-lg bg-gray-100"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Labeled Price
              </label>
              <input
                type="number"
                value={labeledPrice}
                onChange={(e) => setLabeledPrice(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Selling Price
              </label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-secondary mb-2">
                Upload New Images
              </label>
              <input
                type="file"
                multiple
                onChange={(e) => setImgUrls(e.target.files)}
                className="w-full px-4 py-3 border rounded-lg file:bg-accent file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
              />
            </div>

          </div>

        </div>

        {/* Full Width Description */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-secondary mb-2">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-y"
            placeholder="Enter product description here..."
          />
        </div>

        {/* Full Width Alt Names */}
        <div className="mt-8">
          <label className="block text-sm font-semibold text-secondary mb-2">
            Alt Names (comma separated)
          </label>
          <input
            type="text"
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Buttons Bottom Row */}
        <div className="flex justify-end gap-4 mt-12 border-t pt-6">

          <Link
            to="/admin/products"
            className="px-8 py-3 rounded-lg bg-gray-200 text-secondary font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </Link>

          <button
            onClick={EditProducts}
            className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition shadow-md"
          >
            Update Product
          </button>

        </div>

      </div>

    </div>
  );
}