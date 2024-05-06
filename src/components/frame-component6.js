const FrameComponent6 = () => {
  return (
    <div className="self-stretch flex flex-row items-start justify-center max-w-full text-left text-[1.25rem] text-text2 font-body-small mq900:gap-[1.5rem]">
      <div className="flex-1 flex flex-col items-start justify-start gap-[0.5rem] max-w-full">
        <div className="self-stretch relative leading-[2rem] font-medium mq450:text-[1rem] mq450:leading-[1.625rem]">
          Countries you’re traveling to
        </div>
        <div className="self-stretch rounded-3xl bg-white box-border overflow-hidden flex flex-row items-center justify-between py-[0.875rem] px-[1.5rem] max-w-full gap-[1.25rem] border-[1px] border-solid border-text4 mq900:flex-wrap">
          <div className="w-[25.375rem] flex flex-row items-start justify-start gap-[1rem] max-w-full mq450:flex-wrap">
            <button className="cursor-pointer [border:none] py-[0.5rem] px-[1rem] bg-text5 flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-2xl overflow-hidden flex flex-row items-center justify-start box-border gap-[0.5rem] min-w-[10.375rem] whitespace-nowrap hover:bg-lightgray">
              <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text1 text-left">
                Unite States America
              </div>
              <img
                className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
                alt=""
                src="/fix.svg"
              />
            </button>
            <button className="cursor-pointer [border:none] py-[0.5rem] px-[1rem] bg-text5 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-2xl overflow-hidden flex flex-row items-center justify-start gap-[0.5rem] hover:bg-lightgray">
              <div className="relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text1 text-left inline-block min-w-[4.438rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                Canada
              </div>
              <img
                className="h-[1.5rem] w-[1.5rem] relative overflow-hidden shrink-0"
                alt=""
                src="/fix.svg"
              />
            </button>
          </div>
          <img
            className="h-[2rem] w-[2rem] relative"
            loading="lazy"
            alt=""
            src="/iconsarrow-drop-down-24px.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default FrameComponent6;
