// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  useNavigate,
} from "react-router-dom";
import MainLayout from "./layouts/mainLayout";
import PharmacienLayout from "./layouts/PharmassistLayout/Layout";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";
import PharmacienDashboard from "./pages/Pharmassist";
import EditProfile from "./pages/Pharmassist/EditProfile";
import Medicines from "./pages/Pharmassist/Medicines";
import Orders from "./pages/Pharmassist/Orders";
import PharmacistProfile from "./pages/Pharmassist/PharmacistProfile";
import RegisterPage from "./pages/Register/RegisterPage";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshToken, setToken } from "./store/authThunk/authThunk";

export default function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const triedRefresh = useRef(false);
  useEffect(() => {
    const tryRefreshToken = async () => {
      try {
        const result = await dispatch(refreshToken()).unwrap();
        if (result.data) {
          dispatch(setToken(result));
        }
      } catch (err) {
        console.error("Refresh token failed", err);
        // Optional: navigate to login or show alert
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
          <Route element={<MainLayout />}>
            <Route index path="/" element={<HomePage />} />
            <Route path="/login" element={<RegisterPage />} />
            <Route path="/register" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>

      {/* <MainLayout>
        <HomePage />
      </MainLayout> */}
      {/* <BrowserRouter> */}
      {/* <Routes> */}
      {/* <Route path="/pharmacien" element={<PharmacienLayout />}>
      <Route index element={<PharmacienDashboard />} />
      <Route path="dashboard" element={<PharmacienDashboard />} />
      <Route path="commandes" element={<Orders />} />
      <Route path="medicaments" element={<Medicines />} />
      <Route path="profil" element={<PharmacistProfile />} />
      <Route path="/pharmacien/profil/edit-profile/:pharmacyId" element={<EditProfile />} />
      {/* Add other routes */}
      {/* </Route> */}
      {/* </Routes> */}
      {/* </BrowserRouter> */}
    </div>
  );
}
