import React, { useEffect, useState } from "react";
import { FaBars, FaChevronDown, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { User, BookmarkPlus, Bell } from "lucide-react";
import { logout, removeNotification } from "../store/authThunk/authThunk";
import { Button } from "./ui/button";
import { useSocket } from "../hooks/useSocket";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropDown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [localNotification, setLocalNotification] = useState([]);
  let items = useSelector((state) => state.cart.items);


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token, user, notifications } = useSelector((state) => state.auth);
  // const { items } = useSelector((state) => state.cart);
  // console.log("This Is The Items Of Cart In Header", items);
  const socket = useSocket(user?._id);

  // useEffect(() => {
  //   items = JSON.parse(localStorage.getItem("cart-items"));
  // }, []);

  // Handle logout and navigate to login page
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  // Restore notifications from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    const removedIds = localStorage.getItem("removedNotificationIds")
      ? JSON.parse(localStorage.getItem("removedNotificationIds"))
      : [];

    if (stored) {
      try {
        let parsed = JSON.parse(localStorage.getItem("notifications"));
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((n) => !removedIds.includes(n._id));
          setLocalNotification(filtered);
          localStorage.setItem("notifications", JSON.stringify(filtered));
        }
      } catch (err) {
        console.error("Failed to parse notifications from localStorage", err);
      }
    }
  }, [socket]);

  // Handle real-time notifications
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (notification) => {
      setLocalNotification((prev) => {
        const updated = [notification, ...prev];
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });
    };

    socket.on("new-notification", handleNewNotification);

    return () => {
      socket.off("new-notification", handleNewNotification);
    };
  }, [socket]);

  // Remove notification logic
  const handleRemoveNotification = (id) => {
    setLocalNotification((prev) => {
      const updated = prev.filter((n) => n._id !== id);
      localStorage.setItem("notifications", JSON.stringify(updated));

      let removedIds = JSON.parse(
        localStorage.getItem("removedNotificationIds") || "[]"
      );
      if (!removedIds.includes(id)) {
        removedIds.push(id);
        localStorage.setItem(
          "removedNotificationIds",
          JSON.stringify(removedIds)
        );
      }

      dispatch(removeNotification(id));
      return updated;
    });
  };

  const navItems = [
    { name: "Acceuil", to: "/", dropdown: false },
    { name: "Pharmacies", to: "/pharmacies", dropdown: false },
    { name: "Medicines", to: "/medicaments", dropdown: false },
  ];

  return (
    <header className="bg-[#ECF6FF] shadow-sm w-full relative z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-4">
        <Link to="/" className="text-[#39DB74] text-2xl font-bold">
          Pharma<span className="text-black">Easy</span>
        </Link>

        {/* Desktop Nav */}
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
                <button className="bg-[#39DB74] hover:bg-[#2db862] rounded-xl py-2 px-6 text-white">
                  Connexion
                </button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Link to="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <FaShoppingCart size={16} />
                  {Array.isArray(items) && items.length > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                      {items.length}
                    </span>
                  )}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Link to="/profile">
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell size={16} />
                        {localNotification.length > 0 && (
                          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                            {localNotification.length}
                          </span>
                        )}
                      </Button>
                    </Link>
                  </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-80 max-h-96 overflow-auto shadow-lg rounded-xl p-2">
                  <div className="text-sm font-semibold px-2 py-1 border-b">
                    Notifications
                  </div>
                  {localNotification.length > 0 ? (
                    localNotification.map((n, i) => (
                      <DropdownMenuItem
                        key={n._id || i}
                        className="flex items-start justify-between gap-2 p-2 hover:bg-muted rounded-md"
                      >
                        <Link to={``} className="flex-1">
                          <div className="flex flex-col">
                            <span className="text-sm text-foreground">
                              {n.content}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {new Date(n.createdAt).toLocaleString()}
                            </span>
                          </div>
                        </Link>
                        <button
                          className="ml-2 text-muted-foreground hover:text-red-500 text-sm"
                          title="Delete notification"
                          onClick={(e) => {
                            e.preventDefault();
                            handleRemoveNotification(n._id);
                          }}
                        >
                          &times;
                        </button>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <DropdownMenuLabel className="text-center text-muted-foreground py-4">
                      No notifications
                    </DropdownMenuLabel>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen((prev) => !prev)}
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
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 ring-1 ring-black ring-opacity-5 z-50 overflow-hidden">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all duration-150"
                    >
                      <User size={16} /> Profil
                    </Link>
                    <button
                      className="w-full text-left flex items-center gap-2 px-4 py-3 text-sm text-red-600 hover:bg-gray-50 transition-all duration-150"
                      onClick={handleLogout}
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
                          d="M17 16l4-4m0 0l-4-4m4 4H7"
                        />
                      </svg>
                      Déconnexion
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Mobile Icon */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black focus:outline-none"
          >
            {isMobileMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-40 px-4 pb-4">
          <nav>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.to}
                    className="block text-black py-2 px-2 hover:bg-gray-50 rounded"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              {token && user?.role === "customer" && (
                <li>
                  <Link
                    to="/nearby-pharmacies"
                    className="block text-black py-2 px-2 hover:bg-gray-50 rounded"
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
                  <button
                    onClick={handleLogout}
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
