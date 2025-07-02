import React, { useState, useEffect } from "react";
import {
  LogOut,
  Pill,
  Menu,
  LayoutDashboard,
  ShoppingCart,
  Bell,
  UserRound,
  FileText,
  LetterText,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authThunk/authThunk";
import { useSocket } from "../../hooks/useSocket";

// Navigation items definition
export const navItems = [
  {
    titre: "Tableau de Bord",
    icone: LayoutDashboard,
    lien: "/pharmacien/dashboard",
  },
  {
    titre: "Commandes",
    icone: ShoppingCart,
    lien: "/pharmacien/orders",
  },
  {
    titre: "Médicaments",
    icone: Pill,
    lien: "/pharmacien/medicaments",
  },
  {
    titre: "Alertes",
    icone: Bell,
    lien: "/pharmacien/alerts",
  },
  {
    titre: "Mon Profil",
    icone: UserRound,
    lien: "/pharmacien/myprofile",
  },
  {
    titre: "Ordonances",
    icone: FileText,
    lien: "/pharmacien/ordonance",
  },
];

function SidebarNav({ collapsed, setCollapsed }) {
  const [activeLink, setActiveLink] = useState(window.location.pathname);
  const [localNotification, setLocalNotification] = useState([]);
  const [alertNotification, setAlertNotification] = useState([]);
  const [ordonanceNotification, setOrdonanceNotification] = useState([]);
  const [_, forceUpdate] = useState(0); // force re-render
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useSelector((state) => state.auth);
  const socket = useSocket(user?._id);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/login");
  };

  // Restore notifications from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("notifications");
    const removedIds = localStorage.getItem("removedNotificationIds")
      ? JSON.parse(localStorage.getItem("removedNotificationIds"))
      : [];

    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          const filtered = parsed.filter((n) => !removedIds.includes(n._id));
          const alertNotification = filtered.filter(
            (n) => n.type === "Stock_Alert"
          );
          const ordonanceNotification = filtered.filter(
            (n) => n.type === "Ordonance_Upload"
          );
          let filiteredNotification = filtered.filter(
            (n) => !alertNotification.includes(n)
          );
          filiteredNotification = filiteredNotification.filter(
            (n) => !ordonanceNotification.includes(n)
          );
          setAlertNotification(alertNotification);
          setLocalNotification(filiteredNotification);
          localStorage.setItem(
            "alert-notifications",
            JSON.stringify(alertNotification)
          );
          localStorage.setItem(
            "notifications",
            JSON.stringify(filiteredNotification)
          );
          localStorage.setItem(
            "ordonance-notifications",
            JSON.stringify(ordonanceNotification)
          );
        }
      } catch (err) {
        console.error("Failed to parse notifications from localStorage", err);
      }
    }
  }, [socket]);

  // Real-time socket notification listener
  useEffect(() => {
  if (!socket) return;

  const handleNewNotification = (notification) => {
    if (notification.type === "Stock_Alert") {
      setAlertNotification((prev) => {
        const updated = [notification, ...prev];
        localStorage.setItem("alert-notifications", JSON.stringify(updated));
        return updated;
      });
    } else if (notification.type === "Ordonance_Upload") {
      setOrdonanceNotification((prev) => {
        const updated = [notification, ...prev];
        localStorage.setItem("ordonance-notifications", JSON.stringify(updated));
        return updated;
      });
    } else {
      // default notifications go here (orders, etc)
      setLocalNotification((prev) => {
        const updated = [notification, ...prev];
        localStorage.setItem("notifications", JSON.stringify(updated));
        return updated;
      });
    }
  };

  socket.on("new-notification", handleNewNotification);

  return () => {
    socket.off("new-notification", handleNewNotification);
  };
}, [socket]);


  // Clear notifications when navigating to /pharmacien/orders
  useEffect(() => {
    if (location.pathname === "/pharmacien/orders") {
      const storedNotifications = JSON.parse(
        localStorage.getItem("notifications") || "[]"
      );
      const removedIds = JSON.parse(
        localStorage.getItem("removedNotificationIds") || "[]"
      );

      const allIds = storedNotifications.map((n) => n._id);
      const updatedRemoved = Array.from(new Set([...removedIds, ...allIds]));

      localStorage.setItem(
        "removedNotificationIds",
        JSON.stringify(updatedRemoved)
      );
      localStorage.setItem("notifications", JSON.stringify([]));
      setLocalNotification([]);
      forceUpdate((prev) => prev + 1); // force re-render
    }
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname === "/pharmacien/alerts") {
      const storedNotifications = JSON.parse(
        localStorage.getItem("alert-notifications") || "[]"
      );
      const removedIds = JSON.parse(
        localStorage.getItem("removedNotificationIds") || "[]"
      );

      const allIds = storedNotifications.map((n) => n._id);
      const updatedRemoved = Array.from(new Set([...removedIds, ...allIds]));

      localStorage.setItem(
        "removedNotificationIds",
        JSON.stringify(updatedRemoved)
      );
      localStorage.setItem("alert-notifications", JSON.stringify([]));
      setAlertNotification([]);
      forceUpdate((prev) => prev + 1); // force re-render
    }
  }, [location.pathname]);
  useEffect(() => {
    if (location.pathname === "/pharmacien/ordonance") {
      const storedNotifications = JSON.parse(
        localStorage.getItem("ordonance-notifications") || "[]"
      );
      const removedIds = JSON.parse(
        localStorage.getItem("removedNotificationIds") || "[]"
      );

      const allIds = storedNotifications.map((n) => n._id);
      const updatedRemoved = Array.from(new Set([...removedIds, ...allIds]));

      localStorage.setItem(
        "removedNotificationIds",
        JSON.stringify(updatedRemoved)
      );
      localStorage.setItem("ordonance-notifications", JSON.stringify([]));
      setOrdonanceNotification([]);
      forceUpdate((prev) => prev + 1); // force re-render
    }
  }, [location.pathname]);



  return (
    <div className="h-full bg-[#037847] flex flex-col border-r transition-all duration-300">
      {/* Header */}
      <div
        className={`px-4 py-3 border-b border-[#0a5c3a] flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold text-white">PharmaEasy</h1>
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="text-white hover:bg-[#0a5c3a] p-1 rounded-md"
        >
          <Menu className="h-8 w-8" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.lien}
            to={item.lien}
            onClick={() => setActiveLink(item.lien)}
            className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
              activeLink === item.lien
                ? "bg-white text-[#037847]"
                : "text-white hover:bg-[#0a5c3a]"
            }`}
          >
            {item.icone === ShoppingCart ? (
              <span className="relative">
                <item.icone className="h-8 w-8" />
                {localNotification.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {localNotification.length}
                  </span>
                )}
              </span>
            ) : item.icone === Bell ? (
              <span className="relative">
                <item.icone className="h-8 w-8" />
                {alertNotification.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {alertNotification.length}
                  </span>
                )}
              </span>
            ) : item.icone === FileText ? (
              <span className="relative">
                <item.icone className="h-8 w-8" />
                {ordonanceNotification.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    {ordonanceNotification.length}
                  </span>
                )}
              </span>
            ) : (
              <item.icone className="h-8 w-8" />
            )}
            {!collapsed && <span>{item.titre}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-[#0a5c3a]">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white hover:bg-[#0a5c3a]"
        >
          <LogOut className="h-8 w-8" />
          {!collapsed && <span>Déconnexion</span>}
        </button>
      </div>
    </div>
  );
}

export default SidebarNav;
