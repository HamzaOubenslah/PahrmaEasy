import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { FaArrowRight } from "react-icons/fa6";

const Card2 = ({ title, sentences }) => {
  return (
    <div className="flex flex-col items-center gap-[30px] py-[33px] bg-white rounded-lg shadow-md w-[360px]">
      <div className="w-full pl-[29px]">
        <p className="font-inter font-medium text-[24px] text-black ">
          {title}
        </p>
      </div>

      <div className="flex flex-col gap-[20px] ">
        {sentences.map((sentence, i) => (
          <div key={i} className="flex flex-row items-center gap-[20px]">
            <IoMdCheckmarkCircleOutline className="text-[#39DB74] w-[15.53px] h-[15px]" />
            <p className="font-inter text-[16px] font-light">{sentence}</p>
          </div>
        ))}
      </div>

      <button className="bg-[#39DB74] text-white border-0 px-[30px] rounded-[8px] flex items-center gap-[60px] w-[300px] hover:bg-[#2db862] transition-colors">
        <p className="font-inter font-medium text-[20px] text-[#FFFFFF]">
          En Savoir Plus
        </p>

        <FaArrowRight
          className="text-white"
          style={{ width: "30px", height: "30px", color: "#FFFFFF" }}
        />
      </button>
    </div>
  );
};

export default Card2;
