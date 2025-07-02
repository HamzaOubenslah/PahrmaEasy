import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPharmacyOrders } from "../../store/pharmacyThunk/pharmacyThunk";
import { Loader2, User, Calendar } from "lucide-react";

const PharmacyOrdonance = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.pharmacy);

  useEffect(() => {
    dispatch(fetchPharmacyOrders());
  }, [dispatch]);

  const ordersWithOrdonance = orders?.filter((order) => order.ordonance);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-600">
        Erreur de chargement des commandes : {error}
      </div>
    );
  }

  if (!ordersWithOrdonance || ordersWithOrdonance.length === 0) {
    return <div className="p-6 text-gray-500">Aucune ordonnance trouvée.</div>;
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Ordonnances des Commandes
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ordersWithOrdonance.map((order) => (
            <div
              key={order._id}
              className="border border-gray-200 rounded-lg shadow hover:shadow-md transition p-4 bg-white flex flex-col justify-between"
            >
              {/* Ordonnance Image */}
              <img
                src={order.ordonance}
                alt="Ordonnance"
                className="w-full h-48 object-cover rounded-md mb-4"
              />

              {/* Customer Name */}
              <div className="flex items-center text-sm text-gray-700 mb-1">
                <User className="h-4 w-4 text-gray-500 mr-2" />
                <span>{order?.customer?.name || "Client inconnu"}</span>
              </div>

              {/* Date */}
              <div className="flex items-center text-sm text-gray-700 mb-2">
                <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                <span>{new Date(order.createdAt).toLocaleDateString("fr-FR")}</span>
              </div>

              {/* Status */}
              <div className="text-sm">
                <span
                  className={`inline-block px-2 py-1 rounded text-white font-medium ${
                    order.status === "completed"
                      ? "bg-green-600"
                      : order.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {order.status || "Inconnu"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PharmacyOrdonance;
