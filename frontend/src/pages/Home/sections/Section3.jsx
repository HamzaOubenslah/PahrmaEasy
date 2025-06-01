import React from "react";
import { HomeCards } from "../../../constants/Home";
import Card from "../components/card";

const Section3 = () => {
  return (
    <div className="flex justify-center items-center bg-[#F9FCFF] w-full pb-[99px] max-[820px]:pb-[30px]">
      <div className="w-[1140px] flex flex-col justify-center items-center bg-[#F9FCFF] max-[1250px]:w-[768px] max-[820px]:w-[320px]">
      <div className="flex flex-col justify-center items-center gap-[16px] pb-[74px] max-[820px]:pb-[30px]">
        <p className="font-jakarta font-bold text-[50px] text-[#234A6B] max-[820px]:text-[30px] max-[820px]:text-center">
          Nos fonctionnalités principales
        </p>
        <p className="font-inter text-[16px] text-[#000000] max-[820px]:text-center">
          PharmaEasy offre une suite complète d'outils pour améliorer
          l'expérience pharmaceutique à tous les niveaux
        </p>
      </div>
      <div className=" flex justify-center items-center flex-wrap gap-[80px]">
        {HomeCards.map((c, i) => (
          <Card
          className={"bg-white shadow-md"}
            i={i}
            icon={c.icon}
            title={c.title}
            description={c.description}
          />
        ))}
      </div>
    </div>
    </div>
    
  );
};

export default Section3;
