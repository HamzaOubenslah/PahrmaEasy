import MainLayout from "./layouts/mainLayout";
import HomePage from "./pages/Home/HomePage";

export default function App() {
  return (
    <div className="bg-[#ECF6FF] h-full w-full">
      <MainLayout>
        <HomePage />
      </MainLayout>
    </div>
  )
}