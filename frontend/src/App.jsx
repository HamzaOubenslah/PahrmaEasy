import { useDispatch, useSelector } from "react-redux";
import { refreshToken, setToken } from "./store/authThunk/authThunk";
import { useEffect, useRef } from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import RegisterPage from "./pages/Register/RegisterPage";
import LoginPage from "./pages/Login/LoginPage";
import MainLayout from "./layouts/mainLayout";
import PharmacienLayout from "./layouts/PharmassistLayout/Layout";
import PharmacienDashboard from "./pages/Pharmassist";
import Orders from "./pages/Pharmassist/Orders";
import PharmacistProfile from "./pages/Pharmassist/PharmacistProfile";
import EditProfile from "./pages/Pharmassist/EditProfile";
import Alerts from "./pages/Pharmassist/Alearts";
import HomePage from "./pages/Home/HomePage";
import NearbyPharmaciesPage from "./pages/Home/NearbyPharmacies";
import ProfilePage from "./pages/profile";
import Cart from "./pages/Cart";
import MedicineDetail from "./pages/Client/MedicineDetail";
import Medicines from "./pages/Client/Medicines";
import Pharmacies from "./pages/pharmacies";
import PharmacyDetails from "./pages/pharmacyDetail";
import AllMedicines from "./pages/All-Medicines";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PharmacyOrdonance from "./pages/Pharmassist/Odonances";

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
        {/* ToastContainer moved outside Routes but inside BrowserRouter */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Routes>
          {/* Public routes */}
          <Route path="/register" element={<LoginPage />} />
          <Route path="/login" element={<RegisterPage />} />

          {/* Client routes */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="near-pharmacies" element={<NearbyPharmaciesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/medicaments" element={<AllMedicines />} />
            <Route path="/medicaments/:id" element={<MedicineDetail />} />
            <Route path="/pharmacies" element={<Pharmacies />} />
            <Route path="/pharmacies/:id" element={<PharmacyDetails />} />
            <Route path="cart" element={<Cart />} />
          </Route>

          {/* Pharmacist routes */}
          <Route
            path="/pharmacien"
            element={
              userRole === "pharmacy" ? (
                <PharmacienLayout />
              ) : (
                <Navigate to="/" replace />
              )
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<PharmacienDashboard />} />
            <Route path="orders" element={<Orders />} />
            <Route path="medicaments" element={<Medicines />} />
            <Route path="myprofile" element={<PharmacistProfile />} />
            <Route path="edit-profile" element={<EditProfile />} />
            <Route path="alerts" element={<Alerts />} />
            <Route
              path="/pharmacien/ordonance"
              element={<PharmacyOrdonance />}
            />
          </Route>

          {/* Fallback route */}
          <Route
            path="*"
            element={<Navigate to="/pharmacien/dashboard" replace />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
