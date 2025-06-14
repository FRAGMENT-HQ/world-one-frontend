import FrameComponent4 from "@/components/frame-component4";
import { order } from "@/states/storage";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import InputArray from "@/components/input-array";
function useWindowSize() {
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

const Frame1 = () => {
  const [orderDetails, setOrderDetails] = useAtom(order);
  const [gst, setGst] = useState(1.0009);
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const size = useWindowSize();

  const handleNext = () => {
    router.push("/details");
    setOrderDetails({ ...orderDetails, gst: gst, amount: amount * gst });
  };

  useEffect(() => {
    setAmount(
      orderDetails?.orderItems.reduce(
        (acc, item) => acc + parseFloat(item.inrAmount),
        0
      )
    );
  }, [orderDetails?.inrAmount]);
  useEffect(() => {
    setGst(amount < 100000 ? 1.0009 : 1.00018);
  }, [amount]);

  return (
    <div className="w-full relative bg-background overflo-hidden flex flex-col items-center justify-center pt-[1.5rem] pr-[2%] pl-[2%] sm:pr-[1.25rem] sm:pl-[1.25rem] pb-[7.687rem] box-border gap-[2.75rem] text-left text-[1.25rem] text-white font-body-small ">
      <InputArray />
      <FrameComponent4
        handleClick={handleNext}
        step={1}
        title="Order Details"
      />
      <main className="w-full flex flex-col items-start justify-start gap-[1.75rem] max-w-full">
        <form className="m-0 self-stretch shadow-[0px_8px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col laptop:flex-row items-start justify-start py-[4rem] px-[2%] sm:px-[2.5rem] box-border gap-[3rem] w-full ] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border flex-wrap">
          <div className="flex flex-1 w-full laptop:w-[60%] flex-col items-end justify-center gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full">
            <div className="self-stretch  snap-x overflow-x-scroll laptop:snap-none flex flex-row laptop:flex-col items-end justify-evenly laptop:justify-start gap-[1.706rem] max-w-full">
              <div className="self-stretch snap-center  flex flex-col laptop:flex-row items-start justify-between gap-[1rem]">
                <div className="w-[103px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0 whitespace-nowrap">
                  Order Type
                </div>
                <div className=" w-[70px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0">
                  Product
                </div>
                <div className="w-[60px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0">
                  Currency
                </div>
                <div className="w-[130px] relative text-[1rem] sm:text-[1.25rem] font-normal font-body-small text-text3 text-left inline-block shrink-0">
                  Rate
                </div>
                <div className="w-[116px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left whitespace-nowrap">
                  Forex Amount
                </div>
                <div className="w-[108px] mr-2 relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left whitespace-nowrap">
                  INR Amount
                </div>
              </div>
              {size.width > 1024 && (
                <img
                  className="self-stretch invisible laptop:visible laptop:w-full w-0  relative max-w-full overflow-hidden max-h-full"
                  loading="lazy"
                  alt=""
                  src="/vector-18.svg"
                />
              )}
              {orderDetails?.orderItems && <> {orderDetails?.orderItems.map((details, index) => {
                return (
                  <>
                    <div className="self-stretch snap-center flex flex-col laptop:flex-row items-start justify-between">
                      <div className="w-[103px] flex flex-row items-start justify-start gap-[1.2rem]">
                        <div className="flex-1 relative font-semibold text-[1rem] sm:text-[0.875rem] leading-[2rem] font-body-small text-success text-left">
                          {details?.bs}
                        </div>
                      </div>
                      <div className="relative w-[70px] text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                        {details?.product}
                      </div>
                      <div className=" w-[60px]  relative font-semibold text-[1rem] sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                        {details?.finalCurrency.smValue}
                      </div>
                      <div className="w-[130px] mt-2 font-semibold relative text-[1rem] sm:text-[0.875rem] font-body-small text-text2 text-left inline-block shrink-0 ">
                        
                        {details?.finalCurrency.smValue} ={" "}
                        {details?.intialCurrency?.smValue} {details?.rate}
                      </div>
                      <div className="w-[116px] relative text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left">
                        {details?.forexAmount}
                      </div>
                      <div className="w-[103px] relative text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left">
                        {details?.inrAmount}
                      </div>
                    </div>
                  </>
                );
              })}</>}

              {size.width > 1024 && (
                <img
                  className=" invisible laptop:visible laptop:w-full w-0 self-stretch relative max-w-full overflow-hidden max-h-full"
                  loading="lazy"
                  alt=""
                  
                />
              )}
            </div>
          </div>
          <div className=" flex flex-col w-full laptop:w-[32%] items-center justify-center gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full mq1725:flex-1">
            
            <div className="self-stretch shadow-[0px_2px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white overflow-hidden flex flex-col items-start justify-center p-[2rem]  gap-[1rem] max-w-full">
              <div className="w-[9.188rem] relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                Order Summary
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.187rem] max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[0.062rem] max-w-full">
                  <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block min-w-[2.125rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                      Total
                    </div>
                    <div className="relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      {amount}
                    </div>
                  </div>
                  <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[1.75rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap">
                    <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[1.875rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                      GST
                    </div>
                    <div className="relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      {(amount * (gst - 1)).toFixed(2)}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block min-w-[3.938rem] max-w-full mq450:text-[1rem]">
                      Discount
                    </div>
                    <div className="relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-medium font-body-small  text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem] text-success ">
                      0.00
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-[0.5rem] px-[0rem] gap-[2rem] mq900:flex-wrap mq450:gap-[1rem]">
                  <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-body-small text-text1 text-left inline-block min-w-[5.25rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                    Grand Total
                  </div>
                  <div className="relative text-[1.5rem] leading-[2rem] font-body-small text-secondary text-left inline-block min-w-[7.313rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                    {(amount * gst).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {size.width < 500 && (
            <button
              onClick={handleNext}
              className="mx-auto cursor-pointer invisable xs:visable  [border:none] py-[1.125rem] pr-[1.968rem] pl-[2.468rem] bg-secondary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"

              // onClick={onCustomerDetailsClick}
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
          )}
        </form>
      </main>
    </div>
  );
};

export default Frame1;
