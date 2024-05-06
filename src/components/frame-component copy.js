import { useCallback } from "react";
import { useRouter } from "next/router";

const FrameComponent7 = () => {
  const router = useRouter();

  const onFrameButtonClick = useCallback(() => {
    router.push("/frame1");
  }, [router]);

  return (
    <section className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-start py-[1.5rem] px-[2rem] box-border gap-[2rem] max-w-full text-left text-[1.5rem] text-text2 font-body-small mq900:gap-[1rem]">
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.312rem]">
        <div className="h-[0.5rem] flex-1 relative rounded bg-primary min-w-[18.75rem] max-w-[19.125rem]" />
        <div className="h-[0.5rem] flex-1 relative rounded bg-text5 min-w-[18.75rem] max-w-[19.125rem]" />
        <div className="h-[0.5rem] flex-1 relative rounded bg-text5 min-w-[18.75rem] max-w-[19.125rem]" />
        <div className="h-[0.5rem] flex-1 relative rounded bg-text5 min-w-[18.75rem] max-w-[19.125rem]" />
        <div className="h-[0.5rem] flex-1 relative rounded bg-text5 min-w-[18.75rem] max-w-[19.125rem]" />
      </div>
      <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] max-w-full gap-[0rem] mq1725:flex-wrap">
        <div className="w-[87.188rem] flex flex-row items-center justify-start py-[0rem] pr-[67.375rem] pl-[0rem] box-border gap-[1.5rem] max-w-full mq900:pr-[16.813rem] mq900:box-border mq450:pr-[1.25rem] mq450:box-border mq1325:flex-wrap mq1325:pr-[33.688rem] mq1325:box-border">
          <img
            className="h-[3rem] w-[3rem] relative overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/uangleleftb2.svg"
          />
          <div className="flex-1 flex flex-row items-center justify-start gap-[1rem] min-w-[9.938rem]">
            <div className="w-[1.813rem] relative leading-[2.25rem] font-medium inline-block mq450:text-[1.188rem] mq450:leading-[1.813rem]">
              01
            </div>
            <h2 className="m-0 flex-1 relative text-[2rem] leading-[2.5rem] font-normal font-inherit mq900:text-[1.625rem] mq900:leading-[2rem] mq450:text-[1.188rem] mq450:leading-[1.5rem]">
              Order Details
            </h2>
          </div>
        </div>
        <button
          className="cursor-pointer [border:none] py-[1.125rem] pr-[1.968rem] pl-[2.468rem] bg-secondary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"
          onClick={onFrameButtonClick}
        >
          <img
            className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 hidden min-h-[2rem]"
            alt=""
            src="/ushoppingcart.svg"
          />
          <div className="flex-1 relative text-[1.5rem] leading-[2rem] font-body-small text-white text-left mq450:text-[1.188rem] mq450:leading-[1.625rem]">
            Continue
          </div>
          <img
            className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
            alt=""
            src="/fiarrowright.svg"
          />
        </button>
      </div>
    </section>
  );
};

export default FrameComponent7;
