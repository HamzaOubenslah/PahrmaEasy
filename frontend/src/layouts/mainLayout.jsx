import React from "react";
import Header from "../components/header";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default MainLayout;
