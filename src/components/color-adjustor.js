const ColorAdjustor = ({ unsplash3PyBkxgTiL0, welcomeToWorldOneForexBlo }) => {
  return (
    <div className="w-[528px] rounded-13xl bg-darkslateblue-500 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden shrink-0 flex flex-col items-start justify-start py-9 px-8 box-border relative gap-[48px] text-left text-xl text-text5 font-body-small mq825:pt-[23px] mq825:pb-[23px] mq825:box-border">
      <div className="w-[634.5px] h-[302.8px] absolute !m-[0] top-[-57px] left-[-204px] rounded-[50%] bg-steelblue-100 [filter:blur(200px)]" />
      <img
        className="self-stretch h-[290px] relative rounded-3xl max-w-full overflow-hidden shrink-0 object-cover z-[1]"
        loading="lazy"
        alt=""
        src={unsplash3PyBkxgTiL0}
      />
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
        <div className="self-stretch flex flex-row items-start justify-start gap-[15.5px] mq450:flex-wrap">
          <div className="relative leading-[24px] inline-block min-w-[50px] mq450:text-base mq450:leading-[19px]">{`Delhi `}</div>
          <img
            className="h-6 w-px relative min-h-[24px]"
            loading="lazy"
            alt=""
            src="/vector-14.svg"
          />
          <div className="w-[185px] relative leading-[24px] inline-block mq450:text-base mq450:leading-[19px]">
            25 December, 2021
          </div>
        </div>
        <div className="self-stretch relative text-9xl leading-[36px] text-white mq450:text-3xl mq450:leading-[29px]">
          {welcomeToWorldOneForexBlo}
        </div>
        <div className="self-stretch relative leading-[24px] mq450:text-base mq450:leading-[19px]">
          Welcome to Worldone Forex Blog, where you can find the latest news and
          analysis on forex trading.
        </div>
      </div>
      <button className="cursor-pointer [border:none] py-3 px-5 bg-white self-stretch rounded-2xl overflow-hidden flex flex-row items-start justify-center gap-[6px]">
        <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0">
          <div className="relative text-9xl leading-[32px] font-semibold font-lato text-text1 text-left mq450:text-3xl mq450:leading-[26px]">
            Read More
          </div>
        </div>
        <img
          className="h-12 w-12 relative overflow-hidden shrink-0 object-cover"
          alt=""
          src="/eiarrowright-8@2x.png"
        />
      </button>
    </div>
  );
};

export default ColorAdjustor;
