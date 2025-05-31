const Card = ({ i, icon, title, description, className }) => {
  return (
    <div
      className={`flex flex-col justify-center items-center gap-[26px] px-[17px] py-[41px] rounded-[26px] bg-[#FFFFFF] hover:bg-[#39DB74] hover:text-[#FFFFFF] ${className}`}
    >
      <div
        key={i}
        className="flex flex-col justify-center items-center w-[287px] h-[327px]"
      >
        <div className="flex justify-center items-center p-[33px] bg-[#ECF6FF] rounded-[27px]">
          {icon}
        </div>
        <div className="flex justify-center items-center">
          <p className="font-jakarta font-bold text-[21px] text-center hover:text-[#FFFFFF]">
            {title}
          </p>
        </div>
        <div className="flex justify-center items-center">
          <p className="font-jakarta text-[16px] text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;
