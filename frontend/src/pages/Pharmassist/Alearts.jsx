import React, { useEffect } from "react";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacyMedicines } from "../../store/pharmacyThunk/pharmacyThunk";

const Alerts = () => {
  const dispatch = useDispatch();
  const { medicines, loading, error } = useSelector((state) => state.pharmacy);

  useEffect(() => {
    dispatch(fetchPharmacyMedicines());
  }, [dispatch]);

  // Simplified stock level filtering
  const criticalStockMedicines = medicines?.filter(med => med.stock < 5) || [];
  const lowStockMedicines = medicines?.filter(med => med.stock >= 5 && med.stock < 10) || [];

  if (loading) return <div className="p-4">Loading medicines...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Alerts</h1>
      </div>
      
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        {/* Critical Stock Card - Larger and more prominent */}
        <div className="border-2 border-red-300 rounded-xl p-6 bg-red-50 shadow-md">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-xl font-semibold text-red-800">Critical Stock</h2>
            <div className="rounded-full bg-red-200 p-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
          </div>
          <p className="text-md text-gray-600 mb-4">Items with less than 5 in stock</p>
          <div className="text-4xl font-bold text-red-700 mb-2">{criticalStockMedicines.length}</div>
          <p className="text-md text-gray-600 mb-4">
            Items require immediate attention
          </p>
          <a href="#critical" className="mt-4 text-red-700 inline-flex items-center text-md font-medium">
            View Critical Items
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
        
        {/* Low Stock Card - Larger and more prominent */}
        <div className="border-2 border-amber-300 rounded-xl p-6 bg-amber-50 shadow-md">
          <div className="flex items-center justify-between pb-4">
            <h2 className="text-xl font-semibold text-amber-800">Low Stock</h2>
            <div className="rounded-full bg-amber-200 p-2">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
          </div>
          <p className="text-md text-gray-600 mb-4">Items with 5-9 in stock</p>
          <div className="text-4xl font-bold text-amber-700 mb-2">{lowStockMedicines.length}</div>
          <p className="text-md text-gray-600 mb-4">
            Items need to be restocked soon
          </p>
          <a href="#low" className="mt-4 text-amber-700 inline-flex items-center text-md font-medium">
            View Low Stock Items
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
      
      {/* Critical Items Table */}
      <div id="critical" className="pt-8">
        <h2 className="text-2xl font-bold mb-6 text-red-800">Critical Stock Items</h2>
        <div className="border-2 border-red-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-red-50">
                <tr className="border-b border-red-200 text-left text-md font-semibold">
                  <th className="whitespace-nowrap px-6 py-4">Medicine</th>
                  <th className="whitespace-nowrap px-6 py-4">Category</th>
                  <th className="whitespace-nowrap px-6 py-4">Stock</th>
                  <th className="whitespace-nowrap px-6 py-4">Status</th>
                  <th className="whitespace-nowrap px-6 py-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {criticalStockMedicines.map((medicine) => (
                  <tr key={medicine._id} className="border-b border-red-100 last:border-none hover:bg-red-50/50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{medicine.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{medicine.category?.name || medicine.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold">{medicine.stock}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-red-100 text-red-800">
                        Critical
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">${medicine.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Low Stock Items Table */}
      <div id="low" className="pt-8">
        <h2 className="text-2xl font-bold mb-6 text-amber-800">Low Stock Items</h2>
        <div className="border-2 border-amber-200 rounded-lg bg-white overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-amber-50">
                <tr className="border-b border-amber-200 text-left text-md font-semibold">
                  <th className="whitespace-nowrap px-6 py-4">Medicine</th>
                  <th className="whitespace-nowrap px-6 py-4">Category</th>
                  <th className="whitespace-nowrap px-6 py-4">Stock</th>
                  <th className="whitespace-nowrap px-6 py-4">Status</th>
                  <th className="whitespace-nowrap px-6 py-4">Price</th>
                </tr>
              </thead>
              <tbody>
                {lowStockMedicines.map((medicine) => (
                  <tr key={medicine._id} className="border-b border-amber-100 last:border-none hover:bg-amber-50/50">
                    <td className="whitespace-nowrap px-6 py-4 font-medium">{medicine.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{medicine.category?.name || medicine.category}</td>
                    <td className="whitespace-nowrap px-6 py-4 font-semibold">{medicine.stock}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-amber-100 text-amber-800">
                        Low
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">${medicine.price?.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;