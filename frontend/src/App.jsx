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
import {BrowserRouter, Route, Routes} from 'react-router-dom'
export default function App() {
  return (
    <div className="bg-[#ECF6FF] h-full w-full">
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
