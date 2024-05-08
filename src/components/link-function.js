import { useMemo } from "react";

const LinkFunction = ({
  reliability,
  trustOurExperienceAndSecu,
  propMinWidth,
  propWidth,
}) => {
  const reliabilityStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
      width: propWidth,
    };
  }, [propMinWidth, propWidth]);

  return (
    <div className="w-[21%] rounded-3xl bg-white shadow-[0px_6px_24px_-6px_rgba(34,_46,_106,_0.15)] overflow-hidden shrink-0 flex flex-col items-center justify-center py-12 px-6 box-border gap-[24px] max-w-full text-left text-5xl text-secondary font-body-small">
      <img
        className="w-[100px] h-[100px] relative overflow-hidden shrink-0"
        loading="lazy"
        alt=""
        src="/reliable.svg"
      />
      <div className="self-stretch flex flex-col items-center justify-center gap-[8px]">
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
