import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Pill, 
  Clock, 
  AlertTriangle,
  ArrowUp,
  ArrowDown
} from "lucide-react";

import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchMedicines,
  fetchCategories,
  fetchPharmacyReviews,
  fetchOrders,
  deleteReview
} from '../../store/pharmacyThunk';
import { COLORS } from '../../constants/Pharmassist';

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
  const dispatch = useDispatch();
  const [viewAll, setViewAll] = useState(false);
  
  // Sélectionnez les données depuis le store Redux
  const { 
    medicines = [], 
    categories = [], 
    reviews = [], 
    orders = [],
    loading, 
    error 
  } = useSelector((state) => state.pharmacy);
  
  const stats = [
    {
      title: "Médicaments en stock",
      value: medicines.length,
      icon: "Pill",
      trend: { isPositive: true, value: 12 },
      className: "md:col-span-1"
    },
    {
      title: "Commandes aujourd'hui",
      value: orders.filter(order => 
        new Date(order.createdAt).toDateString() === new Date().toDateString()
      ).length,
      icon: "ShoppingCart",
      trend: { isPositive: true, value: 5 },
      className: "md:col-span-1"
    },
    {
      title: "Commandes en attente",
      value: orders.filter(order => order.status === 'pending').length,
      icon: "Clock",
      trend: { isPositive: false, value: 2 },
      className: "md:col-span-1"
    },
    {
      title: "Médicaments épuisés",
      value: medicines.filter(m => m.stock <= 0).length,
      icon: "AlertTriangle",
      className: "md:col-span-1"
    }
  ];

  // Données pour le graphique des ventes hebdomadaires
  const getWeeklySalesData = () => {
    const days = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay() + 1)); // Lundi
    
    return days.map((day, index) => {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + index);
      
      const dayOrders = orders.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate.toDateString() === dayDate.toDateString();
      });
      
      return {
        name: day,
        sales: dayOrders.reduce((total, order) => total + order.totalPrice, 0)
      };
    });
  };

  const barData = getWeeklySalesData();

  // Catégories de médicaments pour le pie chart
  const pieData = categories.map(category => ({
    name: category.name,
    value: medicines.filter(med => med.category === category._id).length
  }));

  // Commandes formatées pour le tableau
  const formattedOrders = [...orders] // Create a copy of the array
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .map(order => ({
    id: order._id,
    customer: order.customer?.name || 'Anonyme',
    orderDate: new Date(order.createdAt).toLocaleDateString(),
    status: order.status,
    total: order.totalPrice
  }));

  useEffect(() => {
    // Chargez les données au montage du composant
    dispatch(fetchMedicines());
    dispatch(fetchCategories());
    dispatch(fetchPharmacyReviews());
    dispatch(fetchOrders());
  }, [dispatch]);

  const toggleViewAll = () => {
    setViewAll(!viewAll);
  };

  if (loading) {
    return <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#037847]"></div>
    </div>;
  }

  if (error) {
    return <div className="p-6 min-h-screen flex items-center justify-center">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        {error}
      </div>
    </div>;
  }

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
      
      
      {/* Recent Orders Table */}
      <div className="bg-[#FFFEFE] p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-semibold text-[#100]">Commandes récentes</h2>
          <button 
            onClick={toggleViewAll} 
            className="text-sm font-medium text-[#037847] hover:text-[#025a38] transition-colors"
            disabled={formattedOrders.length <= 5}
          >
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
              {(viewAll ? formattedOrders : formattedOrders.slice(0, 5)).map(order => (
                <tr key={order.id} className="border-b border-gray-100 text-sm text-gray-700 hover:bg-gray-50">
                  <td className="whitespace-nowrap px-5 py-3">#{order.id.slice(-6)}</td>
                  <td className="whitespace-nowrap px-5 py-3">{order.customer}</td>
                  <td className="whitespace-nowrap px-5 py-3">{order.orderDate}</td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status === 'delivered' ? 'Livré' :
                       order.status === 'pending' ? 'En attente' : 'Annulé'}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">€{order.total.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {formattedOrders.length === 0 && (
            <p className="text-center py-4 text-gray-500">Aucune commande récente</p>
          )}
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="bg-[#FFFEFE] p-5 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg mt-8">
        <h2 className="text-lg font-semibold text-[#100] mb-5">Avis des clients</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(review => (
              <div key={review._id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-[#100]">{review.customer?.name || 'Anonyme'}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                  </div>
                  <button 
                    onClick={() => dispatch(deleteReview(review._id))}
                    className="text-red-500 hover:text-red-700 text-sm font-medium"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun avis pour le moment</p>
        )}
      </div>
    </div>
  );
};

export default PharmacienDashboard;