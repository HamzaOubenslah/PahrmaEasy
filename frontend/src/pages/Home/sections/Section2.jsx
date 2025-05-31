import React from "react";

const Section2 = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-[150px] w-[1187px]">
      <div className="flex justify-center items-center">
        <img
          src="../../../Home/image 1.svg"
          className="w-[547px] h-[422px]"
          alt=""
        />
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-inter font-semibold text-[#39DB74] text-[36px] pb-[12px]">
          About Us
        </p>
        <p className="font-jakarta font-bold text-[25px] text-[#234A6B] pb-[51px]">
          PharmaEasy est une plateforme digitale conçue pour transformer la
          manière dont les patients, pharmaciens et administrateurs
          interagissent avec le monde pharmaceutique.
        </p>
        <p className="font-inter text-[16px] pb-[51px]">
          Notre objectif est de rendre l'accès aux médicaments plus simple,
          rapide et fiable, tout en offrant aux professionnels de santé des
          outils modernes pour gérer efficacement leur activité.
        </p>
        <div className="w-full flex justify-start">
          <button className="flex justify-center items-center border-0 bg-[#39DB74] px-[14px] py-[30px] text-[#FFFFFF] w-[145px] h-[47px] rounded-[8px]">
          Contact Us
        </button>  
        </div>
        
      </div>
    </div>
  );
};

export default Section2;
