import countryData from "../../country.json";
import { useState } from "react";
const CurrencyCard = ({ rate }) => {
 const [Img, setImg] = useState("")
 
  const image = countryData.find((country) => country.code === rate.currency);




  return (
    <div  className="h-[9rem] snap-center shadow-[1px_1px_2px_rgba(248,_248,_248,_0.05)_inset,_0px_8px_24px_rgba(19,_26,_60,_0.15)] rounded-2xl bg-gray-200 overflow-hidden flex flex-col items-center justify-center py-[1rem] px-[1.5rem] box-border gap-[1rem] min-w-[12rem] tablet:min-w-[14rem]  text-left text-[1.5rem] text-white ">
      <div className="flex flex-row items-center justify-start py-[0rem] pr-[2rem] pl-[0rem] gap-[1rem]">
        <img
          className="h-[1.25rem] w-[1.75rem] relative object-cover"
          alt=""
            src={image?.flag}
        />
        <div className="relative leading-[2rem] font-semibold inline-block min-w-[6.375rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
          {rate?.currency && rate?.currency}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center justify-center gap-[0.5rem] text-[1.25rem] text-text5 font-body-small">
        <div className="self-stretch flex flex-row items-center justify-between gap-[1rem]">
          <div className="relative leading-[2rem] font-medium inline-block min-w-[2rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
            Buy
          </div>
          <div className="relative text-[1.5rem] leading-[2rem] font-semibold  text-success inline-block min-w-[3.875rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
            {rate?.currency && ((1/rate.rate) + 1).toFixed(2)}
          </div>
        </div>
        <div className="self-stretch flex flex-row items-center justify-between gap-[1.25rem]">
          <div className="relative leading-[2rem] font-medium inline-block min-w-[2rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
            Sell
          </div>
          <div className="relative text-[1.5rem] leading-[2rem] font-semibold  text-error inline-block min-w-[3.875rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
            {rate?.currency && ((1/rate.rate) - 1).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyCard;
