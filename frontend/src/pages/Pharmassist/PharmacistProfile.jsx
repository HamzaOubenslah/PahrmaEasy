import React, { useState } from "react";
import { PHARMACIST_PROFILE } from '../../constants/Pharmassist'; // adjust import path as needed
import { Mail, Phone, MapPin, Edit, Lock } from "lucide-react";
import {Link} from 'react-router-dom'
import {ChangePassword} from "./ChangePassword";
const PharmacistProfile = () => {
  const profile = PHARMACIST_PROFILE[0];
    const [showChangePassword, setShowChangePassword] = useState(false);
  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Mon Profil (Pharmacien)
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information Card */}
          <section className="bg-white border border-gray-50 hover:border-gray-300 transition-colors duration-300 shadow rounded-lg p-6">
            <header className="mb-6 border-b  pb-2">
              <h2 className="text-xl font-semibold text-gray-800">Informations Personnelles</h2>
            </header>

            <div className="flex flex-col items-center gap-4">
              {profile.profile_picture ? (
                <img
                  src={profile.profile_picture}
                  alt={profile.username}
                  className="h-24 w-24 rounded-full object-cover"
                />
              ) : (
                <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center text-2xl font-bold text-gray-600">
                  {profile.username
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </div>
              )}

              <div className="text-center">
                <h3 className="text-xl font-semibold text-gray-900">{profile.username.replace('.', ' ').replace(/^\w/, (c) => c.toUpperCase())}</h3>
                <p className={`inline-flex items-center font-medium ${
                  profile.isActive ? "text-green-600" : "text-gray-500"
                }`}>
                  <span
                    className={`inline-block h-2 w-2 rounded-full mr-2 ${
                      profile.isActive ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                  {profile.isActive ? "Actif" : "Inactif"}
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
                <span>{profile.phoneNumber}</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>{profile.address}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6">
              <Link
                to={`/pharmacien/profil/edit-profile/${profile.pharmacy_id}`}
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
                <div className="font-medium text-green-800">Commandes traitées</div>
                <div className="text-2xl font-bold text-green-900">
                  {profile.activityStats.processedOrders}
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-medium text-blue-800">Articles en stock</div>
                <div className="text-2xl font-bold text-blue-900">
                  {profile.activityStats.itemsInStock}
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="font-medium text-yellow-800">Notifications</div>
                <div className="text-2xl font-bold text-yellow-900">
                  {profile.activityStats.notifications}
                </div>
              </div>

              <div className="pt-6 text-gray-600 space-y-2">
                <div className="flex justify-between">
                  <span>Dernière connexion:</span>
                  <span className="font-medium">
                    {profile.activityStats.lastActive}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Expérience:</span>
                  <span className="font-medium">{profile.yearsOfExperience} ans</span>
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
              <div className="font-medium">Dimanche</div>
              <div className="text-red-600">Fermé</div>
            </div>
          </div>
        </section>
      </div>
      {showChangePassword && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <ChangePassword onClose={() => setShowChangePassword(false)} />
    </div>
  </div>
)}
    </div>
  );
};

export default PharmacistProfile;
