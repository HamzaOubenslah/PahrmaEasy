
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, Check, Loader2 } from 'lucide-react';
import { updateProfile } from '../../store/pharmacyThunk/pharmacyThunk';


const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.pharmacy);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    licenseNumber: '',
    profileImage: null
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        email: profile.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
        licenseNumber: profile.licenseNumber || '',
        profileImage: profile.profileImage || null
      });
      setPreviewImage(profile.profileImage || null);
    }
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setApiError(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (e.g., 2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        setApiError('Image size should be less than 2MB');
        return;
      }

      setImageFile(file);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setApiError(null);
  //   setSuccessMessage(null);
    
  //   try {
  //     // Create form data if image is being uploaded
  //     let payload;
  //     if (imageFile) {
  //       payload = new FormData();
  //       payload.append('name', formData.name);
  //       payload.append('email', formData.email);
  //       payload.append('phone', formData.phone);
  //       payload.append('address', formData.address);
  //       payload.append('licenseNumber', formData.licenseNumber);
  //       payload.append('profileImage', imageFile);

  //        if (imageFile) {
  //     formData.append('profileImage', imageFile);
  //   }


  //     } else {
  //       // If no image, send as regular JSON
  //       payload = {
  //         name: formData.name,
  //         email: formData.email,
  //         phone: formData.phone,
  //         address: formData.address,
  //         licenseNumber: formData.licenseNumber
  //       };
  //     }

  //     const result = await dispatch(updateProfile(payload)).unwrap();
  //     setSuccessMessage('Profile updated successfully');
  //     setTimeout(() => navigate('/myprofile'), 1500);
  //   } catch (error) {
  //     setApiError(error.message || 'Failed to update profile');
  //   }
  // };

  // In your component when submitting the form


const handleSubmit = async (e) => {
  e.preventDefault();
  setApiError(null);
  setSuccessMessage(null);
  
  try {
    const formDataPayload = new FormData();
    
    // Append all regular form fields
    formDataPayload.append('name', formData.name);
    formDataPayload.append('email', formData.email);
    formDataPayload.append('phone', formData.phone);
    formDataPayload.append('address', formData.address);
    formDataPayload.append('licenseNumber', formData.licenseNumber);
    
    // Append the image file if it exists
    if (imageFile) {
      formDataPayload.append('profileImage', imageFile);
    }

    await dispatch(updateProfile(formDataPayload)).unwrap();
    
    setSuccessMessage('Profile updated successfully');
    setTimeout(() => navigate('/pharmacien/myprofile'), 1500);
    
  } catch (error) {
    // Properly handle the error object
    const errorMessage = error.response?.data?.message || error.message || 'Failed to update profile';
    setApiError(errorMessage);
  }
};

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error: {error.message || 'Failed to load profile data'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-6 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6 border-b pb-4">
          <Link
            to="/pharmacien/myprofile"
            className="flex items-center text-blue-600 hover:text-blue-800 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Retour
          </Link>
          <h1 className="text-2xl font-bold text-gray-800">Modifier le Profil</h1>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {successMessage}
          </div>
        )}

        {/* Error Message */}
        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {apiError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b">
              Informations Personnelles
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo de profil
                </label>
                <div className="flex items-center">
                  <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-blue-400">
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
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

              <div className="space-y-3">
                {[
                  { label: 'Nom', name: 'name', type: 'text' },
                  { label: 'Email', name: 'email', type: 'email' },
                  { label: 'Téléphone', name: 'phone', type: 'tel' },
                  { label: 'Adresse', name: 'address', type: 'text' },
                  { label: 'Numéro de licence', name: 'licenseNumber', type: 'text' },
                ].map((field) => (
                  <div key={field.name} className="mb-3">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      required={field.name !== 'phone' && field.name !== 'address'}
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-col gap-3">
  {/* Submit Button */}
  <button
    type="submit"
    className="w-full flex justify-center items-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-500 disabled:opacity-50"
    disabled={loading}
  >
    {loading ? (
      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
    ) : (
      <>
        <Check className="h-4 w-4 mr-2" />
        Enregistrer les modifications
      </>
    )}
  </button>

  {/* Retour Button */}
  <Link
    to="/pharmacien/myprofile"
    className="w-full text-center py-2 px-4 rounded-md text-sm font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
  >
    Retour
  </Link>
</div>

            </form>
          </div>

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
                    alt="Preview"
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
                  {formData.name}
                </h3>
                <p className="text-sm text-gray-600">{formData.email}</p>
                <p className="text-sm text-gray-600">{formData.phone}</p>
                <p className="text-sm text-gray-600">{formData.address}</p>
                <p className="text-sm text-gray-600">Licence: {formData.licenseNumber}</p>
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