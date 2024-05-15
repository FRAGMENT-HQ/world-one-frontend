import { useMemo } from "react";

const FrameComponent3 = ({
  travelersName,
  Placeholder,
  iconsarrowDropDown24px,
  propMinWidth,
  propWidth,
  propGap,
  value,
  setValue,
}) => {
  const frameDiv3Style = useMemo(() => {
    return {
  
    };
  }, [propMinWidth]);

  const travelersNameStyle = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const inputFieldStyle = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  return (
    <div
      className="flex-1 flex flex-col items-start justify-center gap-[0.75rem] min-w-[95%] sm:min-w-[23.125rem] max-w-full text-left text-[1.25rem] text-text2 font-body-small mq900:min-w-full mq900:flex-[unset] mq900:self-stretch"
      style={frameDiv3Style}
    >
      <div
        className="w-[8.938rem] relative leading-[2rem] font-medium inline-block mq450:text-[1rem] mq450:leading-[1.625rem]"
        style={travelersNameStyle}
      >
        {travelersName}
      </div>
      <div
        className="self-stretch rounded-lg bg-white box-border overflow-hidden flex flex-row items-center justify-center py-[0.625rem] px-[1.437rem] gap-[14.956rem] max-w-full border-[1px] border-solid border-text4 mq900:gap-[7.5rem]"
        style={inputFieldStyle}
      >
        <input
          className="w-full [border:none] [outline:none] bg-[transparent] h-[2rem] flex-1 flex flex-row items-center justify-start font-body-small font-medium text-[1.25rem] text-text3 min-w-[15.625rem] max-w-full mq900:min-w-full"
          placeholder={Placeholder}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <img
          className="h-[2rem] w-[2rem] relative hidden min-h-[2rem]"
          alt=""
          src={iconsarrowDropDown24px}
        />
      </div>
    </div>
  );
};

export default FrameComponent3;
