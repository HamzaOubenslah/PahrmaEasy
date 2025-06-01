import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Sample testimonials data (replace with your actual data)
const testimonials = [
  {
    id: 1,
    avis: "PharmaEasy a révolutionné ma façon de gérer mes médicaments. Très simple à utiliser et extrêmement utile au quotidien.",
    acronyme: "JD",
    name: "Jean Dupont",
    role: "Patient"
  },
  {
    id: 2,
    avis: "En tant que pharmacien, cette application m'a fait gagner un temps précieux dans la gestion de mon inventaire.",
    acronyme: "MS",
    name: "Marie Simon",
    role: "Pharmacienne"
  },
  {
    id: 3,
    avis: "La livraison à domicile est un vrai plus pour les personnes à mobilité réduite comme moi. Service impeccable!",
    acronyme: "PL",
    name: "Pierre Lambert",
    role: "Client régulier"
  },
  {
    id: 4,
    avis: "Les rappels de médicaments m'ont beaucoup aidé à suivre mon traitement correctement. Je recommande!",
    acronyme: "AC",
    name: "Amélie Cartier",
    role: "Patient chronique"
  },
  {
    id: 5,
    avis: "Interface très intuitive et fonctionnalités complètes. Parfait pour les professionnels de santé.",
    acronyme: "TR",
    name: "Thomas Rousseau",
    role: "Médecin"
  }
];

const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const nextTestimonial = () => {
    setDirection("right");
    setCurrentIndex((prevIndex) => 
      prevIndex + 1 > testimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setDirection("left");
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 3 : prevIndex - 1
    );
  };

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + 3);

  return (
    <div className="w-full max-w-[1120px] mx-auto flex flex-col justify-center items-center py-[80px] px-4 max-[1250px]:w-[768px] max-[820px]:w-[320px]">
      {/* Header Section */}
      <div className="flex flex-col justify-center items-center gap-5 w-full max-w-[711px] mb-10 text-center">
        <h2 className="font-bold text-3xl md:text-[40px] font-jakarta">
          Découvrez l'avis de nos utilisateurs
        </h2>
        <p className="text-base font-inter text-gray-600">
          La satisfaction de nos utilisateurs est notre priorité. Voici quelques
          témoignages de personnes qui font confiance à PharmaEasy au quotidien.
        </p>
      </div>

      {/* Testimonial Slider */}
      <div className="w-full flex flex-col items-center gap-[36px]">
        <div className="relative w-full h-[250px] flex justify-center overflow-hidden">
          <div className="flex justify-center items-start w-full">
            <AnimatePresence custom={direction} initial={false}>
              {visibleTestimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  custom={direction}
                  initial={{ 
                    x: direction === "right" ? 600 : -600,
                    opacity: 0,
                    scale: 0.9
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 1.5,
                      ease: [0.16, 0.77, 0.47, 0.97],
                      delay: index * 0.25
                    }
                  }}
                  exit={{
                    x: direction === "right" ? -600 : 600,
                    opacity: 0,
                    scale: 0.9,
                    transition: {
                      duration: 1.5,
                      ease: [0.16, 0.77, 0.47, 0.97]
                    }
                  }}
                  className="absolute w-[90%] max-w-[350px] h-[250px] bg-white rounded-2xl shadow-lg flex flex-col gap-6 p-8 mx-4"
                  style={{
                    left: `${index * 380}px`
                  }}
                >
                  <p className="font-inter text-sm md:text-base italic text-gray-700">
                    "{testimonial.avis}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="rounded-full w-10 h-10 flex-shrink-0 bg-emerald-500 flex items-center justify-center">
                      <span className="font-semibold text-white text-sm">
                        {testimonial.acronyme}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm md:text-base">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-8">
          <button
            onClick={prevTestimonial}
            className="rounded-full w-12 h-12 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center text-white shadow-md hover:shadow-lg"
            aria-label="Previous testimonial"
          >
            <FaArrowLeft className="text-lg" />
          </button>
          <button
            onClick={nextTestimonial}
            className="rounded-full w-12 h-12 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center text-white shadow-md hover:shadow-lg"
            aria-label="Next testimonial"
          >
            <FaArrowRight className="text-lg" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSlider;