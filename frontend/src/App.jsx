import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setToken } from "./store/authThunk/authThunk";
import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Routes,Route } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layouts/mainLayout";
import PharmacienLayout from "./layouts/PharmassistLayout/Layout";
import PharmacienDashboard from "./pages/Pharmassist";
import Orders from "./pages/Pharmassist/Orders";
import PharmacistProfile from "./pages/Pharmassist/PharmacistProfile";
import EditProfile from "./pages/Pharmassist/EditProfile";
import Medicines from "./pages/Pharmassist/Medicines";
import Alerts from "./pages/Pharmassist/Alearts";
 import HomePage from "./pages/Home/HomePage";

import NearbyPharmaciesPage from "./pages/Home/NearbyPharmacies";
import ProfilePage from "./pages/profile";
import Reviews from "./pages/Pharmassist/Reviews";

import Cart from "./pages/Cart";


export default function App() {
  const token = useSelector((state) => state.auth.token);
  const userRole = useSelector((state) => state.auth.user?.role);
  const dispatch = useDispatch();
  const triedRefresh = useRef(false);

  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        const result = await dispatch(refreshToken()).unwrap();
        dispatch(setToken(result));
      } catch (err) {
        console.error("Refresh token failed", err);
      }
    };

    if (!token && !triedRefresh.current) {
      triedRefresh.current = true;
      tryRefreshToken();
    }
  }, [dispatch, token]);

  return (
    <div className="bg-[#ECF6FF] h-full w-full">
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<RegisterPage />} />
          <Route path="/register" element={<LoginPage />} />
          
          {/* Client routes */}
          <Route 
            path="/" 
            element={
              userRole === 'pharmacy' ? 
                <Navigate to="/pharmacien/dashboard" replace /> : 
                <MainLayout />
            }
          >
            <Route index element={<HomePage />} />
            <Route path="near-pharmacies" element={<NearbyPharmaciesPage />} />
            <Route path="profile" element={<ProfilePage />} />
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={<RegisterPage />} />
            <Route path="/register" element={<LoginPage />} />
            <Route path="/near-pharmacies" element={<NearbyPharmaciesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/medicaments" element={<Medicines />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/dashboard" element={<PharmacienDashboard />} />
       
            <Route path="/cart" element={<Cart />} />
          </Route>
          
          {/* Pharmacist routes - only accessible to pharmacy role */}
          <Route 
            path="/pharmacien" 
            element={
              userRole === 'pharmacy' ? 
                <PharmacienLayout /> : 
                <Navigate to="/" replace />
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PharmacienDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="medicaments" element={<Medicines />} />
            <Route path="myprofile" element={<PharmacistProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="alerts" element={<Alerts />} />
          </Route>
          
          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>

      {/* <MainLayout>
        <HomePage />
      </MainLayout> */}
      {/* <BrowserRouter> */}
      {/* <Routes> */}
      {/* <Route path="/pharmacien" element={<PharmacienLayout />}>
      <Route index element={<PharmacienDashboard />} />
      <Route path="commandes" element={<Orders />} />
      <Route path="profil" element={<PharmacistProfile />} />
      <Route path="/pharmacien/profil/edit-profile/:pharmacyId" element={<EditProfile />} />
      {/* Add other routes */}
      {/* </Route> */}
      {/* </Routes> */}
      {/* </BrowserRouter> */}
    </div>
  );
}