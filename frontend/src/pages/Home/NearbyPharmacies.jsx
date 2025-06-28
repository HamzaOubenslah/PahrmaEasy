import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNearbyPharmacies } from "../../store/authThunk/authThunk";

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
          dispatch(fetchNearbyPharmacies({ lat: latitude, lng: longitude }));
        },
        () => {
          console.error("Location permission denied");
        }
      );
    }
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-50 py-16 px-4 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-10 text-center tracking-wide">
          Nearby Pharmacies
        </h1>

        {loading && (
          <p className="text-indigo-600 text-center font-semibold mb-6">
            Loading...
          </p>
        )}
        {error && (
          <p className="text-red-600 text-center font-semibold mb-6">{error}</p>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {nearbyPharmacies.map((pharmacy) => (
            <div
              key={pharmacy._id}
              className="p-6 rounded-2xl border border-indigo-200 shadow-md bg-gradient-to-tr from-indigo-100 via-purple-50 to-pink-50 hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <h2 className="text-2xl font-semibold mb-3 text-indigo-800">
                {pharmacy.name}
              </h2>
              <p className="text-indigo-700 mb-2">
                <span className="font-semibold">Email:</span> {pharmacy.email}
              </p>
              <p className="text-indigo-700 mb-2">
                <span className="font-semibold">Address:</span> {pharmacy.address}
              </p>
              <p className="text-indigo-700 mb-2">
                <span className="font-semibold">Phone:</span>{" "}
                {pharmacy.phone || "N/A"}
              </p>
              <p className="text-indigo-700">
                <span className="font-semibold">24/7:</span>{" "}
                <span
                  className={
                    pharmacy.is24Hours
                      ? "text-green-600 font-semibold"
                      : "text-gray-500"
                  }
                >
                  {pharmacy.is24Hours ? "Yes" : "No"}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NearbyPharmaciesPage;
