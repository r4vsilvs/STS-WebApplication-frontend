import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/loading";
import ImageSliderPage from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";
import BASE_URL from "../../utils/api";

export default function ProductOverviewPage() {
  const params = useParams();
  const productId = params.id;
  const [status, setStatus] = useState("loading");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    if (productId) {
      axios.get(`${BASE_URL}/api/product/` + productId)
        .then((response) => {
          setProduct(response.data);
          setStatus("sucess");
        })
        .catch(() => {
          setStatus("error");
          toast.error("Error fetching product");
        });
    }
  }, [productId]);

  if (status === "loading") return <Loading />;

  return (
    <>
      {status === "sucess" && (
        <div className="w-full min-h-screen bg-[#FBFBFB] font-poppins text-[#1d1d1f] flex flex-col items-center py-12 px-6">

          <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

            <div className="w-full flex justify-center">
              <div className="w-full max-w-lg">
                <ImageSliderPage images={product.imgUrls} />
              </div>
            </div>

            <div className="flex flex-col pt-4">
              <p className="text-sm font-medium text-gray-500 mb-1 uppercase tracking-tight">
                Apple
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold mb-4">
                {product.productName}
              </h1>

              <div className="text-2xl font-normal mb-6">
                Rs {product.sellingPrice.toLocaleString()}.00
                {product.labeledPrice > product.sellingPrice && (
                  <span className="ml-3 text-lg text-gray-400 line-through">
                    Rs {product.labeledPrice.toLocaleString()}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-4 max-w-md">

                <div className="flex items-center gap-4">

                  {/* Add to Cart Button */}
                  <button
                    className="flex-1 bg-[#1d1d1f] text-white rounded-full h-[54px] font-semibold text-lg hover:opacity-90 transition-all active:scale-95"
                    onClick={() => {
                      addToCart(product, quantity);
                      navigate("/cart");
                    }}
                  >
                    Add to cart
                  </button>
                </div>

                {/* Buy it now Button */}
                <button
                  className="w-full border-2 border-[#1d1d1f] text-[#1d1d1f] rounded-full h-[54px] font-semibold text-lg hover:bg-[#1d1d1f] hover:text-white transition-all duration-300 active:scale-95"
                  onClick={() => {
                    navigate("/checkout", {
                      state: {
                        cart: [{
                          productId: product.productId,
                          productName: product.productName,
                          imgUrls: [product.imgUrls?.[0]],
                          sellingPrice: product.sellingPrice,
                          labeledPrice: product.labeledPrice,
                          qty: quantity,
                        }],
                      },
                    });
                  }}
                >
                  Buy it now
                </button>
                <div
                  className="text-gray-600 mb-8 whitespace-pre-line leading-relaxed mt-6"
                  style={{ fontFamily: "'SF Pro Display', 'San Francisco Pro', -apple-system, BlinkMacSystemFont, sans-serif" }}
                >
                  {product.description}
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}