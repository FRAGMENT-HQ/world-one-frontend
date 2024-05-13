import { useMemo } from "react";

const LinkFunction = ({
  reliability,
  trustOurExperienceAndSecu,
  propMinWidth,
  propWidth,
  imgSrc
}) => {
  const reliabilityStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
      width: propWidth,
    };
  }, [propMinWidth, propWidth]);

  return (
    <div style={{ backgroundImage:`"${imgSrc}"` }} className="w-[21%] h-80 rounded-3xl bg-white shadow-[0px_6px_24px_-6px_rgba(34,_46,_106,_0.15)] overflow-hidden shrink-0 flex flex-col items-center justify-center  box-border  max-w-full text-left text-5xl text-secondary font-body-small">
      
        
      

      <div className="self-stretch w-full h-full  flex flex-col items-center justify-center gap-[8px]">
        <div
          className="relative leading-[36px] font-medium inline-block min-w-[108px] mq450:text-lgi mq450:leading-[29px]"
          style={reliabilityStyle}
        >
          {reliability}
        </div>
        <div className="self-stretch relative text-xl leading-[24px] text-black text-center mq450:text-base mq450:leading-[19px]">
          {trustOurExperienceAndSecu}
        </div>
      </div>
    </div>
  );
};

export default LinkFunction;
