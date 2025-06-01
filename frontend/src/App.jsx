import MainLayout from "./layouts/mainLayout";
import HomePage from "./pages/Home/HomePage";
import LoginPage from "./pages/Login/LoginPage";

export default function App() {
  return (
    <div className="bg-[#ECF6FF] h-full w-full">
      {/* <MainLayout> */}
        <LoginPage />
      
    </div>
  )
}