import React, { useState } from "react";
import { FaBars, FaChevronDown, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { User, BookmarkPlus } from "lucide-react";
import { logout } from "../store/authThunk/authThunk";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.auth);

  console.log("This Is The User",user);
  console.log("This Is The Token",token);
  const navItems = [
    { name: "Acceuil", to: "/", dropdown: false },
    { name: "Fonctionnalités", to: "/features", dropdown: false },
    { name: "Services", to: "/services", dropdown: false },
    { name: "A Propos", to: "/about", dropdown: false },
  ];

  return (
    <header className="bg-[#ECF6FF] shadow-sm w-full relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        {/* Logo */}
        <Link to="/" className="text-[#39DB74] text-2xl font-bold">
          Pharma<span className="text-black">Easy</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              className="text-black hover:underline transition"
            >
              {item.name}
            </Link>
          ))}
          {/* Conditionally add Nearby Pharmacies link for customers */}
          {token && user?.role === "customer" && (
            <Link
              to="/near-pharmacies"
              className="text-black hover:underline transition"
            >
              Pharmacies Proches
            </Link>
          )}
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {!token ? (
            <>
              <Link
                to="/register"
                className="text-black hover:underline transition"
              >
                S'inscrire
              </Link>
              <Link to="/login">
                <button className="bg-[#39DB74] hover:bg-[#2db862] rounded-xl py-2 px-6 text-white transition duration-300">
                  Connexion
                </button>
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 text-black hover:text-[#39DB74]"
              >
                <User size={20} />
                <FaChevronDown
                  className={`text-sm transition-transform ${
                    userDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-48 py-1">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <User size={16} /> Profil
                  </Link>
                  <Link
                    to="/bookmarks"
                    className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    <BookmarkPlus size={16} /> Favoris
                  </Link>
                  <button
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => dispatch(logout())}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5m0 6v2"
                      />
                    </svg>
                    Déconnexion
                  </button>
                </div>
              )}
            </div>
          )}
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
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 px-4 pb-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="block text-black py-2 hover:underline px-2 hover:bg-gray-50 rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {/* Conditionally show Nearby Pharmacies for customers */}
              {token && user.role === "customer" && (
                <li>
                  <Link
                    to="/nearby-pharmacies"
                    className="block text-black py-2 hover:underline px-2 hover:bg-gray-50 rounded"
                  >
                    Pharmacies Proches
                  </Link>
                </li>
              )}
              {!token ? (
                <>
                  <li>
                    <Link
                      to="/register"
                      className="block text-black py-2 px-2 hover:bg-gray-50 rounded"
                    >
                      S'inscrire
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block text-black py-2 px-2 hover:bg-gray-50 rounded"
                    >
                      Connexion
                    </Link>
                  </li>
                </>
              ) : (
                <li className="pt-2 border-t mt-2">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded"
                  >
                    <User size={16} /> Profil
                  </Link>
                  <Link
                    to="/bookmarks"
                    className="flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded"
                  >
                    <BookmarkPlus size={16} /> Favoris
                  </Link>
                  <button
                    onClick={() => dispatch(logout())}
                    className="w-full text-left flex items-center gap-2 py-2 px-2 hover:bg-gray-50 rounded text-red-600"
                  >
                    Déconnexion
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
