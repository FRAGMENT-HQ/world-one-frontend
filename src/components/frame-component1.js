import { useMemo } from "react";

const FrameComponent1 = ({
  flagsUS,
  uSDollar,
  propGap,
  propMinWidth,
  propPadding,
  propPadding1,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      gap: propGap,
    };
  }, [propGap]);

  const uSDollarStyle = useMemo(() => {
    return {
      minWidth: propMinWidth,
    };
  }, [propMinWidth]);

  const frameDiv1Style = useMemo(() => {
    return {
      padding: propPadding,
    };
  }, [propPadding]);

  const dataAggregatorStyle = useMemo(() => {
    return {
      padding: propPadding1,
    };
  }, [propPadding1]);

  return (
    <div className="flex-1 rounded-2xl bg-gray-200 shadow-[1px_1px_2px_rgba(248,_248,_248,_0.05)_inset,_0px_8px_24px_rgba(19,_26,_60,_0.15)] overflow-hidden flex flex-col items-center justify-center py-4 px-6 box-border gap-[16px] min-w-[229px] max-w-[233px] text-left text-5xl text-white ">
      <div
        className="h-8 flex flex-row items-center justify-start py-0 pr-[39.3px] pl-0 box-border gap-[16px]"
        style={frameDivStyle}
      >
        <img className="h-5 w-7 relative object-cover" alt="" src={flagsUS} />
        <div
          className="relative leading-[32px] font-semibold inline-block min-w-[102px] mq450:text-lgi mq450:leading-[26px]"
          style={uSDollarStyle}
        >
          {uSDollar}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-center justify-center gap-[8px] text-xl text-text5 font-body-small">
        <div
          className="self-stretch flex flex-row items-center justify-between gap-[20px]"
          style={frameDiv1Style}
        >
          <div className="relative leading-[32px] font-medium inline-block min-w-[35px] mq450:text-base mq450:leading-[26px]">
            Buy
          </div>
          <div className="relative text-5xl leading-[32px] font-semibold  text-success inline-block min-w-[62px] mq450:text-lgi mq450:leading-[26px]">
            83.17
          </div>
        </div>
        <div
          className="self-stretch flex flex-row items-center justify-between gap-[20px]"
          style={dataAggregatorStyle}
        >
          <div className="relative leading-[32px] font-medium inline-block min-w-[34px] mq450:text-base mq450:leading-[26px]">
            Sell
          </div>
          <div className="relative text-5xl leading-[32px] font-semibold  text-error inline-block min-w-[62px] mq450:text-lgi mq450:leading-[26px]">
            82.98
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent1;
