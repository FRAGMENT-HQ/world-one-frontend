import { useMemo } from "react";

const Component = ({ propMarginLeft }) => {
  const component3Style = useMemo(() => {
    return {
      marginLeft: propMarginLeft,
    };
  }, [propMarginLeft]);

  return (
    <div
      className="ml-[-288px] w-[216px] rounded-13xl bg-darkslateblue-600 shadow-[0px_12px_24px_rgba(39,_53,_126,_0.1)] overflow-hidden shrink-0 flex flex-row items-start justify-start py-16 pr-0 pl-[336px] box-border relative gap-[48px] [debug_commit:f6aba90] text-left text-5xl text-text5 font-body-small mq450:pt-[42px] mq450:pb-[42px] mq450:box-border"
      style={component3Style}
    >
      <img
        className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
        alt=""
        src="/position-manager@2x.png"
      />
      <div className="w-[741px] flex flex-col items-start justify-center gap-[32px] shrink-0 [debug_commit:f6aba90]">
        <div className="self-stretch h-[108px] relative leading-[36px] font-medium inline-block mq450:text-lgi mq450:leading-[29px]">
          Lorem ipsum dolor sit amet consectetur. Gravida tellus neque enim
          dictum commodo. Facilisis odio pulvinar risus id nunc consectetur.
          Nisi et facilisi condimentum id imperdiet ac duis rutrum faucibus.
        </div>
        <img
          className="w-[387px] h-0 relative max-w-full"
          alt=""
          src="/shape-filter.svg"
        />
        <div className="self-stretch flex flex-col items-start justify-center gap-[8px] text-13xl text-white">
          <div className="self-stretch h-10 relative leading-[40px] inline-block mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
            Kathryn Murphy
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[455px] pl-0 gap-[16px] text-5xl text-text5">
            <div className="h-9 flex-1 relative leading-[36px] font-medium inline-block min-w-[103px] mq450:text-lgi mq450:leading-[29px]">
              IT Professional
            </div>
            <img
              className="h-9 w-0 relative min-h-[36px]"
              alt=""
              src="/position-transformer.svg"
            />
            <div className="h-9 w-[95px] relative leading-[36px] font-medium inline-block mq450:text-lgi mq450:leading-[29px]">
              Age - 28
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Component;
