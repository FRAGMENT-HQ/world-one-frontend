const FrameComponent = ({ currency, exchangeCurrency, onClick,content="" }) => {
  return (
    <div className="tablet:w-[46%] w-auto tablet:min-w-[635px] min-w-[50vw] flex-1 tablet:flex-0 mb-8 rounded-13xl bg-darkslateblue-400 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-row items-start justify-start py-8 px-8 tablet:px-16 box-border gap-[5%] max-w-full text-left text-13xl text-text5 font-lato mq825:flex-wrap">
      <div className="flex flex-col items-start justify-start pt-[30px] px-0 pb-0 box-border">
        <img
          className=" tablet:w-32 tablet:h-32 w-[20vw] h-[20vw] tablet:w-30 tablet:h-30 relative overflow-hidden shrink-0"
          loading="lazy"
          alt=""
          src={currency}
        />
      </div>
      <div className="flex-1 flex flex-col items-start justify-start gap-[32px] max-w-full">
        <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
          <b className="relative text-[85%] font-semibold">
            {exchangeCurrency}
          </b>
          <div className="self-stretch relative text-base mq450:text-base mq450:leading-[22px]">{content}</div>
        </div>
        <div
          onClick={onClick}
          className=" cursor-pointer h-12 rounded-xl bg-white overflow-hidden shrink-0 flex flex-row items-start justify-start py-2 px-[37.5px] box-border gap-[6px] text-5xl text-text1"
        >
          <div className="relative  leading-[32px] font-semibold inline-block min-w-[82px] mq450:text-lgi mq450:leading-[26px]">
            Explore
          </div>
          <img
            className="h-8 w-8 relative overflow-hidden shrink-0 object-cover min-h-[32px]"
            alt=""
            src="/eiarrowright@2x.png"
          />
        </div>
      </div>
      {/* <div
        className="h-[334px] w-[528.3px] absolute !m-[0] right-[-47.3px] bottom-[-194.66px] rounded-[50%] bg-lightblue [filter:blur(250px)] [transform:_rotate(-12deg)] [transform-origin:0_0] z-[1]"
       
      /> */}
    </div>
  );
};

export default FrameComponent;
