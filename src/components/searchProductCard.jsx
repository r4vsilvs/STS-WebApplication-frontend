import { Link, useNavigate } from "react-router-dom";

export function SearchProductCard({ product }) {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white rounded-xl md:rounded-2xl p-3 md:p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col group">

      <Link to={`/overview/${product.productId}`} className="flex flex-col items-center">
        <div className="h-32 md:h-48 w-full flex items-center justify-center mb-4 md:mb-6 mt-2">
          {product.imgUrls && product.imgUrls.length > 0 ? (
            <img
              src={product.imgUrls[0]}
              alt={product.productName}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500 ease-out"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="text-center w-full space-y-1">
          <p className="text-[9px] md:text-[10px] font-medium text-gray-400 uppercase tracking-widest hidden sm:block">
            Apple
          </p>
          <h3 className="font-semibold text-sm md:text-lg text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {product.productName}
          </h3>

          <div className="flex flex-col items-center">
            <p className="text-xs md:text-sm text-gray-600">
              From <span className="font-bold text-gray-900">Rs.{product.sellingPrice}</span>
            </p>
            {product.labeledPrice > product.sellingPrice && (
              <p className="text-[10px] md:text-xs text-gray-400 line-through">
                Rs.{product.labeledPrice}
              </p>
            )}
          </div>
        </div>
      </Link>

      <div className="mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-50 flex items-center justify-between">
        <span
          className={`text-[10px] md:text-xs font-semibold px-2 py-1 rounded-full ${product.isAvailable && product.stock > 0
              ? "bg-gray-50 text-gray-600"
              : "bg-red-50 text-red-500"
            }`}
        >
          {product.isAvailable && product.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>

        <button
          disabled={!product.isAvailable || product.stock <= 0}
          className="px-2 md:px-4 py-1.5 text-[10px] md:text-xs font-bold rounded-full text-gray-900 border-2 border-gray-800 hover:bg-black hover:text-white disabled:border-gray-300 disabled:text-gray-300 disabled:bg-transparent transition-all transform active:scale-95"
          onClick={(e) => {
            e.preventDefault();
            navigate("/checkout", {
              state: {
                cart: [{
                  productId: product.productId,
                  productName: product.productName,
                  imgUrls: [product.imgUrls?.[0]],
                  sellingPrice: product.sellingPrice,
                  labeledPrice: product.labeledPrice,
                  qty: 1,
                }],
              },
            });
          }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}