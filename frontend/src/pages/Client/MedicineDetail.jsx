import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MEDICINES } from "../../constants/Pharmassist";

const MedicineDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const medicine = MEDICINES.find((m) => m.id === id);

  if (!medicine) {
    return <div className="p-6 text-red-600">Médicament introuvable.</div>;
  }

  return (
    <div className="p-6">
      <button onClick={() => navigate(-1)} className="text-sm text-blue-600 hover:underline mb-4">
        ← Retour
      </button>

      <h1 className="text-2xl font-bold mb-4">{medicine.name}</h1>

      <div className="space-y-2 text-gray-700">
        <p><strong>Catégorie :</strong> {medicine.category}</p>
        <p><strong>Stock :</strong> {medicine.stock}</p>
        <p><strong>Statut :</strong> {medicine.status}</p>
        <p><strong>Prix :</strong> €{medicine.price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default MedicineDetail;
