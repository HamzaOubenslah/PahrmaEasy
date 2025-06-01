import React from "react";
import { Solutions } from "../../../constants/Home";
import Card2 from "../components/card2";

const Section4 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[90px] w-[1150px] pb-[53px] pt-[101px] max-[1250px]:w-[768px] max-[1250]:gap-[45px] max-[820px]:w-[320px] max-[820px]:gap-[20px] max-[820px]:pt-[53px]">
      <div className="flex flex-col justify-center items-center gap-[20px]">
        <p className="font-jakarta font-bold text-[40px] text-[#234A6B] max-[820px]:text-[30px] max-[820px]:text-center">
          Une solution pour chaque utilisateur
        </p>
        <p className="font-inter text-[16px] max-[820px]:text-center">
          PharmaEasy s'adapte aux besoins spécifiques des différents acteurs du
          monde pharmaceutique
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-[33px] max-[1250px]:flex-col">
        {Solutions.map((s, i) => (
          <Card2 key={i} title={s.title} sentences={s.sentences} />
        ))}
      </div>
    </div>
  );
};

export default Section4;
