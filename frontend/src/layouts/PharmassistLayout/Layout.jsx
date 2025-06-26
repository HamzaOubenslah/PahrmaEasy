import React, { useState } from 'react';
import SidebarNav from './SidebarNav';
import { Outlet } from 'react-router-dom';

function PharmacienLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-white">
      {/* Sidebar */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'} fixed inset-y-0 z-50`}>
        <SidebarNav collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} />
      </div>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default PharmacienLayout;
