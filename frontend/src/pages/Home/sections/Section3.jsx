import React from "react";
import { HomeCards } from "../../../constants/Home";
import Card from "../components/card";

const Section3 = () => {
  return (
    <div className="flex justify-center items-center bg-[#F9FCFF] w-full pb-[99px]">
      <div className="w-[1140px] flex flex-col justify-center items-center bg-[#F9FCFF]">
      <div className="flex flex-col justify-center items-center gap-[16px] pb-[74px]">
        <p className="font-jakarta font-bold text-[50px] text-[#234A6B]">
          Nos fonctionnalités principales
        </p>
        <p className="font-inter text-[16px] text-[#000000]">
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
