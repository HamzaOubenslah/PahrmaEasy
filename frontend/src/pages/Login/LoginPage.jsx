import React from "react";
import Form from "./components/Form";

const LoginPage = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center bg-[#ECF6FF] pt-[39px] pb-[65px]">
      <div className="flex flex-col justify-center items-center mb-[43px]">
        <h4 className="text-[#39DB74] text-[40px] font-bold mb-[16px]">
          Pharma<span className="text-[#000000]">Easy</span>
        </h4>
        <p className="font-inter font-semibold text-[#757474] text-[16px]">
          Créez votre compte en quelques étapes
        </p>
      </div>
      <Form />
    </div>
  );
};

export default LoginPage;
