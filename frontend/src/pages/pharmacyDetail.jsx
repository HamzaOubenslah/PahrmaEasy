import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPharmacyDetails } from "../store/pharmacyThunk/pharmacyThunk";
import { addCart } from "../store/cartThunk/cartThunk";
import { uploadPrescription } from "../store/orderThunk/orderThunk";
import { CheckCircle, Upload, X } from "lucide-react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PharmacyDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { pharmacyDetail, loading, error } = useSelector(
    (state) => state.pharmacy
  );
  const { uploadLoading, uploadError } = useSelector((state) => state.order);
  const [addedMedicineIds, setAddedMedicineIds] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const MapIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
    iconSize: [38, 38],
  });

  useEffect(() => {
    dispatch(fetchPharmacyDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (uploadError) {
      toast.error(uploadError);
    }
  }, [uploadError]);

  const handleAddToCart = (medicine) => {
    dispatch(addCart({ medicineId: medicine, quantity: 1 }));
    setAddedMedicineIds((prev) => [...prev, medicine._id]);
    toast.success(`${medicine.name} added to cart`);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadPrescription = async () => {
    if (!selectedFile) {
      toast.error("Please select a file first");
      return;
    }

    try {
      await dispatch(
        uploadPrescription({
          pharmacy: id,
          ordonance: selectedFile,
        })
      ).unwrap();

      toast.success("Prescription uploaded successfully");
      setShowUploadModal(false);
      setSelectedFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  const isMedicineInCart = (medicineId) => {
    return addedMedicineIds.includes(medicineId);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#39DB74]"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-8">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg max-w-md mx-auto">
          {error}
        </div>
      </div>
    );

  return (
    <div className="flex justify-center px-4 py-8">
      <div className="w-full" style={{ width: "66.666667%" }}>
        {pharmacyDetail ? (
          <div className="space-y-8">
            {/* Pharmacy Header */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                {pharmacyDetail.profileImage && (
                  <img
                    src={pharmacyDetail.profileImage}
                    alt={`${pharmacyDetail.name} profile`}
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                  />
                )}

                <div className="flex-1">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {pharmacyDetail.name}
                  </h1>
                  <div className="mt-2 space-y-1 text-gray-600">
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      {pharmacyDetail.email}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {pharmacyDetail.address}
                    </p>
                    <p className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      {pharmacyDetail.phone}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="mt-4 inline-flex items-center gap-2 px-4 py-2 border border-[#39DB74] text-[#39DB74] rounded-lg hover:bg-[#39DB74] hover:text-white transition-colors duration-200"
                  >
                    <Upload size={18} />
                    Upload Prescription
                  </button>
                </div>
              </div>
            </div>

            {/* Medicines Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Available Medicines
              </h2>

              {pharmacyDetail.medicines?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pharmacyDetail.medicines.map((medicine) => (
                    <div
                      key={medicine._id}
                      className="border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                    >
                      {medicine.image && (
                        <img
                          src={medicine.image}
                          alt={medicine.name}
                          className="w-full h-48 object-cover"
                        />
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-lg">
                          {medicine.name}
                        </h3>
                        <p className="text-[#39DB74] font-medium text-lg mt-1">
                          ${medicine.price}
                        </p>
                        <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                          {medicine.description}
                        </p>

                        <button
                          onClick={() => handleAddToCart(medicine)}
                          className={`mt-4 w-full py-2 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                            isMedicineInCart(medicine._id)
                              ? "bg-green-100 text-green-700"
                              : "bg-[#39DB74] text-white hover:bg-green-600"
                          }`}
                        >
                          {isMedicineInCart(medicine._id) ? (
                            <>
                              <CheckCircle size={16} />
                              Added to Cart
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No medicines available at this pharmacy
                </div>
              )}
            </div>

            {/* Map Section */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <h2 className="text-xl font-semibold text-gray-800 p-6 pb-0">
                Location
              </h2>
              <div className="h-96 w-full">
                {pharmacyDetail.location?.coordinates ? (
                  <MapContainer
                    className="h-full w-full"
                    center={[
                      pharmacyDetail.location.coordinates[0],
                      pharmacyDetail.location.coordinates[1],
                    ]}
                    zoom={13}
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker
                      position={pharmacyDetail.location.coordinates}
                      icon={MapIcon}
                    >
                      <Popup>
                        <div className="font-semibold">
                          {pharmacyDetail.name}
                        </div>
                        <div className="text-sm">{pharmacyDetail.address}</div>
                      </Popup>
                    </Marker>
                  </MapContainer>
                ) : (
                  <div className="flex justify-center items-center h-full text-gray-500">
                    Location not available
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No pharmacy data available
          </div>
        )}

        {/* Upload Prescription Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">Upload Prescription</h3>
                  <button
                    onClick={() => {
                      setShowUploadModal(false);
                      setSelectedFile(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prescription File
                    </label>
                    <div className="flex items-center justify-center w-full">
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-gray-400" />
                          <p className="mb-2 text-sm text-gray-500">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, or PNG (MAX. 5MB)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleFileChange}
                        />
                      </label>
                    </div>
                  </div>

                  {selectedFile && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Selected:{" "}
                        <span className="font-normal">{selectedFile.name}</span>
                      </p>
                    </div>
                  )}

                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => {
                        setShowUploadModal(false);
                        setSelectedFile(null);
                      }}
                      className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUploadPrescription}
                      disabled={!selectedFile || uploadLoading}
                      className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                        !selectedFile || uploadLoading
                          ? "bg-gray-300 text-gray-500"
                          : "bg-[#39DB74] text-white hover:bg-green-600"
                      }`}
                    >
                      {uploadLoading ? (
                        "Uploading..."
                      ) : (
                        <>
                          <Upload size={16} />
                          Upload
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetails;
