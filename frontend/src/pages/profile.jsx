// ProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../store/authThunk/authThunk";

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
    if (formData.profileImage) data.append("profileImage", formData.profileImage);
    dispatch(updateProfile(data));
    setIsEditing(false);
  };

  if (loading) return <p className="p-4 text-center text-gray-500">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-10">
        <div className="hidden lg:block"></div>

        <div className="lg:col-span-2 w-full">
          <div className="bg-white rounded-3xl shadow-lg p-8 lg:p-12">
            <h1 className="text-4xl font-bold text-indigo-700 mb-8 border-b pb-4">
              My Profile
            </h1>

            {success && (
              <div className="mb-6 px-5 py-3 rounded-lg bg-green-50 border border-green-300 text-green-700 font-medium text-center">
                Profile updated successfully!
              </div>
            )}

            {!isEditing ? (
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="relative rounded-full bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-500 p-1 hover:scale-105 transition-transform shadow-lg">
                  {user?.profileImage ? (
                    <img
                      src={user.profileImage}
                      alt="Profile"
                      className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-md"
                    />
                  ) : (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-600 text-5xl font-black">
                      {user?.name?.[0]}
                    </div>
                  )}
                </div>

                <div className="text-center sm:text-left">
                  <h2 className="text-3xl font-semibold text-gray-900">{user?.name}</h2>
                  <p className="text-gray-600 text-lg">{user?.email}</p>

                  <button
                    onClick={() => setIsEditing(true)}
                    className="mt-5 inline-block px-6 py-2 bg-indigo-600 text-white rounded-full shadow hover:bg-indigo-700 transition"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 font-medium">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-3 rounded-lg"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Orders Section */}
          {user?.orders?.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow p-8">
              <h2 className="text-2xl font-bold text-indigo-700 mb-4">My Orders</h2>
              <ul className="space-y-4">
                {user.orders.map((order) => (
                  <li
                    key={order._id}
                    className="p-5 rounded-lg border-l-4 border-indigo-500 bg-indigo-50"
                  >
                    <p className="font-semibold text-gray-800">
                      Order ID: <span className="text-sm">{order._id}</span>
                    </p>
                    <p className="text-gray-700">
                      {user.role === "customer"
                        ? `Pharmacy: ${order.pharmacy?.name} – ${order.pharmacy?.email}`
                        : `Customer: ${order.customer?.name} – ${order.customer?.email}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Reviews Section */}
          {user?.reviews?.length > 0 && (
            <div className="mt-12 bg-white rounded-2xl shadow p-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-4">My Reviews</h2>
              <ul className="space-y-4">
                {user.reviews.map((review) => (
                  <li
                    key={review._id}
                    className="p-5 rounded-lg border-l-4 border-purple-500 bg-purple-50"
                  >
                    <p className="font-semibold text-gray-800">
                      {user.role === "customer"
                        ? `Pharmacy: ${review.pharmacy?.name} – ${review.pharmacy?.email}`
                        : `Customer: ${review.customer?.name} – ${review.customer?.email}`}
                    </p>
                    <p className="mt-2 text-gray-700">{review.comment}</p>
                    <p className="text-yellow-500 font-bold">
                      Rating: {review.rating} ⭐
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
