import React from "react";

const Header = () => {
  return (
    <div className="flex flex-row justify-center items-center gap-[258px]">
      <div className="flex justify-center items-center">
        <h4 className="text-[#39DB74] text-[24px] font-bold">
          Pharma<span className="text-[#000000]">Easy</span>
        </h4>
      </div>
      <div className="flex justify-center items-center">
        <ul className="flex justify-center items-center gap-[21px] list-none">
          <li>
            <a
              href=""
              className="font-inter no-underline hover:underline text-[#000000]"
            >
              Acceuil
            </a>
          </li>
          <li>
            <a
              href=""
              className="font-inter no-underline hover:underline text-[#000000]"
            >
              Fonctionnalités
            </a>
          </li>
          <li>
            <a
              href=""
              className="font-inter no-underline hover:underline text-[#000000]"
            >
              Services
            </a>
          </li>
          <li>
            <a
              href=""
              className="font-inter no-underline hover:underline text-[#000000]"
            >
              A Propos
            </a>
          </li>
          <li>
            <a
              href=""
              className="font-inter no-underline hover:underline text-[#000000]"
            >
              S'inscrire
            </a>
          </li>
        </ul>
      </div>
      <div className="flex justify-center items-center">
        <div className="bg-[#39DB74] rounded-[12px] py-[10px] px-[21px]">
          <a href="" className="text-[#FFFFFF] no-underline hover:underline">
            Connexion
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
