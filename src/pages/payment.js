import { use, useCallback, useEffect } from "react";
import FrameComponent2 from "../components/frame-component2";
import FrameComponent1 from "../components/frame-component1";
import FrameComponent from "../components/frame-component";
import FrameComponent4 from "@/components/frame-component4";
import { useAtom } from "jotai";
import { order,timer } from "@/states/storage";
import React from 'react';
import { useTimer } from 'react-timer-hook';
import { useRouter } from "next/router";

const PaymentPage = () => {
  const [orderDetails , setOrderDetails ] = useAtom(order);
  const [timerDetails,setTimerDetails] = useAtom(timer);
  const router = useRouter();
  // check if stored time stamp is less than 5 minutes then use it else create new timestamp
  const expiryTimestamp = timerDetails?.expiryTimestamp ? timerDetails?.expiryTimestamp : new Date().getTime() + 300000;
  
  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, onExpire: () => console.warn('onExpire called') });

  useEffect(() => {
    setTimerDetails({expiryTimestamp:expiryTimestamp});
  }, [])

  useEffect(() => {
    if(!isRunning){
      // setOrderDetails({})
      router.push('/')
    }
  }, [isRunning])
  
  

  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[3rem] pb-[2.5rem] pr-[1.687rem] pl-[1.25rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] text-left text-[1.25rem] text-white font-sub-heading-small mq825:gap-[1.375rem]">
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
      <main className="w-[105.438rem] flex flex-col items-start justify-start gap-[1.75rem] max-w-full">
        <FrameComponent4 step={4} title="Payment" />
        {/* <FrameComponent2 /> */}
        <section className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-center py-[4rem] px-[3rem] box-border gap-[3rem] max-w-full text-left text-[1.25rem] text-text1 font-sub-heading-small mq825:gap-[1.5rem] mq825:pt-[1.688rem] mq825:pb-[1.688rem] mq825:box-border mq1400:py-[2.625rem] mq1400:px-[1.5rem] mq1400:box-border">
          {/* <FrameComponent1 /> */}
          {/* <FrameComponent /> */}
          <form className="m-0 self-stretch rounded-13xl bg-white overflow-hidden flex flex-row items-start justify-start py-[4rem] px-[2.5rem] box-border gap-[3rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1725:flex-wrap">
            <div className="flex flex-col items-end justify-start gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full">
              <div className="self-stretch flex flex-col items-end justify-start gap-[1.706rem] max-w-full">
                <div className="flex flex-row items-start justify-around gap-[1rem] w-full mq1325:hidden">
                  <div className="bg-red-100 relative text-[1.25rem]  font-medium font-body-small text-text3 ">
                    Currency
                  </div>
                  <div className="relative text-[1.25rem]  font-medium font-body-small text-text3 text-left inline-block shrink-0">
                    Product
                  </div>

                  <div className=" relative text-[1.25rem]  font-medium font-body-small text-text3 text-left whitespace-nowrap">
                    Forex Amount
                  </div>
                  <div className=" relative text-[1.25rem]  font-medium font-body-small text-text3 text-left whitespace-nowrap">
                    INR Amount
                  </div>
                </div>
                <img
                  className="self-stretch relative max-w-full overflow-hidden max-h-full"
                  loading="lazy"
                  alt=""
                  src="/vector-18.svg"
                />
                <div className="self-stretch w-full  flex flex-row items-start justify-around gap-[1rem]">
                  <div className=" relative text-[1.25rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                    {orderDetails?.finalCurrency?.value}
                  </div>
                  <div className="relative text-[1.25rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                    {orderDetails?.product}
                  </div>

                  <div className=" relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left">
                    {orderDetails?.forexAmount}
                  </div>
                  <div className="relative text-[1.25rem] leading-[2rem] font-body-small text-text2 text-left">
                    {orderDetails?.inrAmount}
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
                        {orderDetails?.inrAmount}
                      </div>
                    </div>
                    <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[1.75rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap">
                      <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[1.875rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                        GST
                      </div>
                      <div className="relative text-[1.25rem] leading-[2rem] font-medium font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                        {(orderDetails?.inrAmount * 0.005).toFixed(2)}
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
                      {(orderDetails?.inrAmount * 1.005).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="self-stretch flex flex-row items-center justify-between max-w-full gap-[1.25rem] text-left text-[1.5rem] text-text1 font-sub-heading-small lg:flex-wrap">
      <div className="relative leading-[2.5rem] inline-block max-w-full mq450:text-[1.188rem] mq450:leading-[2rem]">
        How would you like to make payment?
      </div>
      <div className="w-[35.313rem] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-lg bg-darkorange-100 overflow-hidden shrink-0 flex flex-row items-center justify-start py-[1rem] px-[2rem] box-border gap-[1.5rem] max-w-full text-error mq825:flex-wrap">
        <div className="flex flex-row items-center justify-start gap-[0.812rem]">
          <img
            className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
            alt=""
            src="/uclock.svg"
          />
          <div className="relative leading-[2rem] inline-block min-w-[3.25rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
            {`${minutes}:${seconds}`}
          </div>
        </div>
        <div className="flex-1 relative text-[1.25rem] leading-[1.5rem] font-medium text-text2 inline-block min-w-[15.438rem] max-w-full mq450:text-[1rem] mq450:leading-[1.188rem]">
          Rates held for 5 mins; complete payment before timer ends to avoid new
          rates.
        </div>
      </div>
    </div>
          <div className="w-[64.75rem] flex flex-row flex-wrap items-center justify-start gap-[3rem] max-w-full text-secondary mq825:gap-[1.5rem]">
            <div className="flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-secondary flex flex-col items-center justify-center py-[3rem] pr-[4.381rem] pl-[4.387rem] box-border gap-[1.5rem] min-w-[14.688rem] text-white mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
              <img
                className="self-stretch h-[4.938rem] relative max-w-full overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/upi.svg"
              />
              <div className="relative leading-[1.5rem] inline-block min-w-[7.938rem] mq450:text-[1rem] mq450:leading-[1.188rem]">
                UPI Payments
              </div>
            </div>
            <div className="flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white flex flex-col items-center justify-center py-[3rem] pr-[4.381rem] pl-[4.387rem] box-border gap-[1.5rem] min-w-[14.688rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
              <img
                className="self-stretch h-[4.938rem] relative max-w-full overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/net-banking.svg"
              />
              <div className="relative leading-[1.5rem] font-medium inline-block min-w-[7.125rem] mq450:text-[1rem] mq450:leading-[1.188rem]">
                Net Banking
              </div>
            </div>
            <div className="flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white flex flex-col items-center justify-center py-[3rem] pr-[4.356rem] pl-[4.35rem] box-border gap-[1.5rem] min-w-[14.688rem] mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
              <img
                className="self-stretch h-[4.938rem] relative max-w-full overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/card.svg"
              />
              <div className="relative leading-[1.5rem] font-medium mq450:text-[1rem] mq450:leading-[1.188rem]">
                Debit/Credit Cards
              </div>
            </div>
          </div>
          <div className="w-[64.75rem] flex flex-col items-start justify-center gap-[2rem] max-w-full text-[1.5rem] mq825:gap-[1rem]">
            <div className="relative leading-[2.5rem] mq450:text-[1.188rem] mq450:leading-[2rem]">
              UPI Payments
            </div>
            <div className="self-stretch flex flex-row items-center justify-between max-w-full gap-[1.25rem] lg:flex-wrap">
              <div className="w-[31.938rem] rounded-lg bg-white box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-[1rem] px-[1.437rem] gap-[13.812rem] max-w-full border-[1px] border-solid border-text4 mq450:gap-[3.438rem] mq825:gap-[6.875rem]">
                <input
                  className="w-full [border:none] [outline:none] bg-[transparent] h-[2rem] flex-1 flex flex-row items-center justify-start font-sub-heading-small font-medium text-[1.25rem] text-text3 min-w-[15.625rem] max-w-full"
                  placeholder="Enter UPI ID"
                  type="text"
                />
                <img
                  className="h-[2rem] w-[2rem] relative hidden min-h-[2rem]"
                  alt=""
                  src="/iconsarrow-drop-down-24px.svg"
                />
              </div>
              <button className="cursor-pointer [border:none] py-[1.125rem] px-[1.25rem] bg-text2 w-[22.688rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap max-w-full hover:bg-gray-300">
                <img
                  className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 hidden min-h-[2rem]"
                  alt=""
                  src="/ushoppingcart1.svg"
                />
                <div className="relative text-[1.5rem] leading-[2rem] font-sub-heading-small text-white text-left">
                  Request Payment
                </div>
              </button>
            </div>
          </div>
          <div className="self-stretch rounded-3xl bg-darkorange-200 overflow-hidden flex flex-row flex-wrap items-center justify-start py-[1.5rem] px-[2rem] box-border gap-[1.5rem] max-w-full text-[1rem]">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/uexclamationtriangle.svg"
            />
            <div className="flex-1 relative leading-[1.5rem] font-medium inline-block min-w-[50.813rem] max-w-full lg:min-w-full">
              Have you purchased or transferred foreign currency worth more than
              INR. 700,000 in the present financial year including the current
              order?
            </div>
            <img
              className="h-[3rem] w-[6rem] relative rounded-3xl overflow-hidden shrink-0 cursor-pointer"
              loading="lazy"
              alt=""
              src="/toogle1.svg"
            />
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-[0.25rem] px-[0rem] box-border gap-[2rem] max-w-full text-text2 mq825:gap-[1rem]">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
              alt=""
              src="/checkbox.svg"
            />
            <div className="flex-1 relative leading-[2rem] font-medium inline-block min-w-[61.75rem] max-w-full lg:min-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
              I, Akshat verma , agree to abide by the terms of use, confirm the
              accuracy of the provided information, and acknowledge that I am
              obligated to pay 2% of order total as cancellation charges in the
              event of order cancellation as outlined in WorldOneForex's
              cancellation policy.
            </div>
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-[0.25rem] px-[0rem] box-border gap-[2rem] max-w-full text-text2 mq825:gap-[1rem]">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
              alt=""
              src="/checkbox.svg"
            />
            <div className="flex-1 relative leading-[2rem] font-medium inline-block min-w-[27.25rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem] mq825:min-w-full">
              I, confirm I want to exchange currency from WorldOneForex
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PaymentPage;
