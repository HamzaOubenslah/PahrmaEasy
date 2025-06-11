import React from "react";
import { HomeCards } from "../../../constants/Home";
import { motion } from "framer-motion";
import Card from "../components/card";

const Section3 = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3, // 40ms delay between each card
      }
    }
  };

  const cardVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5
      }
    }
  };

  const textVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#F9FCFF] w-full pb-[99px] max-[820px]:pb-[30px] overflow-x-hidden">
      <motion.div 
        className="w-[1140px] flex flex-col justify-center items-center bg-[#F9FCFF] max-[1250px]:w-[768px] max-[820px]:w-[320px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        <motion.div 
          className="flex flex-col justify-center items-center gap-[16px] pb-[74px] max-[820px]:pb-[30px]"
          variants={textVariants}
        >
          <motion.p 
            className="font-jakarta font-bold text-[50px] text-[#234A6B] max-[820px]:text-[30px] max-[820px]:text-center"
            variants={textVariants}
          >
            Nos fonctionnalités principales
          </motion.p>
          <motion.p 
            className="font-inter text-[16px] text-[#000000] max-[820px]:text-center"
            variants={textVariants}
          >
            PharmaEasy offre une suite complète d'outils pour améliorer
            l'expérience pharmaceutique à tous les niveaux
          </motion.p>
        </motion.div>

        <motion.div 
          className="flex justify-center items-center flex-wrap gap-[80px] max-[820px]:gap-[30px]"
          variants={containerVariants}
        >
          {HomeCards.map((c, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              custom={i}
            >
              <Card
                className="bg-white shadow-md"
                i={i}
                icon={c.icon}
                title={c.title}
                description={c.description}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Section3;