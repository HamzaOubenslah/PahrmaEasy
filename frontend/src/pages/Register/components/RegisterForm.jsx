import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../../store/authThunk/authThunk"; // adjust path as needed
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    motDePasse: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result =await dispatch(
      loginUser({
        email: data.email,
        password: data.motDePasse, // match what backend expects
      })
    ).unwrap();
    console.log("This The Result",result)
    if (result.success) {
      navigate("/");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[470px] p-6 bg-white rounded-[15px] shadow-md max-[520px]:w-[320px]"
    >
      <p className="font-roboto font-medium text-[20px] mb-[15px] text-center text-[#4CAF50]">
        Connectez-vous
      </p>
      <p className="font-roboto text-[12px] text-[#474749] mb-[20px] text-center">
        Accédez à votre compte PharmaEasy
      </p>

      {error && (
        <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
      )}

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
          className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Password */}
      <div className="mb-[31px]">
        <label htmlFor="motDePasse" className="block text-gray-700 mb-2">
          Mot de passe
        </label>
        <input
          type="password"
          id="motDePasse"
          name="motDePasse"
          value={data.motDePasse}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-[10px] focus:outline-none focus:ring-2 focus:ring-emerald-500"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#4CAF50] text-white mb-[21px] py-3 px-4 rounded-[10px] hover:bg-[#3d8b40] transition duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {loading ? "Connexion..." : "Se connecter"}
      </button>

      <div className="flex justify-center items-center">
        <p className="font-inter text-[12px]">
          Pas encore inscrit ?{" "}
          <a href="" className="text-[#4CAF50]">
            Créez un compte
          </a>
        </p>
      </div>

      <div className="text-center mt-4">
        <a href="#" className="text-[12px] text-[#4CAF50] hover:underline">
          Mot de passe oublié ?
        </a>
      </div>
    </form>
  );
};

export default RegisterForm;
