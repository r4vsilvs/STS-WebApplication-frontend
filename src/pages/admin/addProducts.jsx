import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import BASE_URL from "../../utils/api";

export function AddProductsPage() {
  const [productId, setProductId] = useState("");
  const [productName, setProductName] = useState("");
  const [labeledPrice, setLabeledPrice] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const [description, setDescription] = useState("");
  const [imgUrls, setImgUrls] = useState([]);
  const [altNames, setAltNames] = useState("");
  const navigate = useNavigate();

  async function AddProducts() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You are not authorized to perform this action");
      return;
    }

    if (imgUrls.length <= 0) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      const promisesArray = Array.from(imgUrls).map(file => mediaUpload(file));
      const imgUrlsUploaded = await Promise.all(promisesArray);

      const product = {
        productId,
        productName,
        labeledPrice: Number(labeledPrice),
        sellingPrice: Number(sellingPrice),
        stock: Number(stock),
        description: description,
        imgUrls: imgUrlsUploaded,
        altNames: altNames.split(","),
      };

      await axios.post(`${BASE_URL}/api/product/add`, product, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (e) {
      toast.error("Image upload or product creation failed.");
    }
  }

  return (
    <div className="w-full py-10 px-4 flex justify-center">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-8">

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-700">Add Product</h1>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product ID</label>
              <input
                type="text"
                value={productId}
                onChange={(e) => setProductId(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Labeled Price</label>
              <input
                type="number"
                value={labeledPrice}
                onChange={(e) => setLabeledPrice(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>


          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Selling Price</label>
              <input
                type="number"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Stock Quantity</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Upload Images</label>
              <input
                type="file"
                multiple
                onChange={(e) => setImgUrls(e.target.files)}
                className="w-full px-4 py-3 border rounded-lg file:bg-primary file:text-white file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
              />
            </div>
          </div>

        </div>

        {/* Description Full Width */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="4"
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none resize-y"
            placeholder="Enter product description here..."
          />
        </div>

        {/* Alt Names */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Alt Names (comma separated)</label>
          <input
            type="text"
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary outline-none"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 mt-4 border-t pt-6">
          <Link
            to="/admin/products"
            className="px-8 py-3 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 transition"
          >
            Cancel
          </Link>

          <button
            onClick={AddProducts}
            className="px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition shadow-md"
          >
            Add Product
          </button>
        </div>

      </div>
    </div>
  );
}