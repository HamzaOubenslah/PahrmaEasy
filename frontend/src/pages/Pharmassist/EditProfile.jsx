import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Upload, Check } from 'lucide-react';
import { PHARMACIST_PROFILE } from '../../constants/Pharmassist';

const EditProfile = () => {
  const { pharmacyId } = useParams();
  const navigate = useNavigate();

  const pharmacist = PHARMACIST_PROFILE.find(
    (p) => p.pharmacy_id === pharmacyId
  );

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    city: '',
    address: '',
    pharmacy: '',
    pharmacy_id: '',
    profileImage: null,
  });

  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (pharmacist) {
      setFormData({
        full_name: pharmacist.full_name || '',
        email: pharmacist.email || '',
        phone: pharmacist.phone || '',
        city: pharmacist.city || '',
        address: pharmacist.address || '',
        pharmacy: pharmacist.pharmacy || '',
        pharmacy_id: pharmacist.pharmacy_id || '',
        profileImage: pharmacist.profileImage || null,
      });

      if (pharmacist.profileImage) {
        setPreviewImage(pharmacist.profileImage);
      }
    }
  }, [pharmacist]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setFormData((prev) => ({
          ...prev,
          profileImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const index = PHARMACIST_PROFILE.findIndex(
      (p) => p.pharmacy_id === pharmacyId
    );

    if (index !== -1) {
      PHARMACIST_PROFILE[index] = {
        ...PHARMACIST_PROFILE[index],
        ...formData,
      };

      console.log('Updated Pharmacist:', PHARMACIST_PROFILE[index]);
    }

    navigate(`/pharmacien/profil/${pharmacyId}`);
  };

  if (!pharmacist) {
    return <p>Pharmacien non trouvé.</p>;
  }

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-6 border-b pb-4">
          <Link
            to="/pharmacien/profil"
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Retour
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Modifier le Profil</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Edit Form */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Informations Personnelles
            </h2>

            <form onSubmit={handleSubmit}>
              {/* Profile Image Upload */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo de profil
                </label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-blue-400">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Profile preview"
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-400">
                        <Upload className="h-5 w-5 mb-1" />
                        <span className="text-xs">Importer</span>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleImageUpload}
                      accept="image/*"
                    />
                  </label>
                  <span className="ml-3 text-xs text-gray-500">JPEG, PNG (max 2MB)</span>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3">
                {[
                  { label: 'Nom Complet', name: 'full_name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Téléphone', name: 'phone', type: 'tel' },
                  { label: 'Ville', name: 'city', type: 'text' },
                  { label: 'Adresse', name: 'address', type: 'text' },
                  { label: 'Pharmacie', name: 'pharmacy', type: 'text' },
                  { label: 'ID Pharmacie', name: 'pharmacy_id', type: 'text' },
                ].map((field) => (
                  <div key={field.name} className="mb-3">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                  </div>
                ))}
              </div>

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Enregistrer les modifications
                </button>
              </div>
            </form>
          </div>

          {/* Live Preview */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Aperçu du Profil
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Les modifications seront reflétées ici en temps réel.
            </p>

            <div className="flex flex-col items-center">
              <div className="mb-4">
                {previewImage ? (
                  <img
                    src={previewImage}
                    alt="Profile preview"
                    className="h-20 w-20 rounded-full object-cover border-2 border-blue-100"
                  />
                ) : (
                  <div className="h-20 w-20 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                    Photo
                  </div>
                )}
              </div>

              <div className="w-full space-y-2 text-center">
                <h3 className="text-base font-semibold text-gray-800">
                  {formData.full_name}
                </h3>
                <p className="text-sm text-gray-600">{formData.email}</p>
                <p className="text-sm text-gray-600">{formData.phone}</p>
                <p className="text-sm text-gray-600">{formData.city}</p>
                <p className="text-sm text-gray-700 font-medium">
                  {formData.pharmacy}
                </p>
                <p className="text-xs text-gray-500">
                  ID Pharmacie: {formData.pharmacy_id}
                </p>
              </div>

              <div className="mt-4 px-3 py-1 bg-green-50 text-green-700 text-xs font-medium rounded-full">
                Pharmacien Actif
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
