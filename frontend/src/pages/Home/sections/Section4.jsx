import React from "react";
import { Solutions } from "../../../constants/Home";
import Card2 from "../components/card2";

const Section4 = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[90px] w-[1150px] pb-[53px] pt-[101px]">
      <div className="flex flex-col justify-center items-center gap-[20px]">
        <p className="font-jakarta font-bold text-[40px] text-[#234A6B]">
          Une solution pour chaque utilisateur
        </p>
        <p className="font-inter text-[16px]">
          PharmaEasy s'adapte aux besoins spécifiques des différents acteurs du
          monde pharmaceutique
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-[33px]">
        {Solutions.map((s, i) => (
          <Card2 key={i} title={s.title} sentences={s.sentences} />
        ))}
      </div>
    </div>
  );
};

export default Section4;
