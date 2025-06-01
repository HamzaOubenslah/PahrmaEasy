import { FaArrowRight } from "react-icons/fa6";


const Section1 = () => {
  return (
    <div className='flex flex-row justify-center items-center gap-[134px] w-[1187px]'>
        <div className='flex flex-col justify-center items-center gap-[27px] w-[528px]'>
            <p className='font-jakarta font-bold text-[56.8px] text-[#234A6B]'>Simplifiez l'accès aux médicaments avec <span className="text-[#39DB74]"> PharmaEasy</span></p>
            <p className='font-inter text-[16px]'>La plateforme digitale qui transforme l'expérience pharmaceutique pour les patients, les pharmaciens et les administrateurs.</p>
            <div className="w-full flex flex-row justify-start gap-[22px]">
              <button className="px-[40px] py-[16px] flex flex-row justify-center items-center gap-[18px] w-[191px] bg-[#39DB74] rounded-[8px]">
                <p className="font-inter text-[#FFFFFF] text-[16px]">Découvrir </p>
                <FaArrowRight style={{width:"20px",height:"20px",color:"#FFFFFF"}}/>
              </button>
              <button className="w-[191px] px-[40px] py-[16px] bg-transparent border-[1px] border-[#39DB74] rounded-[8px] text-[#39DB74]">En savoir plus</button>
            </div>
        </div>
        <div className=''>
            <img src="../../../Home/Beautiful young female doctor looking at camera in the office. (1).svg" className="w-[554.77px] h-[614.71px]" alt="" />
        </div>
    </div>
  )
}

export default Section1;