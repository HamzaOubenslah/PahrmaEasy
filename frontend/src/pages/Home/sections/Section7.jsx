import { CiMail } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";


const Section7 = () => {
  return (
    <div className="flex flex-col justify-center items-center w-[1150px] gap-[65px] py-[63px] max-[1250px]:w-[768px] max-[820px]:w-[320px]">
      <div className="flex flex-col justify-center items-center">
        <p className="font-jakarta font-bold text-[40px] text-[#234A6B] max-[820px]:text-[30px] max-[820px]:text-center">
          Contactez-nous
        </p>
        <p className="font-inter text-[16px] max-[820px]:text-center">
          Notre équipe est à votre écoute pour répondre à toutes vos questions
          et vous accompagner dans l'utilisation de PharmaEasy.
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-[65px] max-[1250px]:flex-col max-[1250px]:gap-[20px] max-[820px]:gap-[10px]">
        <form
          className="py-[39px] px-[44px] flex flex-col justify-center items-center gap-[18px] w-[455px] bg-[#FFFFFF] rounded-[8px] max-[820px]:w-[320px]"
          action=""
        >
          <div className="flex flex-col justify-center items-start gap-[17px]">
            <label htmlFor="">Mot de passe actuel</label>
            <input
              type="text"
              className="border-[#D5D5D5] border-[1px] w-[377px] h-[49px] rounded-[10px] max-[820px]:w-[275px]"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-[17px]">
            <label htmlFor="">Nouveau mot de passe</label>
            <input
              type="text"
              className="border-[#D5D5D5] border-[1px] w-[377px] h-[49px] rounded-[10px] max-[820px]:w-[275px]"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-[17px]">
            <label htmlFor="">Confirmer le nouveau mot de passe</label>
            <textarea
              type="text"
              className="border-[#D5D5D5] border-[1px] w-[377px] h-[92px] rounded-[10px] max-[820px]:w-[275px]"
            ></textarea>
          </div>
          <button className="w-[377px] h-[49px] flex justify-center items-center bg-[#39DB74] font-roboto font-medium text-[#FFFFFF] text-[12px] border-0 rounded-[10px] max-[820px]:w-[275px]">
            Envoyer le messge
          </button>
        </form>
        <div className="flex flex-col gap-[24px]">
          <div className="flex flex-row items-center gap-[27px] rounded-[10px] w-[550px] max-[1250px]:w-[455px] max-[820px]:w-[320px] h-[92px] bg-[#FFFFFF] pl-[27px]">
            <div className="rounded-[50%] w-[51.82px] h-[51.74px] bg-[#ECF6FF] flex justify-center items-center">
              <CiMail style={{width:"24px",height:"24px",color:"#39DB74"}}/>
            </div>
            <div className="">
              <p className="font-roboto text-[20px] text-[#000000] max-[820px]:text-[15px]">Email</p>
              <p className="font-roboto text-[20px] text-[#757474] max-[820px]:text-[12px]">
                contact@pharmaeasy.fr
              </p>
            </div>
          </div>
          <div className="flex flex-row items-center gap-[27px] w-[550px] max-[1250px]:w-[455px] max-[820px]:w-[320px] rounded-[10px] h-[92px] bg-[#FFFFFF] pl-[27px]">
            <div className="rounded-[50%] w-[51.82px] h-[51.74px] bg-[#ECF6FF] flex justify-center items-center">
              <BsTelephone style={{width:"24px",height:"24px",color:"#39DB74"}}/>
            </div>
            <div className="">
              <p className="font-roboto text-[20px] text-[#000000] max-[820px]:text-[15px]">Téléphone</p>
              <p className="font-roboto text-[20px] text-[#757474] max-[820px]:text-[12px]">
                +212 73635454
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section7;
