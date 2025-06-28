// import React from 'react';
// import { LogOut, Pill, Menu } from 'lucide-react';
// import { navItems } from '../../constants/Pharmassist';
// import { Link } from 'react-router-dom';

// function SidebarNav({ collapsed, setCollapsed }) {
//   const [activeLink, setActiveLink] = React.useState('/pharmacien/dashboard');

//   const toggleSidebar = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div className="h-full bg-[#037847] flex flex-col border-r transition-all duration-300">
//       {/* Header: Icon + Title + Toggle Button */}
//       <div className={`px-4 py-3 border-b border-[#0a5c3a] flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
//   {!collapsed && (
//     <div className="flex items-center gap-2">
//       <Pill className="h-6 w-6 text-white" />
//       <h1 className="text-xl font-bold text-white">PharmaEasy</h1>
//     </div>
//   )}
//   <button onClick={toggleSidebar} className="text-white hover:bg-[#0a5c3a] p-1 rounded-md">
//     <Menu className="h-5 w-5" />
//   </button>
// </div>


//       {/* Navigation */}
//       <nav className="flex-1 px-2 py-4 overflow-y-auto space-y-1">
//         {navItems.map((item) => (
//           <Link
//             key={item.lien}
//             to={item.lien}
//             onClick={() => setActiveLink(item.lien)}
//             className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium ${
//               activeLink === item.lien
//                 ? 'bg-white text-[#037847]'
//                 : 'text-white hover:bg-[#0a5c3a]'
//             }`}
//           >
//             <item.icone className="h-5 w-5" />
//             {!collapsed && <span>{item.titre}</span>}
//           </Link>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="px-2 py-4 border-t border-[#0a5c3a]">
//         <Link
//           to="/logout"
//           className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-white hover:bg-[#0a5c3a]"
//         >
//           <LogOut className="h-5 w-5" />
//           {!collapsed && <span>Déconnexion</span>}
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default SidebarNav;










import React from 'react';
import { LogOut, Pill, Menu, LayoutDashboard, ShoppingCart, Bell, UserRound } from 'lucide-react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/authThunk/authThunk';

export const navItems = [
  {
    titre: "Tableau de Bord",
    icone: LayoutDashboard,
    lien: "/pharmacien/dashboard", // Update to full path
  },
  {
    titre: "Commandes",
    icone: ShoppingCart,
    lien: "/pharmacien/orders", // Changed from "Orders" to "orders" for consistency
  },
  {
    titre: "Médicaments",
    icone: Pill,
    lien: "/pharmacien/medicaments",
  },
  {
    titre: "Alertes",
    icone: Bell,
    lien: "/pharmacien/alerts", // Changed from "alertes" to match route
  },
  {
    titre: "Mon Profil",
    icone: UserRound,
    lien: "/pharmacien/myprofile",
  }
];

function SidebarNav({ collapsed, setCollapsed }) {
  const  [activeLink, setActiveLink] = React.useState(window.location.pathname);
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  const handleLogout = (e) => {
    e.preventDefault()
    dispatch(logout())
    navigate('/login')
  }
  return (
    <div className="h-full bg-[#037847] flex flex-col border-r transition-all duration-300">
      {/* Header: Icon + Title + Toggle Button */}
      <div className={`px-4 py-3 border-b border-[#0a5c3a] flex items-center ${collapsed ? 'justify-center' : 'justify-between'}`}>
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Pill className="h-6 w-6 text-white" />
            <h1 className="text-xl font-bold text-white">PharmaEasy</h1>
          </div>
        )}
        <button onClick={toggleSidebar} className="text-white hover:bg-[#0a5c3a] p-1 rounded-md">
          <Menu className="h-5 w-5" />
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
                ? 'bg-white text-[#037847]'
                : 'text-white hover:bg-[#0a5c3a]'
            }`}
          >
            <item.icone className="h-5 w-5" />
            {!collapsed && <span>{item.titre}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-2 py-4 border-t border-[#0a5c3a]">
        <button onClick={handleLogout}>

          <LogOut className="h-5 w-5" />
          <span>Déconnexion</span>
        </button>
      </div>
    </div>
  );
}

export default SidebarNav;