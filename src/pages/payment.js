import { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { order, timer, user, creatOrder,authUser } from "@/states/storage";
import React from "react";
import { useTimer } from "react-timer-hook";
import { useRouter } from "next/router";
import { cashfree } from "@/utils/cashfree";
import { createPayoutMutation, confirmPaymentMutation } from "@/hooks/payment";
import { Switch } from "@mui/material";
import InputArray from "@/components/input-array";
import FrameComponent4 from "@/components/frame-component4";
import toast from "react-hot-toast";
import Smodal from "@/components/smodal";
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


const PaymentPage = () => {
  const [orderDetails, setOrderDetails] = useAtom(order);
  const [timerDetails, setTimerDetails] = useAtom(timer);
  const [Type, setType] = useState("UPI");
  const [userDetails, setUserDetails] = useAtom(authUser);
  const [createOrderDetails, setCreateOrderDetails] = useAtom(creatOrder);
  const [selected, setSelected] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [open, setOpen] = useState(false)
  const [partialPayment, setPartialPayment] = useState(false)

  const size = useWindowSize();

  const { mutate: confirmPayment } = confirmPaymentMutation((res) => {
  }, (err) => {
    console.log(err);
  }
  );

  const { mutate: createPayout } = createPayoutMutation(
    (res) => {
      console.log(res);
      let checkoutOptions = {
        paymentSessionId: res.data.session,
        // returnUrl:
        //   "https://test.cashfree.com/pgappsdemos/v3success.php?myorder=5",
        redirectTarget: "_modal",
      };
      cashfree.checkout(checkoutOptions).then(function (result) {
        confirmPayment({ order_id: createOrderDetails.id, status: "success" });
        setOpen(true)
        if (result.error) {
          alert(result.error.message);
        }
        if (result.redirect) {
          console.log("Redirection");
        }
      });
    },
    (err) => {
      console.log(err);
    }
  );

  // const payment
  const router = useRouter();
  // check if stored time stamp is less than 5 minutes then use it else create new timestamp
  const expiryTimestamp = timerDetails?.expiryTimestamp
    ? timerDetails?.expiryTimestamp
    : new Date().getTime() + 300000;

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
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  useEffect(() => {
    setTimerDetails({ expiryTimestamp: expiryTimestamp });
  }, []);

  useEffect(() => {
    if (!isRunning) {
      // setOrderDetails({})
      // router.push("/");
    }
  }, [isRunning]);

  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[3rem] pb-[2.5rem] px-[1.25rem]  box-border gap-[2.75rem] leading-[normal] tracking-[normal] text-left text-[1.25rem] text-white font-sub-heading-small mq825:gap-[1.375rem]">
      <InputArray />
      <main className=" flex flex-col items-start justify-start gap-[1.75rem] max-w-full">
        <FrameComponent4 step={5} title="Payment" />
        <Smodal open={open} setOpen={setOpen} />

        <section className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-center pb-[4rem] px-[5%] sm:px-[3rem] box-border gap-[1rem] max-w-full text-left text-[1.25rem] text-text1 font-sub-heading-small mq825:gap-[1.5rem] mq825:pt-[1.688rem] mq825:pb-[1.688rem] mq825:box-border mq1400:py-[2.625rem] mq1400:px-[1.5rem] mq1400:box-border">
          <form className="m-0 self-stretch rounded-13xl bg-white overflow-hidden flex flex-row flex-wrap items-start justify-start py-[3rem] box-border gap-[3rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1725:flex-wrap">
            <div className="flex self-stretch flex-1 flex-col  items-end  justify-start gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full">
              <div className="self-stretch flex flex-1  snap-x overflow-x-scroll laptop:snap-none flex-row laptop:flex-col items-end justify-evenly laptop:justify-start gap-[1.706rem] max-w-full">
                <div className="self-stretch flex flex-col snap-center laptop:flex-row items-start justify-evenly gap-[1rem]">
                  <div className="w-[80px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0">
                    Currency
                  </div>
                  <div className=" w-[60px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0">
                    Product
                  </div>

                  <div className="w-[116px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left whitespace-nowrap">
                    Forex Amount
                  </div>
                  <div className="w-[104px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left whitespace-nowrap">
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

                {orderDetails?.orderItems.map((details, index) => {
                  return (
                    <>
                      <div className=" snap-center self-stretch flex flex-col laptop:flex-row items-start justify-evenly gap-[1rem]">
                        <div className=" w-[83px] relative font-semibold text-[1rem] sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                          {details?.finalCurrency.smValue}
                        </div>

                        <div className=" w-[70px] relative text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                          {details?.product}
                        </div>

                        <div className=" w-[116px] relative text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left">
                          {details?.forexAmount}
                        </div>
                        <div className="w-[103px] relative text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left">
                          {details?.inrAmount}
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
            <div className=" flex flex-col items-center justify-center gap-[2rem]  max-w-full mq900:gap-[1rem] mq900:min-w-full mq1725:flex-1">
              <div className="self-stretch shadow-[0px_2px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white overflow-hidden flex flex-col items-start justify-center p-[2rem]  gap-[1rem] max-w-full">
                <div className="w-[9.188rem] relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                  Order Summary
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[1.187rem] max-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[0.062rem] max-w-full">
                    <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                      <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block min-w-[2.125rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                        Total
                      </div>
                      <div className="relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                        {orderDetails?.amount.toFixed(2)}
                      </div>
                    </div>
                    <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[1.75rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap">
                      <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text3 text-left inline-block min-w-[1.875rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                        GST
                      </div>
                      <div className="relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                        {0}
                      </div>
                    </div>

                    <div className="self-stretch flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                      <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block min-w-[3.938rem] max-w-full mq450:text-[1rem]">
                        Discount
                      </div>
                      <div className="relative text-[1.25rem] leading-[2rem] font-normal font-body-small  text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem] text-success ">
                        0.00
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start py-[0.5rem] px-[0rem] gap-[2rem] mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1.25rem] leading-[2rem] font-semibold font-body-small text-text1 text-left inline-block min-w-[5.25rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      Grand Total
                    </div>
                    <div className="relative text-[1.5rem] leading-[2rem] font-body-small text-secondary text-left inline-block min-w-[7.313rem] mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                      {((orderDetails?.amount * (partialPayment ? 0.05 : 1) ).toFixed(2))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className="self-stretch flex flex-col-reverse tablet:flex-row items-center justify-between max-w-full gap-[1.25rem] text-left text-[1.5rem] text-text1 font-sub-heading-small lg:flex-wrap">
            <div className="relative leading-[2.5rem] font-semibold inline-block max-w-full mq450:text-[1.188rem] mq450:leading-[2rem]">
              How would you like to make payment?
            </div>
            <div className="w-[35.313rem] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-lg bg-darkorange-100 overflow-hidden shrink-0 flex flex-row items-center justify-start py-[1rem] px-[2rem] box-border gap-[1rem] gap-[1.5rem] max-w-full text-error mq825:flex-wrap">
              <div className="flex-1 relative text-[1rem]  font-[400] text-text2 inline-block min-w-[15.438rem] max-w-full mq450:text-[1rem] mq450:leading-[1.188rem]">
                Make partial payment of 5% now and remaining later.
              </div>
              <div className="flex flex-row items-center justify-start gap-[0.812rem]">
                <Switch
                  size="large"
                  checked={partialPayment}
                  onChange={() => {
                    setPartialPayment(!partialPayment);
                  }}
                />
              </div>

            </div>
          </div>
          <div className="w-[64rem] flex flex-row flex-wrap items-center justify-start gap-[3rem] max-w-full text-secondary mq825:gap-[1.5rem]">
            {((orderDetails?.amount * (partialPayment ? 0.05 : 1) + 100).toFixed(2)) <= 100000 && <div
              onClick={() => {
                setType("UPI");
              }}
              className={`flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl ${Type == "UPI" ? "bg-secondary" : "bg-white"} flex flex-col items-center justify-center py-[3rem] pr-[4.381rem] pl-[4.387rem] box-border gap-[1.5rem] min-w-[14.688rem] ${Type == "UPI" ? "text-white" : "text-secondary"}  mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border`}
            >
              <img
                className="self-stretch h-[4.938rem] relative max-w-full overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/upi.svg"
              />
              <div className="relative leading-[1.5rem] inline-block min-w-[7.938rem] mq450:text-[1rem] mq450:leading-[1.188rem]">
                UPI Payments
              </div>
            </div>}
            <div
              onClick={() => {
                setType("nb");
              }}
              className={`flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl ${Type == "nb" ? "bg-secondary" : "bg-white"} flex flex-col items-center justify-center py-[3rem] px-[4rem] box-border gap-[1.5rem] min-w-[14rem] ${Type == "nb" ? "text-white" : "text-secondary"} mq450:pl-[1.25rem] mq450:px-[1.25rem] mq450:box-border`}
            >
              <img
                className="self-stretch h-[4.938rem] relative max-w-full overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/net-banking.svg"
              />
              <div className="relative leading-[1.5rem]  inline-block min-w-[7.125rem] mq450:text-[1rem] mq450:leading-[1.188rem]">
                Net Banking
              </div>
            </div>
            <div
              onClick={() => {
                setType("cc,dc");
              }}
              className={`flex-1 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl ${Type == "cc,dc" ? "bg-secondary" : "bg-white"} flex flex-col items-center justify-center py-[3rem] pr-[4.381rem] pl-[4.387rem] box-border gap-[1.5rem] min-w-[14.688rem] ${Type == "cc,dc" ? "text-white" : "text-secondary"} mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border`}
            >
              <img
                className="self-stretch h-[4.938rem] relative max-w-full overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/card.svg"
              />
              <div className="relative leading-[1.5rem]  mq450:text-[1rem] mq450:leading-[1.188rem]">
                Debit/Credit Cards
              </div>
            </div>
          </div>

          <div className="self-stretch rounded-3xl bg-darkorange-200 overflow-hidden flex flex-col sm:flex-row flex-wrap items-center justify-start mt-4 py-[1rem] px-[2rem] box-border gap-[1.5rem] max-w-full text-[1rem]">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/uexclamationtriangle.svg"
            />
            <div className="flex-1 relative leading-[1.5rem] font-normal inline-block  max-w-full lg:min-w-full">
              Have you not purchased or transferred foreign currency worth more than INR 700,000 in the present financial year, including the current order?
            </div>
            <Switch
              size="large"
              checked={selected3}
              onChange={() => {
                setSelected3(!selected3);
              }}
            />
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-[0.25rem] px-[0rem] box-border gap-[2rem] max-w-full text-text2 mq825:gap-[1rem]">
            {selected ? (
              <img
                onClick={() => {
                  setSelected(!selected);
                }}
                className="h-8 w-8 relative overflow-hidden shrink-0 "
                loading="lazy"
                alt=""
                src="/iconscheck-box-outline-blank.svg"
              />
            ) : (
              <div
                onClick={() => {
                  setSelected(!selected);
                }}
                className={` flex justify-center items-center cursor-pointer border-3 border-solid border-[#4F4F4F] ${selected ? "" : "bg-transperent"} h-5 w-5`}
              ></div>
            )}
            <div className="flex-1 relative leading-[2rem] inline-block xs:min-w-[61.75rem] max-w-full min-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
              I, {userDetails?.user?.name} , agree to abide by the terms of use,
              confirm the accuracy of the provided information, and acknowledge
              that I am obligated to pay 2% of order total as cancellation
              charges in the event of order cancellation as outlined in
              WorldOneForex's cancellation policy.
            </div>
          </div>
          <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-[0.25rem] px-[0rem] box-border gap-[2rem] max-w-full text-text2 mq825:gap-[1rem]">
            {selected2 ? (
              <img
                onClick={() => {
                  setSelected2(!selected2);
                  // setSelected(!selected);
                }}
                className="h-8 w-8 relative overflow-hidden shrink-0 "
                loading="lazy"
                alt=""
                src="/iconscheck-box-outline-blank.svg"
              />
            ) : (
              <div
                onClick={() => {
                  setSelected2(!selected2);
                }}
                className={` flex justify-center items-center cursor-pointer border-3 border-solid border-[#4F4F4F] ${selected ? "" : "bg-transperent"} h-5  w-5`}
              ></div>
            )}
            <div className="flex-1 relative leading-[2rem]  inline-block min-w-[27.25rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem] mq825:min-w-full">
              I, confirm I want to exchange currency from WorldOneForex
            </div>
          </div>
          <div className="w-[64rem] flex flex-col items-start justify-center gap-[2rem] max-w-full text-[1.5rem] mq825:gap-[1rem]">
            {/* <div className="relative leading-[2.5rem] font-semibold mq450:text-[1.188rem] mq450:leading-[2rem]">
              {`${Type == "cc,dc" ? "Card" : Type == "nb" ? "Net Banking" : "UPI"} payment `}
            </div> */}
            <div className="self-stretch flex flex-row items-center justify-between max-w-full gap-[1.25rem] lg:flex-wrap">
              <button
                onClick={() => {
                  if (selected && selected2 && selected3) {

                    createPayout({
                      order_id: createOrderDetails.id,
                      email: userDetails.email,
                      methord: Type.toLowerCase(),
                      partial: partialPayment
                    });
                  } else {
                    toast.error("please check all check box before proceding");
                  }
                }}
                className={`text-sm cursor-pointer [border:none] py-[0.8rem] px-[2.25rem] ${selected && selected2 && selected3 ? "bg-secondary" : "bg-text2"}  shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem] whitespace-nowrap max-w-full hover:bg-gray-300`}
              >
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
        </section>
      </main>
    </div>
  );
};

export default PaymentPage;
