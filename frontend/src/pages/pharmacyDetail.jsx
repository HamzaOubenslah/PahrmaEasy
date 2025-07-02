import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchPharmacyDetails } from "../store/pharmacyThunk/pharmacyThunk";
import { addCart } from "../store/cartThunk/cartThunk";
import { uploadPrescription } from "../store/orderThunk/orderThunk";
import { CheckCircle, Upload } from "lucide-react";
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
    return <div className="text-center py-8">Loading pharmacy details...</div>;
  if (error)
    return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="flex justify-center p-6">
      <div className="w-full sm:w-2/3">
        {pharmacyDetail ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {pharmacyDetail.name}
                  </h2>
                  <p className="text-gray-700">{pharmacyDetail.email}</p>
                  <p className="text-gray-700">{pharmacyDetail.address}</p>
                  <p className="text-gray-700">{pharmacyDetail.phone}</p>
                </div>

                {pharmacyDetail.profileImage && (
                  <img
                    src={pharmacyDetail.profileImage}
                    alt={`${pharmacyDetail.name} profile`}
                    className="w-32 h-32 object-cover rounded-full"
                  />
                )}
              </div>

              {/* Upload Prescription Button */}
              <div className="mt-4">
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  <Upload size={18} />
                  Upload Prescription
                </button>
              </div>

              {/* Medicines Section */}
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">
                  Available Medicines
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {pharmacyDetail.medicines?.length > 0 ? (
                    pharmacyDetail.medicines.map((medicine) => (
                      <div
                        key={medicine._id}
                        className="bg-gray-50 p-4 rounded-lg shadow hover:shadow-md transition-shadow"
                      >
                        {medicine.image && (
                          <img
                            src={medicine.image}
                            alt={medicine.name}
                            className="w-full h-32 object-cover rounded mb-3"
                          />
                        )}
                        <h4 className="font-semibold">{medicine.name}</h4>
                        <p className="text-blue-600 font-medium">
                          ${medicine.price}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {medicine.description}
                        </p>
                        <button
                          onClick={() => handleAddToCart(medicine)}
                          className={`mt-3 w-full py-2 rounded-md flex items-center justify-center ${
                            isMedicineInCart(medicine._id)
                              ? "bg-green-500 text-white"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {isMedicineInCart(medicine._id) ? (
                            <>
                              <CheckCircle className="mr-2" size={16} />
                              Added
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </button>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No medicines available</p>
                  )}
                </div>
              </div>
            </div>

            {/* Map Section */}
            <div className="h-96 rounded-lg overflow-hidden mt-8 shadow-md">
              {pharmacyDetail &&
              pharmacyDetail.location &&
              pharmacyDetail.location.coordinates ? (
                <MapContainer
                  className="h-[400px] w-full"
                  center={[
                    pharmacyDetail.location.coordinates[0],
                    pharmacyDetail.location.coordinates[1],
                  ]}
                  zoom={13}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={pharmacyDetail.location.coordinates}
                    icon={MapIcon}
                  >
                    <Popup>
                      <h2>{pharmacyDetail.name}</h2>
                    </Popup>
                  </Marker>
                </MapContainer>
              ) : (
                <div className="text-gray-500">Loading map...</div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-8">No pharmacy data available</div>
        )}

        {/* Upload Prescription Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                Upload Prescription
              </h3>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Prescription File
                </label>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
                />
              </div>

              {selectedFile && (
                <div className="mb-4">
                  <p className="text-sm">Selected file: {selectedFile.name}</p>
                </div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    setShowUploadModal(false);
                    setSelectedFile(null);
                  }}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUploadPrescription}
                  disabled={!selectedFile || uploadLoading}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-blue-300 flex items-center"
                >
                  {uploadLoading ? (
                    "Uploading..."
                  ) : (
                    <>
                      <Upload className="mr-2" size={16} />
                      Upload
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PharmacyDetails;
