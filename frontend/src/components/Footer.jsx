const Footer = () => {
  return (
    <div className="w-full bg-[#333333] flex justify-center py-[63px]">
      <div className="flex flex-col justify-center items-center gap-[118px] w-[1095px]">
        <div className="flex flex-row justify-center items-center gap-[83px]">
          <div className="flex flex-col w-[183px] gap-[8px]">
            <h4 className="text-[#39DB74] text-[24px] font-bold">
              Pharma<span className="text-[#000000]">Easy</span>
            </h4>
            <p className="text-[14px] text-[#9BABBA]">
              La plateforme digitale qui transforme l'expérience pharmaceutique
              pour tous.
            </p>
          </div>
          <div className="flex flex-row justify-center items-center gap-[98.5px]">
            <div className="flex flex-col justify-start gap-[26px]">
              <p className="text-[22px] text-[#39DB74] font-jakarta font-semibold">
                Liens utiles
              </p>
              <div className="flex justify-center items-center w-full">
                <ul className="flex flex-col justify-start list-none gap-[11px] w-full">
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Acceuil
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      A Propos
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Services
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Blog
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-start gap-[26px]">
              <p className="text-[22px] text-[#39DB74] font-jakarta font-bold">
                Pour chaque utilisateur
              </p>
              <div className="flex justify-center items-center">
                <ul className="flex flex-col justify-start list-none gap-[11px] w-full">
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Patients
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Pharmaciens
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Administrateurs
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Documentation
                    </a>
                  </li>
                  <li className="w-full">
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col justify-start items-start gap-[26px] h-[217px]">
              <p className="text-[22px] text-[#39DB74] font-jakarta font-bold">
                Contact
              </p>
              <div className="flex justify-center items-center">
                <ul className="flex flex-col justify-start list-none gap-[11px] w-full">
                  <li>
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      +923041234567
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      favorite@doctor.com
                    </a>
                  </li>
                  <li>
                    <a
                      href=""
                      className="text-[#9BABBA] font-inter text-[14px] no-underline hover:underline"
                    >
                      Glassplace, Near Cool Avenue, Boson
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          <p className="font-inter text-[16px] text-[#FFFFFF]">
            Copyright 2024 Favorite Doctor, All Rights Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
