import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllMedicines } from "../store/pharmacyThunk";
import { Link } from "react-router-dom";
import { addCart } from "../store/cartThunk/cartThunk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Search, ShoppingCart, Plus, Minus, Frown } from "lucide-react";

const AllMedicines = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.medicine);
  const [searchTerm, setSearchTerm] = useState("");
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchAllMedicines());
  }, [dispatch]);

  const handleAddToCart = async (medicine) => {
    const quantity = quantities[medicine._id] || 1;
    
    if (medicine.stock < quantity) {
      toast.error(`Only ${medicine.stock} items available in stock`);
      return;
    }

    try {
      await dispatch(
        addCart({
          medicineId: medicine._id,
          quantity,
        })
      ).unwrap();

      toast.success(`${quantity} ${medicine.name} added to cart`);
    } catch (error) {
      toast.error(`Failed to add ${medicine.name} to cart`);
    }
  };

  const handleQuantityChange = (medicineId, value) => {
    const newValue = Math.max(1, Math.min(100, value));
    setQuantities((prev) => ({
      ...prev,
      [medicineId]: newValue,
    }));
  };

  const filteredMedicines = medicines?.filter((medicine) =>
    medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Find Your Medications
        </h1>
        <div className="relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search medicines..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#39DB74] focus:border-transparent shadow-sm pl-10"
          />
          <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39DB74]"></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}

      {/* Medicines Grid */}
      {filteredMedicines && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedicines.length > 0 ? (
            filteredMedicines.map((medicine) => (
              <div
                key={medicine._id}
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-all border border-gray-100"
              >
                {/* Medicine Image */}
                <div className="h-48 bg-gray-100 overflow-hidden">
                  {medicine.image ? (
                    <img
                      src={medicine.image}
                      alt={medicine.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Medicine Info */}
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {medicine.name}
                    </h3>
                    <span className="text-[#39DB74] font-medium text-lg">
                      ${medicine.price}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-600 text-sm line-clamp-2">
                    {medicine.description}
                  </p>

                  {/* Stock Status */}
                  <div className="mt-3">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        medicine.stock > 0
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {medicine.stock > 0
                        ? `In Stock (${medicine.stock})`
                        : "Out of Stock"}
                    </span>
                  </div>

                  {/* Pharmacy Info */}
                  {medicine.pharmacy && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center">
                        {medicine.pharmacy.profileImage ? (
                          <Link to={`/pharmacies/${medicine.pharmacy._id}`}>
                            <img
                              src={medicine.pharmacy.profileImage}
                              alt={medicine.pharmacy.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          </Link>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">
                            <Link to={`/pharmacies/${medicine.pharmacy._id}`}>
                              {medicine.pharmacy.name}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart Section */}
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center border border-gray-200 rounded-lg">
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            medicine._id,
                            (quantities[medicine._id] || 1) - 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        disabled={(quantities[medicine._id] || 1) <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="mx-2 w-8 text-center">
                        {quantities[medicine._id] || 1}
                      </span>
                      <button
                        onClick={() =>
                          handleQuantityChange(
                            medicine._id,
                            (quantities[medicine._id] || 1) + 1
                          )
                        }
                        className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50"
                        disabled={
                          (quantities[medicine._id] || 1) >= medicine.stock
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => handleAddToCart(medicine)}
                      disabled={medicine.stock <= 0}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        medicine.stock > 0
                          ? "bg-[#39DB74] text-white hover:bg-green-600"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      } transition-colors`}
                    >
                      <ShoppingCart size={16} />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <Frown className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">
                No medicines found
              </h3>
              <p className="mt-1 text-gray-500">
                Try adjusting your search to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AllMedicines;