import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Pill, 
  Clock, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  barData,
  pieData,
  COLORS,
  stats,
  ORDERS
} from '../../constants/Pharmassist';

const iconComponents = {
  ShoppingCart,
  Pill,
  Clock,
  AlertTriangle
};

const StatCard = ({ title, value, icon, trend, className = '' }) => {
  const Icon = iconComponents[icon];
  
  return (
    <div className={`bg-[#FFFEFE] p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] ${className}`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-[#343434] opacity-80">{title}</p>
          <p className="text-2xl font-bold mt-1 text-[#100]">{value}</p>
        </div>
        <div className="p-3 rounded-xl bg-[#037847]/10 text-[#037847]">
          <Icon className="h-5 w-5" />
        </div>
      </div>
      {trend && (
        <div className={`mt-3 flex items-center text-sm font-medium ${trend.isPositive ? 'text-[#037847]' : 'text-[#e53e3e]'}`}>
          {trend.isPositive ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          <span>{trend.value}% {trend.isPositive ? 'augmentation' : 'diminution'}</span>
        </div>
      )}
    </div>
  );
};

const PharmacienDashboard = () => {
  const [viewAll, setViewAll] = useState(false);
  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-[#100] mb-8">Dashboard</h1>
      
      {/* Stats Grid */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat, index) => (
          <StatCard 
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            trend={stat.trend}
            className={stat.className}
          />
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {/* Weekly Sales Chart */}
        <div className="bg-[#FFFEFE] p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-lg font-semibold text-[#100] mb-5">Aperçu des ventes hebdomadaires</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#343434', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#343434', fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFEFE',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    color: '#100'
                  }} 
                />
                <Bar 
                  dataKey="sales" 
                  fill="#037847" 
                  radius={[6, 6, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Medicine Categories Chart */}
        <div className="bg-[#FFFEFE] p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
          <h2 className="text-lg font-semibold text-[#100] mb-5">Catégories de médicaments</h2>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={90}
                  outerRadius={120}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                  animationDuration={1500}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFEFE',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    color: '#100'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Orders Table */}
      <div className="bg-[#FFFEFE] p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-[#100]">Commandes récentes</h2>
          <button onClick={toggleViewAll} className="text-sm font-medium text-[#037847] hover:text-[#025a38] transition-colors">
            {viewAll ? 'Afficher moins' : 'Voir tout'}
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 text-left text-sm font-medium text-[#343434]">
                <th className="whitespace-nowrap px-5 py-3">Commande #</th>
                <th className="whitespace-nowrap px-5 py-3">Client</th>
                <th className="whitespace-nowrap px-5 py-3">Date</th>
                <th className="whitespace-nowrap px-5 py-3">Statut</th>
                <th className="whitespace-nowrap px-5 py-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {(viewAll ? ORDERS : ORDERS.slice(0, 5)).map(order => (
                <tr key={order.id} className="border-b border-gray-100 text-sm text-gray-700 hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-3">{order.id}</td>
                  <td className="whitespace-nowrap px-5 py-3">{order.customer}</td>
                  <td className="whitespace-nowrap px-5 py-3">{order.orderDate}</td>
                  <td className="whitespace-nowrap px-5 py-3">{order.status}</td>
                  <td className="whitespace-nowrap px-5 py-3">€{order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PharmacienDashboard;
