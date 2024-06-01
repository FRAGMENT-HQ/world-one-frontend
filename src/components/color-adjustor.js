const ColorAdjustor = ({ onClick , unsplash3PyBkxgTiL0, welcomeToWorldOneForexBlo }) => {
  return (
    <div className=" min-w-0 w-[100%] sm:w-[30%] sm:min-w-[360px] rounded-13xl bg-darkslateblue-500 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden shrink-0 flex flex-col items-start justify-start py-9 px-4 tablet:px-8 box-border relative gap-[36px] text-left text-xl text-text5 font-body-small mq825:pt-[23px] mq825:pb-[23px] mq825:box-border">
      <div className=" w-[98%]  sm:w-[95%] laptop:w-[90%] absolute !m-[0] top-[-57px] left-[-204px] rounded-[50%] bg-steelblue-100 [filter:blur(200px)]" />
      <img
        className="self-stretch  h-[120%] relative rounded-3xl max-w-full overflow-hidden shrink-0 object-cover z-[1]"
        loading="lazy"
        alt=""
        src={unsplash3PyBkxgTiL0}
      />
      <div className="self-stretch flex  flex-col items-start justify-start gap-[16px]">
        <div className="self-stretch flex flex-row items-start justify-start gap-[15.5px] mq450:flex-wrap">
          <div className="relative leading-[24px] inline-block min-w-[50px] c">{`Delhi `}</div>
          <img
            className="h-6 w-px relative min-h-[24px]"
            loading="lazy"
            alt=""
            src="/vector-14.svg"
          />
          <div className="w-[185px] text-xl inline-block ">
            {/* 25 December, 2021 */}
          </div>
        </div>
        <div className="self-stretch relative text-[100%]  text-white">
          {welcomeToWorldOneForexBlo}
        </div>
        <div className="self-stretch relative text-base leading-[24px]">
          Welcome to World One Forex Blog, where you can find the latest news and
          analysis on forex trading.
        </div>
      </div>
      <button onClick={onClick} className="cursor-pointer  [border:none] py-2 px-5 bg-white self-stretch rounded-2xl overflow-hidden flex flex-row items-center justify-center gap-[6px]">
        <div className="flex flex-col items-center align-middle justify-center pt-2 px-0 pb-0">
          <div className="relative text-3xl align-middle font-semibold  text-text1 text-left mq450:text-3xl mq450:leading-[26px]">
            Read More
          </div>
        </div>
        <img
          className="h-8 w-8 relative overflow-hidden shrink-0 object-cover"
          alt=""
          src="/eiarrowright-8@2x.png"
        />
      </button>
    </div>
  );
};

export default ColorAdjustor;
