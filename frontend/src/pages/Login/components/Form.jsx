import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../store/authThunk/authThunk";
import { useDispatch } from "react-redux";

const Form = () => {
  const [data, setData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
  });
  const [image, setImage] = useState(null); // New state to store the image file
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });

  console.log("This Is The Coordinates", coordinates);

  useEffect(() => {
    if (data.role === "pharmacy") {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setCoordinates({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            console.error("Geolocation error:", error.message);
            alert("Erreur de géolocalisation");
          }
        );
      } else {
        alert("Votre navigateur ne supporte pas la géolocalisation.");
      }
    }
  }, [data.role]);

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // New handleImageChange function
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // Store the image file in state
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    const userData = {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      profileImage: image, // Attach the image to userData
    };

    if (data.role === "pharmacy") {
      if (!coordinates.latitude || !coordinates.longitude) {
        alert("Localisation manquante !");
        return;
      }

      userData.address = data.address;
      userData.phone = data.phone;
      userData.location = {
        type: "Point",
        coordinates: [coordinates.latitude, coordinates.longitude],
      };
    }

    console.log("This Is The USERDATA", userData);

    // If you're sending the data to an API, you may need to use FormData to handle the image
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);
    formData.append("profileImage", image);

    if (data.role === "pharmacy") {
      formData.append("address", data.address);
      formData.append("phone", data.phone);
      formData.append("location", JSON.stringify(userData.location)); // Send location as an object
    }

    // Call your registerUser action with formData instead of userData directly
    dispatch(registerUser(formData));

    // Redirect to login page
    navigate('/login');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-[470px] p-6 bg-white rounded-xl shadow-md max-[520px]:w-[320px]"
    >
      <h2 className="text-2xl font-semibold text-center mb-6 text-emerald-600">
        Créer un compte
      </h2>

      {/* Role */}
      <div className="flex justify-center gap-10 mb-6 text-sm">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="role"
            value="customer"
            checked={data.role === "customer"}
            onChange={handleChange}
          />
          Client
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="role"
            value="pharmacy"
            checked={data.role === "pharmacy"}
            onChange={handleChange}
          />
          Pharmacie
        </label>
      </div>

      {/* Pharmacy only fields */}
      {data.role === "pharmacy" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              value={data.address}
              onChange={handleChange}
              placeholder="Adresse"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="Téléphone"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
        </>
      )}

      {/* Common fields */}
      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handleChange}
          placeholder="Nom complet"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmer le mot de passe"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>

      {/* Image Upload Field */}
      <div className="mb-4">
        <input
          type="file"
          name="profileImage"
          onChange={handleImageChange}
          className="w-full border border-gray-300 p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition"
      >
        S'inscrire
      </button>
    </form>
  );
};

export default Form;
