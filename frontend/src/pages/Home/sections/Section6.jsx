import React from "react";

const Section6 = () => {
  return (
    <div className="w-full bg-[#037847] flex flex-col jutify-center items-center py-[64px]">
      <p className="font-jakarta font-bold text-[40px] text-[#FFFFFF] mb-[28px] max-[820px]:text-[20px] max-[820px]:w-[275px] max-[820px]:text-center">
        Prêt à simplifier votre expérience pharmaceutique ?
      </p>
      <p className="font-inter font-medium text-[24px] text-[#FFFFFF] mb-[78px] w-[948px] max-[1250px]:w-[768px] max-[820px]:w-[275px] max-[820px]:text-[12px] max-[820px]:mb-[35px] max-[820px]:text-center">
        La satisfaction de nos utilisateurs est notre priorité. Voici quelques
        témoignages de personnes qui font confiance à PharmaEasy au quotidien.
      </p>
      <div className="flex flex-row justify-center items-center gap-[75px] max-[1250px]:flex-col max-[1250px]:gap-[20px] max-[820px]:gap-[10px]">
        <button className="w-[300px] px-[27px] py-[13px] border-0 bg-[#FFFFFF] font-inter font-medium text-[24px] text-[#39DB74] rounded-[8px] max-[820px]:w-[200px] max-[820px]:px-[14px] max-[820px]:py-[7px] max-[820px]:text-[12px]">S’inscrire maintenant</button>
        <button className="w-[300px] px-[27px] py-[13px] border-[3px] border-[#DEDEDE]/50 bg-[#037847] font-inter font-medium text-[24px] text-[#FFFFFF] rounded-[8px] max-[820px]:w-[200px] max-[820px]:px-[14px] max-[820px]:py-[7px] max-[820px]:text-[12px]">Demander un demo</button>
      </div>
    </div>
  );
};

export default Section6;
