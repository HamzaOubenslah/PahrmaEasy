import { motion } from "framer-motion";

const Section2 = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.6,
        delayChildren: 0.4
      }
    }
  };

  const imageVariants = {
    hidden: { x: -100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 1.4
      }
    }
  };

  const textVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        duration: 1.4,
        delay: 0.3
      }
    }
  };

  const buttonVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: 1,
        delay: 0.8
      }
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] overflow-x-hidden"> {/* Add this wrapper */}
      <motion.div 
        className="flex justify-center items-center bg-[#FFFFFF] w-full pt-[114px] max-[820px]:pt-[50px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        <div className="flex flex-row justify-center items-center gap-[150px] w-full max-w-[1187px] px-4 pb-[99px] max-[1250px]:max-w-[768px] max-[1250px]:flex-col max-[1250px]:gap-[75px] max-[820px]:max-w-[320px] max-[820px]:gap-[30px] max-[820px]:pb-[30px]">
          <motion.div 
            className="flex justify-center items-center"
            variants={imageVariants}
          >
            <motion.img
              src="../../../Home/image 1.svg"
              className="w-full max-w-[547px] h-auto max-h-[422px] max-[820px]:max-w-full"  
              alt="Pharmacy illustration"
              variants={imageVariants}
            />
          </motion.div>
          
          <motion.div 
            className="flex flex-col justify-start items-start w-full max-w-[490px] max-[820px]:max-w-[320px]"
            variants={textVariants}
          >
            <motion.p 
              className="font-inter font-semibold text-[#39DB74] text-[36px] mb-[6px] max-[820px]:text-[25px]"
              variants={textVariants}
            >
              About Us
            </motion.p>
            <motion.p 
              className="font-jakarta font-bold text-[25px] text-[#234A6B] mb-[21px] max-[820px]:text-[15px]"
              variants={textVariants}
            >
              PharmaEasy est une plateforme digitale conçue pour transformer la
              manière dont les patients, pharmaciens et administrateurs
              interagissent avec le monde pharmaceutique.
            </motion.p>
            <motion.p 
              className="font-inter text-[16px] max-[820px]:text-[12px]"
              variants={textVariants}
            >
              Notre objectif est de rendre l'accès aux médicaments plus simple,
              rapide et fiable, tout en offrant aux professionnels de santé des
              outils modernes pour gérer efficacement leur activité.
            </motion.p>
            
            <motion.div 
              className="w-full flex justify-start py-[30px]"
              variants={buttonVariants}
            >
              <motion.button 
                className="flex justify-center items-center border-0 bg-[#39DB74] text-[#FFFFFF] w-[145px] h-[47px] rounded-[8px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                variants={buttonVariants}
              >
                Contact Us
              </motion.button>  
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Section2;