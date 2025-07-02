import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacies } from "../store/pharmacyThunk/pharmacyThunk";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";

const Pharmacies = () => {
  const dispatch = useDispatch();
  const { pharmacies, loading, error } = useSelector((state) => state.pharmacy);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    dispatch(fetchPharmacies());
  }, [dispatch]);

  const filteredPharmacies = pharmacies.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex justify-center p-6 mt-6">
      <div className="w-full" style={{ width: '66.666667%' }}>
        <div className="space-y-6">
          {/* Search bar */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2 w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Pharmacies"
                className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#39DB74]"
              />
              <Search className="h-5 w-5 text-gray-500" />
            </div>
          </div>

          {/* Loading & Error Handling */}
          {loading && (
            <div className="flex justify-center">
              <div className="text-blue-500">Loading pharmacies...</div>
            </div>
          )}
          {error && (
            <div className="flex justify-center">
              <div className="text-red-500">{error}</div>
            </div>
          )}

          {/* Pharmacies List */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredPharmacies.length === 0 ? (
              <div className="text-center text-gray-500 col-span-3">
                No pharmacies found
              </div>
            ) : (
              filteredPharmacies.map((pharmacy) => (
                <div 
                  key={pharmacy._id} 
                  className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-gray-100"
                >
                  {/* Pharmacy Image */}
                  <div className="flex justify-center mb-4">
                    <img
                      src={pharmacy.profileImage || "/default-image.png"}
                      alt={pharmacy.name}
                      className="w-32 h-32 object-cover rounded-full"
                    />
                  </div>

                  {/* Pharmacy Details */}
                  <h3 className="text-xl font-semibold text-gray-800 text-center">
                    {pharmacy.name}
                  </h3>
                  <p className="text-sm text-gray-500 text-center">
                    {pharmacy.email}
                  </p>
                  <p className="text-sm text-gray-500 text-center">
                    {pharmacy.address}
                  </p>

                  {/* View Details Button */}
                  <div className="mt-4 text-center">
                    <Link
                      to={`/pharmacies/${pharmacy._id}`}
                      className="inline-block border-2 border-[#39DB74] text-[#39DB74] bg-transparent py-2 px-6 rounded-lg hover:bg-[#39DB74] hover:text-white transition-all duration-300"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharmacies;