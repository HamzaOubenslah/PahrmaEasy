import React, { useState } from "react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItems = [
    { name: 'Acceuil', to: '/', dropdown: false },
    { name: 'Fonctionnalités', to: '/features', dropdown: false },
    { name: 'Services', to: '/services', dropdown: false },
    { name: 'A Propos', to: '/about', dropdown: false },
    { name: 'S\'inscrire', to: '/register', dropdown: false },
  ];

  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  return (
    <header className="bg-[#ECF6FF] shadow-sm w-full relative">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-[#39DB74] text-2xl font-bold">
          Pharma<span className="text-black">Easy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <div key={item.name} className="relative group">
              <div className="flex items-center">
                <Link
                  to={item.to}
                  className="text-black hover:underline transition"
                >
                  {item.name}
                </Link>
                {item.dropdown && (
                  <FaChevronDown className="ml-1 inline-block text-xs" />
                )}
              </div>
              {item.dropdown && (
                <div className="absolute left-0 mt-2 bg-white rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition duration-300 z-50 w-48">
                  {item.subItems.map((subItem) => (
                    <Link
                      key={subItem}
                      to="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#39DB74] hover:text-white"
                    >
                      {subItem}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Button */}
        <div className="hidden md:block">
          <Link to="/login">
            <button className="bg-[#39DB74] hover:bg-[#2db862] rounded-xl py-2 px-6 text-white transition duration-300">
              Connexion
            </button>
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 px-4 pb-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <div
                        className="flex justify-between items-center text-black py-2 hover:bg-gray-50 px-2 rounded"
                        onClick={() => toggleDropdown(item.name)}
                      >
                        <span>{item.name}</span>
                        <FaChevronDown
                          className={`transition-transform duration-300 ${
                            activeDropdown === item.name ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      {activeDropdown === item.name && (
                        <ul className="ml-4 mt-1 space-y-1">
                          {item.subItems.map((subItem) => (
                            <li key={subItem}>
                              <Link
                                to="#"
                                className="block text-gray-600 hover:text-[#39DB74] py-1 px-2 hover:bg-gray-50 rounded"
                              >
                                {subItem}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ) : (
                    <Link
                      to={item.to}
                      className="block text-black py-2 hover:underline px-2 hover:bg-gray-50 rounded"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="pt-4 px-2">
            <Link to="/login">
              <button className="w-full bg-[#39DB74] hover:bg-[#2db862] rounded-xl py-3 text-white transition duration-300">
                Connexion
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
