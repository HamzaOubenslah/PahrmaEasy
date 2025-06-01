import React, { useState } from "react";

const Form = () => {
  const [data, setData] = useState({
    role: "",
    nom: "",
    email: "",
    nomDePharmacy: "",
    motDePasse: "",
    confirmationMotDePasse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data); // You can replace this with your form submission logic
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[470px] p-6 bg-white rounded-[15px] shadow-md max-[520px]:w-[320px]"
    >
      <p className="font-roboto font-medium text-[20px] mb-[15px] text-center text-[#4CAF50]">
        Créer un compte
      </p>
      <p className="font-roboto text-[12px] text-[#474749] mb-[20px] text-center">
        Rejoignez PharmaEasy et simplifiez votre expérience pharmaceutique
      </p>

      {/* Role Selection */}
      <div className="flex flex-col justify-center items-center  mb-4">
        <label className="flex justify-start w-full text-gray-700 mb-2">Je Suis Un:</label>
        <div className="flex justify-center items-center space-x-4 mb-[26px] max-[520px]:w-[300px]">
          <label className="flex items-center py-[16px] px-[22px] bg-[#F4F4F4] w-[163px] rounded-[10px] max-[520px]:py-[8px] max-[520px]:px-[11px] max-[520px]:w-[120px]">
            <input
              type="radio"
              name="role"
              value="client"
              checked={data.role === "client"}
              onChange={handleChange}
              className="form-radio text-emerald-500"
            />
            <span className="ml-2 max-[520px]:text-[10px]">Client/Patient</span>
          </label>
          <label className="inline-flex items-center py-[16px] px-[22px] bg-[#F4F4F4] w-[163px] rounded-[10px] max-[520px]:py-[8px] max-[520px]:px-[11px] max-[520px]:w-[120px]">
            <input
              type="radio"
              name="role"
              value="pharmacist"
              checked={data.role === "pharmacist"}
              onChange={handleChange}
              className="form-radio text-emerald-500"
            />
            <span className="ml-2 max-[520px]:text-[10px]">Pharmacien</span>
          </label>
        </div>
      </div>

      {/* Pharmacy Name (Conditional) */}
      {data.role === "pharmacist" && (
        <div className="mb-[14px]">
          <label
            htmlFor="nomDePharmacy"
            className="block text-gray-700 mb-[12px]"
          >
            Nom de la pharmacie
          </label>
          <input
            type="text"
            id="nomDePharmacy"
            name="nomDePharmacy"
            value={data.nomDePharmacy}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            required
          />
        </div>
      )}

      {/* Name */}
      <div className="mb-[14px]">
        <label htmlFor="nom" className="block text-gray-700 mb-2">
          Nom complet
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={data.nom}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-[14px]">
        <label htmlFor="email" className="block text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-[14px]">
        <label htmlFor="motDePasse" className="block text-gray-700 mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          id="motDePasse"
          name="motDePasse"
          value={data.motDePasse}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>
      <div className="mb-[31px]">
        <label htmlFor="motDePasse" className="block text-gray-700 mb-2">
          Confirmer le mot de passe
        </label>
        <input
          type="password"
          id="confirmationMotDePasse"
          name="confirmationMotDePasse"
          value={data.confirmationMotDePasse}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-emerald-500 text-white mb-[21px] py-2 px-4 rounded-[10px] hover:bg-emerald-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        Créer un compte
      </button>
      <div className="flex justify-center items-center">
        <p className="font-inter text-[12px]">
          Déja inscrit ?<a href="" className="text-[#4CAF50]"> Connectez-Vouz</a>
        </p>
        <p></p>
      </div>
    </form>
  );
};

export default Form;
