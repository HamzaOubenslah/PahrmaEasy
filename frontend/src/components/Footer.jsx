const Footer = () => {
  return (
    <div className="w-full bg-[#333333] py-8 md:py-[63px] px-4 sm:px-6">
      <div className="flex flex-col justify-center items-center gap-12 md:gap-[118px] max-w-[1095px] mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col lg:flex-row justify-center items-start gap-8 md:gap-[83px] w-full">
          {/* Logo and Description */}
          <div className="flex flex-col w-full lg:w-[183px] gap-2 md:gap-[8px]">
            <h4 className="text-[#39DB74] text-xl md:text-[24px] font-bold">
              Pharma<span className="text-white">Easy</span>
            </h4>
            <p className="text-xs md:text-[14px] text-[#9BABBA]">
              La plateforme digitale qui transforme l'expérience pharmaceutique
              pour tous.
            </p>
          </div>

          {/* Links Sections */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[98.5px] w-full">
            {/* Useful Links */}
            <div className="flex flex-col gap-4 md:gap-[26px]">
              <p className="text-lg md:text-[22px] text-[#39DB74] font-semibold">
                Liens utiles
              </p>
              <ul className="flex flex-col gap-2 md:gap-[11px]">
                {['Acceuil', 'A Propos', 'Services', 'Blog', 'Contact'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#9BABBA] font-inter text-xs md:text-[14px] no-underline hover:underline hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* User Types */}
            <div className="flex flex-col gap-4 md:gap-[26px]">
              <p className="text-lg md:text-[22px] text-[#39DB74] font-semibold">
                Pour chaque utilisateur
              </p>
              <ul className="flex flex-col gap-2 md:gap-[11px]">
                {['Patients', 'Pharmaciens', 'Administrateurs', 'Documentation', 'Support'].map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-[#9BABBA] font-inter text-xs md:text-[14px] no-underline hover:underline hover:text-white transition-colors"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-4 md:gap-[26px]">
              <p className="text-lg md:text-[22px] text-[#39DB74] font-semibold">
                Contact
              </p>
              <ul className="flex flex-col gap-2 md:gap-[11px]">
                <li>
                  <a
                    href="tel:+923041234567"
                    className="text-[#9BABBA] font-inter text-xs md:text-[14px] no-underline hover:underline hover:text-white transition-colors"
                  >
                    +923041234567
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:favorite@doctor.com"
                    className="text-[#9BABBA] font-inter text-xs md:text-[14px] no-underline hover:underline hover:text-white transition-colors"
                  >
                    favorite@doctor.com
                  </a>
                </li>
                <li className="text-[#9BABBA] font-inter text-xs md:text-[14px]">
                  Glassplace, Near Cool Avenue, Boson
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="w-full text-center">
          <p className="font-inter text-sm md:text-[16px] text-white">
            Copyright © 2024 PharmaEasy, Tous droits réservés
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;