
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { registerUser } from "../../../store/authThunk/authThunk";
// import { useDispatch } from "react-redux";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     role: "",
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     address: "",
//     phone: "",
//     licenseNumber: ""
//   });
 
//   const [geoError, setGeoError] = useState(null);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [apiError, setApiError] = useState(null);
//   const navigate = useNavigate();
//   const dispatch=useDispatch();
//   const [coordinates, setCoordinates] = useState({
//     latitude: null,
//     longitude: null,
//   });

//   console.log("This Is The Coordinates", coordinates);

//   useEffect(() => {
//     const getLocation = async () => {
//       if (formData.role === "pharmacy") {
//         setGeoError(null);
        
//         if (!navigator.geolocation) {
//           setGeoError("La géolocalisation n'est pas supportée par votre navigateur");
//           return;
//         }

//         try {
//           const position = await new Promise((resolve, reject) => {
//             navigator.geolocation.getCurrentPosition(
//               resolve,
//               reject,
//               {
//                 enableHighAccuracy: true,
//                 timeout: 10000,
//                 maximumAge: 0
//               }
//             );
//           });
          
//           setCoordinates({
//             type: "Point",
//             coordinates: [
//               position.coords.longitude,
//               position.coords.latitude
//             ]
//           });
//         } catch (error) {
//           console.error("Geolocation error:", error);
//           setGeoError(getFriendlyGeoError(error.code));
//         }
//       }
//     };

//     getLocation();
//   }, [formData.role]);

//       userData.address = data.address;
//       userData.phone = data.phone;
//       userData.location = {
//         type: "Point",
//         coordinates: [coordinates.latitude, coordinates.longitude],
//       };
//     }
//     console.log("This Is The USERDATE", userData.location);
//     dispatch(registerUser(userData));
//     navigate('/login');
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     setApiError(null); // Clear error when user edits
//   };

//   const validateForm = () => {
//     if (formData.password !== formData.confirmPassword) {
//       return "Les mots de passe ne correspondent pas.";
//     }
    
//     if (formData.role === "pharmacy") {
//       if (!formData.address || !formData.phone || !formData.licenseNumber) {
//         return "Tous les champs sont obligatoires pour une pharmacie.";
//       }
//       if (!coordinates) {
//         return "La localisation est requise pour une pharmacie.";
//       }
//     }
    
//     return null;
//   };

  
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);
//   setApiError(null);

//   const validationError = validateForm();
//   if (validationError) {
//     setApiError(validationError);
//     setIsSubmitting(false);
//     return;
//   }

//   try {
//     // Prepare payload - remove pharmacy-specific fields for customers
//     const payload = {
//       name: formData.name,
//       email: formData.email,
//       password: formData.password,
//       role: formData.role
//     };

//     // Only include pharmacy fields if role is pharmacy
//     if (formData.role === "pharmacy") {
//       payload.address = formData.address;
//       payload.phone = formData.phone;
//       payload.licenseNumber = formData.licenseNumber;
//       payload.location = coordinates;
//     }

//     const response = await fetch("http://localhost:3000/api/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(payload),
//     });

//     // Handle non-JSON responses
//     const contentType = response.headers.get("content-type");
//     if (!contentType || !contentType.includes("application/json")) {
//       const text = await response.text();
//       throw new Error(text || "Server returned non-JSON response");
//     }

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || "Registration failed");
//     }

//     alert("Inscription réussie !");
//     navigate("/login");
//   } catch (error) {
//     console.error("Registration error:", error);
//     setApiError(error.message || "Une erreur est survenue lors de l'inscription");
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   return (
//     <form onSubmit={handleSubmit} className="w-[470px] p-6 bg-white rounded-xl shadow-md max-[520px]:w-[320px]">
//       <h2 className="text-2xl font-semibold text-center mb-6 text-emerald-600">
//         Créer un compte
//       </h2>

//       {/* Error Message */}
//       {apiError && (
//         <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
//           {apiError}
//         </div>
//       )}

//       {/* Role Selection */}
//       <div className="flex justify-center gap-10 mb-6 text-sm">
//         <label className="flex items-center gap-1 cursor-pointer">
//           <input
//             type="radio"
//             name="role"
//             value="customer"
//             checked={formData.role === "customer"}
//             onChange={handleChange}
//             className="cursor-pointer"
//           />
//           Client
//         </label>
//         <label className="flex items-center gap-1 cursor-pointer">
//           <input
//             type="radio"
//             name="role"
//             value="pharmacy"
//             checked={formData.role === "pharmacy"}
//             onChange={handleChange}
//             className="cursor-pointer"
//           />
//           Pharmacie
//         </label>
//       </div>

//       {/* Pharmacy Fields */}
//       {formData.role === "pharmacy" && (
//         <>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="address"
//               value={formData.address}
//               onChange={handleChange}
//               placeholder="Adresse complète"
//               className="w-full border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Numéro de téléphone"
//               className="w-full border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4">
//             <input
//               type="text"
//               name="licenseNumber"
//               value={formData.licenseNumber}
//               onChange={handleChange}
//               placeholder="Numéro de licence"
//               className="w-full border border-gray-300 p-2 rounded"
//               required
//             />
//           </div>
//           <div className="mb-4 p-2 bg-gray-50 rounded text-sm">
//             {geoError ? (
//               <span className="text-red-600">{geoError}</span>
//             ) : coordinates ? (
//               <span className="text-green-600">
//                 Position enregistrée: {coordinates.coordinates[1].toFixed(4)}, {coordinates.coordinates[0].toFixed(4)}
//               </span>
//             ) : (
//               <span className="text-blue-600">En attente de localisation...</span>
//             )}
//           </div>
//         </>
//       )}

//       {/* Common Fields */}
//       <div className="mb-4">
//         <input
//           type="text"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           placeholder="Nom complet"
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="email"
//           name="email"
//           value={formData.email}
//           onChange={handleChange}
//           placeholder="Adresse email"
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//         />
//       </div>
//       <div className="mb-4">
//         <input
//           type="password"
//           name="password"
//           value={formData.password}
//           onChange={handleChange}
//           placeholder="Mot de passe"
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//           minLength={6}
//         />
//       </div>
//       <div className="mb-6">
//         <input
//           type="password"
//           name="confirmPassword"
//           value={formData.confirmPassword}
//           onChange={handleChange}
//           placeholder="Confirmer le mot de passe"
//           className="w-full border border-gray-300 p-2 rounded"
//           required
//           minLength={6}
//         />
//       </div>

//       <button
//         type="submit"
//         className={`w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition ${
//           isSubmitting ? "opacity-70 cursor-not-allowed" : ""
//         }`}
//         disabled={isSubmitting}
//       >
//         {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
//       </button>
//     </form>
//   );
// };

// export default Form;









import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../../store/authThunk/authThunk";

const Form = () => {
  const [formData, setFormData] = useState({
    role: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    phone: "",
    licenseNumber: ""
  });

  const [geoError, setGeoError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      if (formData.role === "pharmacy") {
        setGeoError(null);
        
        if (!navigator.geolocation) {
          setGeoError("La géolocalisation n'est pas supportée par votre navigateur");
          return;
        }

        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
              resolve,
              reject,
              {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0
              }
            );
          });
          
          setCoordinates({
            type: "Point",
            coordinates: [
              position.coords.longitude,
              position.coords.latitude
            ]
          });
        } catch (error) {
          console.error("Geolocation error:", error);
          setGeoError(getFriendlyGeoError(error.code));
        }
      }
    };

    getLocation();
  }, [formData.role]);

  const getFriendlyGeoError = (code) => {
    switch(code) {
      case 1:
        return "Permission de géolocalisation refusée. Veuillez autoriser l'accès.";
      case 2:
        return "Position indisponible. Vérifiez votre connexion.";
      case 3:
        return "Délai de requête dépassé. Réessayez.";
      default:
        return "Erreur de géolocalisation. Réessayez plus tard.";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setApiError(null);
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      return "Les mots de passe ne correspondent pas.";
    }
    
    if (formData.role === "pharmacy") {
      if (!formData.address || !formData.phone || !formData.licenseNumber) {
        return "Tous les champs sont obligatoires pour une pharmacie.";
      }
      if (!coordinates) {
        return "La localisation est requise pour une pharmacie.";
      }
    }
    
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setApiError(null);

    const validationError = validateForm();
    if (validationError) {
      setApiError(validationError);
      setIsSubmitting(false);
      return;
    }

    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      if (formData.role === "pharmacy") {
        userData.address = formData.address;
        userData.phone = formData.phone;
        userData.licenseNumber = formData.licenseNumber;
        userData.location = coordinates;
      }

      // Dispatch the registerUser thunk action
      const result = await dispatch(registerUser(userData)).unwrap();
      
      if (result.success) {
        navigate('/login');
      } else {
        setApiError(result.message || "Erreur lors de l'inscription");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setApiError(error.message || "Une erreur est survenue lors de l'inscription");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-[470px] p-6 bg-white rounded-xl shadow-md max-[520px]:w-[320px]">
      <h2 className="text-2xl font-semibold text-center mb-6 text-emerald-600">
        Créer un compte
      </h2>

      {apiError && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded text-sm">
          {apiError}
        </div>
      )}

      <div className="flex justify-center gap-10 mb-6 text-sm">
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="customer"
            checked={formData.role === "customer"}
            onChange={handleChange}
            className="cursor-pointer"
          />
          Client
        </label>
        <label className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="role"
            value="pharmacy"
            checked={formData.role === "pharmacy"}
            onChange={handleChange}
            className="cursor-pointer"
          />
          Pharmacie
        </label>
      </div>

      {formData.role === "pharmacy" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse complète"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Numéro de téléphone"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleChange}
              placeholder="Numéro de licence"
              className="w-full border border-gray-300 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4 p-2 bg-gray-50 rounded text-sm">
            {geoError ? (
              <span className="text-red-600">{geoError}</span>
            ) : coordinates ? (
              <span className="text-green-600">
                Position enregistrée: {coordinates.coordinates[1].toFixed(4)}, {coordinates.coordinates[0].toFixed(4)}
              </span>
            ) : (
              <span className="text-blue-600">En attente de localisation...</span>
            )}
          </div>
        </>
      )}

      <div className="mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
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
          value={formData.email}
          onChange={handleChange}
          placeholder="Adresse email"
          className="w-full border border-gray-300 p-2 rounded"
          required
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mot de passe"
          className="w-full border border-gray-300 p-2 rounded"
          required
          minLength={6}
        />
      </div>
      <div className="mb-6">
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmer le mot de passe"
          className="w-full border border-gray-300 p-2 rounded"
          required
          minLength={6}
        />
      </div>

      <button
        type="submit"
        className={`w-full bg-emerald-500 text-white py-2 rounded hover:bg-emerald-600 transition ${
          isSubmitting ? "opacity-70 cursor-not-allowed" : ""
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Inscription en cours..." : "S'inscrire"}
      </button>
    </form>
  );
};

export default Form;