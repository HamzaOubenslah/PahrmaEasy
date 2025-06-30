// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../store/authThunk/authThunk";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, success, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    profileImage: null,
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        profileImage: null,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prev) => ({ ...prev, profileImage: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    if (formData.profileImage)
      data.append("profileImage", formData.profileImage);
    dispatch(updateProfile(data));
    setIsEditing(false);
  };

  const MapIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your account information and activities
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
              <div className="relative">
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt="Profile"
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-3xl font-bold">
                    {user?.name?.[0]}
                  </div>
                )}
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-gray-600">{user?.email}</p>
                <span className="inline-block mt-2 px-3 py-1 text-sm font-medium bg-indigo-100 text-indigo-800 rounded-full">
                  {user?.role}
                </span>

                {!isEditing && (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Edit Form or View Mode */}
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profile Image
                    </label>
                    <input
                      type="file"
                      name="profileImage"
                      accept="image/*"
                      onChange={handleChange}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Full Name
                    </h3>
                    <p className="mt-1 text-gray-900">{user?.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">
                      Email Address
                    </h3>
                    <p className="mt-1 text-gray-900">{user?.email}</p>
                  </div>
                </div>
              </div>
            )}

            {success && (
              <div className="mt-6 p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-center">
                Profile updated successfully!
              </div>
            )}
          </div>

          {/* Orders Section */}
          {user?.orders?.length > 0 && (
            <div className="border-t border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                My Orders
              </h2>
              <div className="space-y-4">
                {user.orders.map((order) => (
                  <div
                    key={order._id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">
                      {user.role === "customer"
                        ? `Pharmacy: ${order.pharmacy?.name}`
                        : `Customer: ${order.customer?.name}`}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Section */}
          {user?.reviews?.length > 0 && (
            <div className="border-t border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                My Reviews
              </h2>
              <div className="space-y-4">
                {user.reviews.map((review) => (
                  <div
                    key={review._id}
                    className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition"
                  >
                    <div className="flex justify-between">
                      <h3 className="font-medium text-gray-900">
                        {user.role === "customer"
                          ? `For ${review.pharmacy?.name}`
                          : `From ${review.customer?.name}`}
                      </h3>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">{review.comment}</p>
                    <p className="mt-2 text-xs text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Map Section - Preserved exactly as in original */}
          {user?.role === "pharmacy" && (
            <div className="border-t border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Pharmacy Location
              </h2>
              <div className="h-96 rounded-lg overflow-hidden">
                <MapContainer
                  className="h-full w-full"
                  center={[
                    user.location.coordinates[0],
                    user.location.coordinates[1],
                  ]}
                  zoom={13}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  <Marker position={user.location.coordinates} icon={MapIcon}>
                    <Popup>
                      <h2>{user.name}</h2>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
