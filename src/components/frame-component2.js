const FrameComponent2 = ({ currencyYouHave }) => {
  return (
    <div className="flex-1 flex flex-col items-start justify-start gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
      <div className="self-stretch relative leading-[32px] font-medium mq450:text-base mq450:leading-[26px]">
        {currencyYouHave}
      </div>
      <div className="self-stretch rounded-lg bg-gray-100 overflow-hidden flex flex-row items-center justify-between py-3 px-6 gap-[0px] [row-gap:20px] mq825:flex-wrap">
        <div className="h-8 w-[289px] flex flex-row items-center justify-start gap-[16px]">
          <img
            className="h-8 w-8 relative overflow-hidden shrink-0 object-cover min-h-[32px]"
            alt=""
            src="/iconframe@2x.png"
          />
          <div className="flex-1 relative leading-[32px] font-medium mq450:text-base mq450:leading-[26px]">
            USD
          </div>
        </div>
        <img
          className="h-8 w-8 relative min-h-[32px]"
          alt=""
          src="/iconsarrow-drop-down-24px.svg"
        />
      </div>
    </div>
  );
};

export default FrameComponent2;
