import { FaArrowRight } from "react-icons/fa6";


const Section1 = () => {
  return (
   <div className='flex flex-row justify-center items-center md:gap-[70px] lg:gap-[134px] w-full max-[1250]:w-[768px] max-[1250px]:flex-col max-[1250px]:gap-[70px] max-[820px]:w-[320px] max-[820px]:gap-[35px] max-[820px]:pt-[30px]'>
        <div className='flex flex-col justify-center items-center gap-[27px] w-[528px] max-[820px]:w-[320px]'>
            <p className='font-jakarta font-bold text-[56.8px] text-[#234A6B] max-[820px]:text-[35px] max-[820px]:text-center'>Simplifiez l'accès aux médicaments avec <span className="text-[#39DB74]"> PharmaEasy</span></p>
            <p className='font-inter text-[16px] max-[820px]:text-center'>La plateforme digitale qui transforme l'expérience pharmaceutique pour les patients, les pharmaciens et les administrateurs.</p>
            <div className="w-full flex flex-row justify-start gap-[22px] max-[820px]:flex-col max-[820px]:items-center">
              <button className="px-[40px] py-[16px] flex flex-row justify-center items-center gap-[18px] w-[191px] bg-[#39DB74] rounded-[8px]">
                <p className="font-inter text-[#FFFFFF] text-[16px]">Découvrir </p>
                <FaArrowRight style={{width:"20px",height:"20px",color:"#FFFFFF"}}/>
              </button>
              <button className="w-[191px] px-[40px] py-[16px] bg-transparent border-[1px] border-[#39DB74] rounded-[8px] text-[#39DB74]">En savoir plus</button>
            </div>
        </div>
        <div className=''>
            <img src="../../../Home/Beautiful young female doctor looking at camera in the office. (1).svg" className="w-[554.77px] h-[614.71px] max-[820px]:w-[287px] max-[820px]:h-[300px]" alt="" />
        </div>
    </div>
  )
}

export default Section1;