import React from "react";

const Section2 = () => {
  return (
    <div className="flex justify-center items-center bg-[#FFFFFF] w-full pt-[114px] max-[820px]:pt-[50px]">
      <div className="flex flex-row justify-center items-center gap-[150px] w-[1187px] pb-[99px] max-[1250px]:w-[768px] max-[1250px]:flex-col max-[1250px]:gap-[75px] max-[820px]:w-[320px] max-[820px]:gap-[30px] max-[820px]:pb-[30px]">
      <div className="flex justify-center items-center">
        <img
          src="../../../Home/image 1.svg"
          className="w-[547px] h-[422px] max-[820px]:w-full max-[820px]:h-full"  
          alt=""
        />
      </div>
      <div className="flex flex-col justify-start items-start w-[490px] max-[820px]:w-[320px]">
        <p className="font-inter font-semibold text-[#39DB74] text-[36px] mb-[6px] max-[820px]:text-[25px]">
          About Us
        </p>
        <p className="font-jakarta font-bold text-[25px] text-[#234A6B] mb-[21px] max-[820px]:text-[15px]">
          PharmaEasy est une plateforme digitale conçue pour transformer la
          manière dont les patients, pharmaciens et administrateurs
          interagissent avec le monde pharmaceutique.
        </p>
        <p className="font-inter text-[16px] max-[820px]:text-[12px]">
          Notre objectif est de rendre l'accès aux médicaments plus simple,
          rapide et fiable, tout en offrant aux professionnels de santé des
          outils modernes pour gérer efficacement leur activité.
        </p>
        <div className="w-full flex justify-start py-[30px]">
          <button className="flex justify-center items-center border-0 bg-[#39DB74]  text-[#FFFFFF] w-[145px] h-[47px] rounded-[8px]">
          Contact Us
        </button>  
        </div>
        
      </div>
    </div>
    </div>
    
  );
};

export default Section2;
