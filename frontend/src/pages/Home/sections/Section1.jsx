import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";

const Section1 = () => {
  // Animation variants - SLOWER VERSION
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 1.2,
        delay: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 12,
        duration: 1.2,
        delay: 0.4,
      },
    },
  };

  // Animation variants for the arrow
  const arrowAnimation = {
    y: [0, -8, 0, -4, 0, -2, 0], // Bounce up and settle
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  };

  return (
    <div className="overflow-x-hidden w-full">
      {" "}
      {/* Fix: Added overflow control */}
      <motion.div
        className="flex flex-row justify-center items-center md:gap-[70px] lg:gap-[134px] w-full max-w-[1250px] px-4 mx-auto py-[30px] max-[1250px]:flex-col max-[1250px]:gap-[70px] max-[820px]:gap-[35px]"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        viewport={{ once: true }}
      >
        <motion.div
          className="flex flex-col justify-center items-center gap-[27px] w-full max-w-[528px] max-[820px]:max-w-[320px]"
          variants={textVariants}
        >
          <motion.p
            className="font-jakarta font-bold text-[56.8px] text-[#234A6B] max-[820px]:text-[35px] text-center"
            variants={textVariants}
          >
            Simplifiez l'accès aux médicaments avec{" "}
            <span className="text-[#39DB74]">PharmaEasy</span>
          </motion.p>
          <motion.p
            className="font-inter text-[16px] text-center max-[820px]:text-[14px]"
            variants={textVariants}
          >
            La plateforme digitale qui transforme l'expérience pharmaceutique
            pour les patients, les pharmaciens et les administrateurs.
          </motion.p>
          <motion.div
            className="w-full flex flex-row justify-center gap-[22px] max-[820px]:flex-col max-[820px]:items-center"
            variants={textVariants}
          >
            <motion.button
              className="px-[40px] py-[16px] flex flex-row justify-center items-center gap-[18px] max-w-[191px] bg-[#39DB74] rounded-[8px] relative"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <p className="font-inter text-[#FFFFFF] text-[16px]">Découvrir</p>

              <motion.span
                animate={{}} // Empty initial animation
                whileHover={arrowAnimation}
                style={{ display: "inline-block" }} // Required for transform animations
              >
                <FaArrowRight
                  style={{ width: "20px", height: "20px", color: "#FFFFFF" }}
                />
              </motion.span>
            </motion.button>
            <button className="max-w-[191px] px-[40px] py-[16px] bg-transparent border-[1px] border-[#39DB74] rounded-[8px] text-[#39DB74]">
              En savoir plus
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex justify-center w-full max-w-[554px] max-[820px]:max-w-[287px]"
          variants={imageVariants}
        >
          <motion.img
            src="../../../Home/Beautiful young female doctor looking at camera in the office. (1).svg"
            className="w-full h-auto object-contain max-h-[614px] max-[820px]:max-h-[300px]"
            alt="Doctor"
            variants={imageVariants}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Section1;
