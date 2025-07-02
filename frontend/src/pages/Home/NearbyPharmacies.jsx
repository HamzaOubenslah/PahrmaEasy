import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNearbyPharmacies } from "../../store/authThunk/authThunk";
import {
  FiMapPin,
  FiPhone,
  FiMail,
  FiClock,
  FiCrosshair,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const NearbyPharmaciesPage = () => {
  const dispatch = useDispatch();
  const { nearbyPharmacies, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(fetchNearbyPharmacies({ latitude, longitude }));
        },
        () => {
          console.error("Location permission denied");
        }
      );
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-3">
            Nearby Pharmacies
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find pharmacies in your neighborhood
          </p>
          <div className="mt-4 flex justify-center items-center text-sm">
            <FiCrosshair className="text-[#39DB74] mr-2" />
            <span className="text-gray-500">Using your current location</span>
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
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Pharmacies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nearbyPharmacies.map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              {/* Pharmacy Header */}
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800">
                  {pharmacy.name}
                </h2>
                <div className="flex items-center mt-2 text-gray-600">
                  <FiMapPin className="mr-2 text-[#39DB74]" />
                  <span className="text-sm">{pharmacy.address}</span>
                </div>
              </div>

              {/* Pharmacy Details */}
              <div className="p-6">
                <div className="space-y-4">
                  {/* Email */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 rounded-lg text-gray-500">
                      <FiMail className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Email</p>
                      <p className="text-sm text-gray-900">{pharmacy.email}</p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 rounded-lg text-gray-500">
                      <FiPhone className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Phone</p>
                      <p className="text-sm text-gray-900">
                        {pharmacy.phone || "Not provided"}
                      </p>
                    </div>
                  </div>

                  {/* 24/7 Availability */}
                  <div className="flex items-start">
                    <div className="flex-shrink-0 p-2 rounded-lg text-gray-500">
                      <FiClock className="h-5 w-5" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        Availability
                      </p>
                      <p
                        className={`text-sm font-medium ${
                          pharmacy.is24Hours
                            ? "text-[#39DB74]"
                            : "text-gray-600"
                        }`}
                      >
                        {pharmacy.is24Hours
                          ? "24/7 Service Available"
                          : "Limited Hours"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6">
                  <Link to={`/pharmacies/${pharmacy._id}`}>
                    <button className="w-full bg-white border border-[#39DB74] text-[#39DB74] hover:bg-[#39DB74] hover:text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {!loading && nearbyPharmacies.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto h-24 w-24 text-gray-300">
              <FiMapPin className="w-full h-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-800">
              No pharmacies found
            </h3>
            <p className="mt-2 text-gray-500">
              We couldn't find any pharmacies near your current location.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NearbyPharmaciesPage;
