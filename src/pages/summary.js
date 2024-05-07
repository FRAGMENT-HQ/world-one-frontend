// import FrameComponent7 from "../components/frame-component";
import FrameComponent4 from "@/components/frame-component4";
import { useAtom } from "jotai";
import { order } from "@/states/storage";
import { useRouter } from "next/router";
 const Frame1 = () => {
  const [orderDetails, setOrderDetails] = useAtom(order);
  const router = useRouter();
  const handleNext = () => {
    router.push("/details");
  }
  
  
  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[3rem] px-[1.25rem] pb-[7.687rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] text-left text-[1.25rem] text-white font-body-small mq900:gap-[1.375rem]">
      <div className="w-[105rem] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-3xl bg-darkslateblue-700 flex flex-row items-center justify-between py-[1.875rem] px-[4rem] box-border gap-[1.25rem] max-w-full mq450:flex-wrap mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
        <img
          className="h-[1.594rem] w-[6.188rem] relative"
          loading="lazy"
          alt=""
          src="/w-o-f.svg"
        />
        <div className="flex flex-row items-center justify-start">
          <div className="overflow-hidden flex flex-row items-center justify-center py-[0.25rem] px-[0.968rem]">
            <div className="relative leading-[2rem] inline-block min-w-[4.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
              Location
            </div>
          </div>
        </div>
      </div>
      <FrameComponent4 handleClick={handleNext}  step={1} title="Order Details"  />
      <main className="w-[105rem] flex flex-col items-start justify-start gap-[1.75rem] max-w-full">

        <form className="m-0 self-stretch shadow-[0px_8px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-row items-start justify-start py-[4rem] px-[2.5rem] box-border gap-[3rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1725:flex-wrap">
        
          <div className="flex flex-col items-end justify-start gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full">
            <div className="self-stretch flex flex-col items-end justify-start gap-[1.706rem] max-w-full">
              <div className=" flex flex-row items-start justify-start gap-[1rem] max-w-full mq1325:hidden">
                <div className=" relative text-[1.25rem]  font-medium font-body-small text-text3 text-left inline-block shrink-0 whitespace-nowrap">
                  Order Type
                </div>
                <div className="w-[8rem] relative text-[1.25rem]  font-medium font-body-small text-text3 text-left inline-block shrink-0">
                  Product
                </div>
                <div className="w-[8rem] relative text-[1.25rem]  font-medium font-body-small text-text3 text-left inline-block shrink-0">
                  Currency
                </div>
                <div className="w-[11.5rem] relative text-[1.25rem] font-medium font-body-small text-text3 text-left inline-block shrink-0">
                  Rate
                </div>
                <div className="flex-1 relative text-[1.25rem]  font-medium font-body-small text-text3 text-left whitespace-nowrap">
                  Forex Amount
                </div>
                <div className="flex-1 relative text-[1.25rem]  font-medium font-body-small text-text3 text-left whitespace-nowrap">
                  INR Amount
                </div>
              </div>
              <img
                className="self-stretch relative max-w-full overflow-hidden max-h-full"
                loading="lazy"
                alt=""
                src="/vector-18.svg"
              />
              <div className="self-stretch flex flex-row items-start justify-start gap-[1rem]">
                <div className="w-[10.938rem] flex flex-row items-start justify-start gap-[1.437rem]">
                  <img
                    className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
                    loading="lazy"
                    alt=""
                    src="/iconscheck-box-outline-blank.svg"
                  />
                  <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-body-small text-success text-left">
                    BUY
                  </div>
                </div>
                <div className="w-[8rem] relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                  Forex Card
                </div>
                <div className="w-[8rem] relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                {orderDetails?.finalCurrency.value}
                </div>
                <div className="w-[11.5rem] relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                  1 {orderDetails?.finalCurrency.value} = {orderDetails?.intialCurrency?.value} {orderDetails?.rate.toFixed(2)}
                </div>
                <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left">
                 {(orderDetails?.amount)}
                </div>
                <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left">
                {(orderDetails?.amount*orderDetails?.rate).toFixed(2)}
                </div>
              </div>
              <img
                className="self-stretch relative max-w-full overflow-hidden max-h-full"
                loading="lazy"
                alt=""
                src="/vector-19.svg"
              />
            </div>
            {/* <button className="cursor-pointer [border:none] py-[1.125rem] px-[1.062rem] bg-primary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden flex flex-row items-start justify-start box-border gap-[1rem]">
              <img
                className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 hidden min-h-[2rem]"
                alt=""
                src="/ushoppingcart1.svg"
              />
              <img
                className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
                alt=""
                src="/uplus.svg"
              />
              <div className="flex-1 relative text-[1.5rem] leading-[2rem] font-body-small text-white text-left mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                Add Product
              </div>
            </button> */}
          </div>
          <div className=" flex flex-col items-center justify-center gap-[2rem]  max-w-full mq900:gap-[1rem] mq900:min-w-full mq1725:flex-1">
            <div className=" flex flex-col items-start justify-center gap-[1rem] max-w-full">
              <div className=" relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                Have a Discount Code?
              </div>
              <div className="self-stretch flex flex-row items-start justify-start [row-gap:20px] mq900:flex-wrap">
                <div className="flex-1 rounded-tl-xl rounded-tr-none rounded-br-none rounded-bl-xl bg-white box-border overflow-hidden flex flex-row items-center justify-start py-[0.312rem] px-[2rem] min-w-[11.938rem] border-[2px] border-solid border-primary">
                  <input
                    className="w-[11.938rem] [border:none] [outline:none] font-medium font-body-small text-[1.25rem] bg-[transparent] h-[2rem] relative leading-[2rem] text-text4 text-left inline-block p-0 mq450:text-[1rem] mq450:leading-[1.625rem]"
                    placeholder="Enter Discount Code"
                    type="text"
                  />
                </div>
                <div className="cursor-pointer [border:none] py-[0.5rem] px-[3.843rem] bg-primary shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-tl-none rounded-tr-xl rounded-br-xl rounded-bl-none overflow-hidden flex flex-row items-center justify-center gap-[1rem] hover:bg-chocolate-100">
                  <img
                    className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 hidden min-h-[2rem]"
                    alt=""
                    src="/ushoppingcart.svg"
                  />
                  <div className="relative text-[1.5rem]  font-body-small text-white text-left inline-block min-w-[4.188rem] mq450:text-[1.188rem]">
                    Apply
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch shadow-[0px_2px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white overflow-hidden flex flex-col items-start justify-center p-[2rem]  gap-[1rem] max-w-full">
              <div className="w-[9.188rem] relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                Order Summary
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.187rem] max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[0.062rem] max-w-full">
                  <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block min-w-[2.125rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                      Total
                    </div>
                    <div className="relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      {(orderDetails?.amount*orderDetails?.rate).toFixed(2)}
                    </div>
                  </div>
                  <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[1.75rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap">
                    <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[1.875rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                      GST
                    </div>
                    <div className="relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                    {(orderDetails?.amount*orderDetails?.rate*0.18).toFixed(2)}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text2 text-left inline-block min-w-[3.938rem] max-w-full mq450:text-[1rem]">
                      Discount
                    </div>
                    <div className="relative text-[1.25rem] leading-[2rem] font-medium font-body-small  text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem] text-success ">
                      0.00
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-start py-[0.5rem] px-[0rem] gap-[2rem] mq900:flex-wrap mq450:gap-[1rem]">
                  <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-body-small text-text1 text-left inline-block min-w-[5.25rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                    Grand Total
                  </div>
                  <div className="relative text-[1.5rem] leading-[2rem] font-body-small text-secondary text-left inline-block min-w-[7.313rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                  {(orderDetails?.amount*orderDetails?.rate*1.18).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

 
export default Frame1