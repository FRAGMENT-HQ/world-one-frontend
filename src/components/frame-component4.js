import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { order } from "../states/storage";
import { useRouter } from "next/router";
import { TailSpin } from "react-loader-spinner";

const Loading = () => {
  return (
    <TailSpin
      color="#CFEEFF"
      height={50}
      width={50}
      timeout={2500} //3 secs
      ariaLabel="tail-spin-loading"
      radius="1"
    />
  );
};
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // only execute all the code below in client side
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
const FrameComponent4 = ({
  handleClick = () => {},
  step = 1,
  title = "first step",
  isLoading = false,
}) => {
  const size = useWindowSize();
  const [orderData, setOrderData] = useAtom(order);
  const router = useRouter();

  return (
    <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-start py-[1rem] px-[2rem] box-border gap-[2rem] max-w-full text-left text-[1.5rem] text-text2 font-body-small mq900:gap-[1rem]">
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[1.312rem]">
        <div className={`h-[0.5rem] flex-1 relative rounded bg-primary`} />
        <div
          className={`h-[0.5rem] flex-1 relative rounded ${step > 1 ? " bg-primary" : "bg-text5"}`}
        />
        {orderData?.product !== "Travel Services" && (
          <>
            <div
              className={`h-[0.5rem] flex-1 relative rounded ${step > 2 ? " bg-primary" : "bg-text5"}`}
            />
            <div
              className={`h-[0.5rem] flex-1 relative rounded ${step > 3 ? " bg-primary" : "bg-text5"}`}
            />

            {orderData?.type == "cart" && (
              <div
                className={`h-[0.5rem] flex-1 relative rounded ${step > 4 ? " bg-primary" : "bg-text5"}`}
              />
            )}
          </>
        )}
      </div>
      <div className="self-stretch flex flex-row items-center justify-between [row-gap:20px] max-w-full gap-[0rem] mq1725:flex-wrap">
        <div className=" flex flex-row items-center justify-start py-[0rem]  pl-[0rem] box-border gap-[1.2rem] max-w-full  mq900:box-border mq450:pr-[1.25rem] mq450:box-border mq1325:flex-wrap mq1325:box-border">
          <div className="flex-1 flex flex-row items-center justify-start gap-[0.5rem] min-w-[12.188rem] mq450:flex-wrap">
            <img
              onClick={() => {
                router.back();
              }}
              src={"backIcon.svg"}
              className=""
            />

            <h2 className="m-0 flex-1 relative text-[2rem] leading-[2.5rem] font-semibold inline-block min-w-[10.375rem] mq900:text-[1.625rem] mq900:leading-[2rem] mq450:text-[1.188rem] mq450:leading-[1.5rem]">
              {title}
            </h2>
          </div>
        </div>
        {size.width > 500 && step != 5 && (
          <button
            onClick={() => {
              if (!isLoading) {
                handleClick();
              }
            }}
            className="cursor-pointer invisable xs:visable  [border:none] py-[0.8rem] pr-[1.968rem] pl-[2.468rem] bg-secondary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"
            // onClick={onCustomerDetailsClick}
          >
            {!isLoading ? (
              <>
                {" "}
                <div className="flex-1 relative text-[1.2rem] font-body-small text-white text-left mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                  Continue
                </div>
                <img
                  className="h-[1.2rem] w-[1.2rem] relative overflow-hidden shrink-0 min-h-[1.2rem]"
                  alt=""
                  src="/fiarrowright.svg"
                />{" "}
              </>
            ) : (
              <Loading />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default FrameComponent4;
