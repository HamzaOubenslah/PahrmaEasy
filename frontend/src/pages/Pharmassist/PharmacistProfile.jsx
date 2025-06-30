



import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, MapPin, Edit, Lock, Loader2 } from "lucide-react";
import { Link } from 'react-router-dom';
import { ChangePassword } from "./ChangePassword";
import { 
  fetchPharmacyMedicines,
  fetchPharmacyOrders,
  fetchPharmacyProfile,
   
} from "../../store/pharmacyThunk/pharmacyThunk";

const PharmacistProfile = () => {
  const dispatch = useDispatch();
  const {orders, profile, loading, error,medicines } = useSelector((state) => state.pharmacy);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [nbr,setNbr] = useState(0)
  const [lastActive, setLastActive] = useState(() => {
  return localStorage.getItem('pharmacyLastActive') || new Date().toISOString();
});

  const [nbrArt,setNbrArt]  = useState(0)
  
  useEffect(() => {
    dispatch(fetchPharmacyProfile());
    dispatch(fetchPharmacyOrders())
    dispatch(fetchPharmacyMedicines())

    const now = new Date().toISOString();
    localStorage.setItem('pharmacyLastActive', now);
    setLastActive(now);
  }, [dispatch]);



  useEffect(() => {
    // Update nbr whenever orders changes
    setNbr(orders.length);
    setNbrArt(medicines.length)
  }, [orders,medicines]);
  console.log('this is orders ',nbr);
  


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
        Error loading profile: {error}
      </div>
    );
  }

  if (!profile) {
    return <div className="p-6">No profile data found</div>;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Mon Profil (Pharmacien)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <section className="bg-white border border-gray-50 hover:border-gray-300 transition-colors duration-300 shadow rounded-lg p-6">
            <header className="mb-6 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Informations Personnelles</h2>
            </header>

            <div className="flex flex-col items-center gap-4">
              {profile.profileImage ? (
                <img
                  src={profile.profileImage}
                  alt={profile.name}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {profile.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{profile.name}</h3>
                <p className="inline-flex items-center font-medium text-green-600">
                  <span className="inline-block h-2 w-2 rounded-full mr-2 bg-green-500"></span>
                  Actif
                </p>
              </div>
            </div>

            <div className="space-y-3 pt-6 text-gray-700">
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{profile.address}</span>
              </div>
            </div>
            <div className="flex flex-col gap-3 pt-6">
              <Link
  to="/pharmacien/edit-profile"  // Changed from using profile._id in URL
  className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
>
  <Edit className="h-4 w-4" />
  Modifier le profil
</Link>
              <button
                type="button"
                onClick={() => setShowChangePassword(true)}
                className="flex items-center justify-center gap-2 border border-gray-300 rounded-md px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
              >
                <Lock className="h-4 w-4" />
                Modifier le mot de passe
              </button>
            </div>
          </section>

          {/* Activity Stats Card */}
          <section className="bg-white border border-gray-50 hover:border-gray-300 transition-colors duration-300 shadow rounded-lg p-6">
            <header className="mb-6 border-b pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Activité du Pharmacien</h2>
            </header>

            <div className="grid gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="font-medium text-green-800">Commandes  </div>
                <div className="text-2xl font-bold text-green-900">
                 {nbr}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-medium text-blue-800">Articles en stock</div>
                <div className="text-2xl font-bold text-blue-900">
                  {nbrArt}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-medium text-yellow-800">Notifications</div>
                <div className="text-2xl font-bold text-yellow-900">
                  {profile.notifications || 0}
                </div>
              </div>
              <div className="pt-6 text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Dernière connexion:</span>
                  <span className="font-medium">
                  {new Date(lastActive).toLocaleTimeString('fr-FR', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false // Use 24-hour format
                  })}
                </span>
                </div>
                <div className="flex justify-between">
                  <span>license Number:</span>
                  <span className="font-medium">{profile.licenseNumber || 0}</span>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Schedule Card */}
        <section className="bg-white shadow rounded-lg p-6">
          <header className="mb-6 border-b pb-2">
            <h2 className="text-xl font-semibold text-gray-800">Horaires de travail</h2>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-gray-700">
            <div className="space-y-1">
              <div className="font-medium">Lundi - Vendredi</div>
              <div className="text-green-600">08h - 18h</div>
            </div>
            <div className="space-y-1">
              <div className="font-medium">Samedi</div>
              <div className="text-green-600">08h - 12h</div>
            </div>
           <div className="space-y-1">
            <div className="font-medium">24 Hours Service</div>
            <div className={`font-medium ${profile.is24Hours ? 'text-green-600' : 'text-red-600'}`}>
              {profile.is24Hours ? 'Yes' : 'No'}
            </div>
          </div>
          </div>
        </section>
      </div>

      {showChangePassword && (
        <div className="fixed inset-0  bg-opacity-100 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <ChangePassword onClose={() => setShowChangePassword(false)} />
          </div>
        </div>
      )}

      {/* {showChangePassword && (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center">
    <div 
      className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl"
      onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
    >
      <ChangePassword onClose={() => setShowChangePassword(false)} />
    </div>
  </div>
)} */}
    </div>
  );
};

export default PharmacistProfile;