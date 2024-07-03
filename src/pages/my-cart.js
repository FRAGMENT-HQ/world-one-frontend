import { order, cart } from "@/states/storage";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
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

const USD = 84;

const Frame1 = () => {
  const [orderDetails, setOrderDetails] = useAtom(cart);
  const [Order, setOrder] = useAtom(order);
  const [gst, setGst] = useState(1.0009);
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const size = useWindowSize();

  useEffect(() => {
    setAmount(
      orderDetails?.Items.reduce(
        (acc, item) => acc + parseFloat(item.inrAmount),
        0
      )
    );
    setSelected(orderDetails?.Items.map((item) => true));
  }, [orderDetails?.Items]);
  useEffect(() => {
    setGst(amount < 100000 ? 1.0009 : 1.00018);
  }, [amount]);

  useEffect(() => {
    // account for items for which the checkbox is selected
    setAmount(
      orderDetails?.Items.reduce(
        (acc, item, index) =>
          acc +
          (selected?.length > 0 && selected[index]
            ? parseFloat(item.inrAmount)
            : 0),
        0
      )
    );
  }, [selected]);

  const Continue = () => {
    const slectedItems = orderDetails?.Items.filter(
      (item, index) => selected[index]
    );

    const Forex_card = slectedItems.filter(
      (item) => item.product === "Forex Card"
    );
    const Cash = slectedItems.filter((item) => item.product === "Cash");

    const amountInForex = Forex_card.reduce(
      (acc, item) => acc + parseFloat(item.inrAmount),
      0
    );
    const amountInCash = Cash.reduce(
      (acc, item) => acc + parseFloat(item.inrAmount),
      0
    );

    if (amountInCash / USD > 3000) {
      toast.error("Amount in cash should be less than 3000 USD");
      return;
    }

    if (amountInForex + amountInCash < 5000) {
      toast.error("Amount in forex and cash should be greater than 5000 INR");
      return;
    }

    if ((amountInForex + amountInCash) / USD > 250000) {
      toast.error("Amount in forex should be less than 250000 USD");
      return;
    } else {
      setOrder({
        ...Order,
        gst: gst,
        amount: amount * gst,
        orderItems: slectedItems,
        type: "cart",
        product: "Forex Card, Cash",
      });
    }
    router.push("/summary");
  };

  return (
    <div className="w-full relative bg-background overflo-hidden flex flex-col items-center justify-center pt-[1.5rem] px-[5vw] sm:px-[1.25rem] pb-[7.687rem] box-border gap-[2.75rem] text-left text-[1.25rem] text-white font-body-small ">
      <InputArray />
      <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
        <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-semibold font-inherit inline-block max-w-full ">
          My Cart
        </h1>
      </div>
      <main className="w-full flex flex-col items-start justify-start gap-[1.75rem] max-w-full">
        <form className="m-0 self-stretch shadow-[0px_8px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  laptop:overflow-hidden flex flex-col laptop:flex-row items-start justify-start py-[4rem] px-[2%] sm:px-[2.5rem] box-border gap-[3rem] w-full ] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border flex-wrap">
          <div className="flex flex-1 w-full laptop:w-[60%] flex-col items-end justify-center gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full">
            <div className="self-stretch flex snap-x overflow-x-scroll laptop:snap-none flex-row laptop:flex-col items-end justify-evenly laptop:justify-start gap-[1.706rem] max-w-full">
              <div className="self-stretch flex flex-col snap-center laptop:flex-row items-start justify-between gap-[1rem]">
                <div className="w-[108px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0 whitespace-nowrap">
                  Order Type
                </div>
                <div className=" w-[60px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0">
                  Product
                </div>
                <div className="w-[80px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left inline-block shrink-0">
                  Currency
                </div>
                <div className="w-[130px] relative text-[1rem] sm:text-[1.25rem] font-normal font-body-small text-text3 text-left inline-block shrink-0">
                  Rate
                </div>
                <div className="w-[116px] relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left whitespace-nowrap">
                  Forex Amount
                </div>
                <div className="w-[108px] mr-2 relative text-[1rem] sm:text-[1.25rem]  font-normal font-body-small text-text3 text-left whitespace-nowrap ">
                  INR Amount
                </div>
              </div>

              {orderDetails?.Items.map((details, index) => {
                return (
                  <>
                    <div className=" snap-center self-stretch flex flex-col laptop:flex-row items-start justify-between gap-[1rem]">
                      <div
                        onClick={() => {
                          setSelected(
                            selected?.map((item, i) =>
                              i === index ? !item : item
                            )
                          );
                        }}
                        className=" w-[115px] flex flex-row items-start justify-start gap-[1.2rem]"
                      >
                        {selected?.length > 0 && selected[index] ? (
                          <img
                            className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 min-h-[2rem]"
                            loading="lazy"
                            alt=""
                            src="/iconscheck-box-outline-blank.svg"
                          />
                        ) : (
                          <div
                            onClick={() => {}}
                            className={` flex justify-center items-center cursor-pointer border-3 border-solid border-[#4F4F4F] h-[1.5rem] w-[1.5rem]`}
                          ></div>
                        )}
                        <div className="flex-1 relative font-semibold text-[1rem] sm:text-[0.875rem] leading-[2rem] font-body-small text-success text-left">
                          {details?.bs}
                        </div>
                      </div>
                      <div className=" w-[70px] relative text-[1rem] font-semibold sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                        {details?.product}
                      </div>
                      <div className=" w-[83px] relative font-semibold text-[1rem] sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                        {details?.finalCurrency.smValue}
                      </div>
                      <div className=" w-[130px] font-semibold relative text-[1rem] sm:text-[0.875rem] leading-[2rem] font-body-small text-text2 text-left inline-block shrink-0 whitespace-nowrap">
                        {details?.finalCurrency.smValue} ={" "}
                        {details?.intialCurrency.smValue} {details?.rate}
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
            <div className="w-full h-12 flex-wrap flex justify-between">
              <div
                style={{
                  boxShadow: "0px 8px 24px 0px rgba(57, 26, 0, 0.15)",
                }}
                onClick={() => {
                  setOrderDetails({ ...orderDetails, Items: [] });
                }}
                className="h-full cursor-pointer px-4 gap-3 bg-white text-[#FF3F2C] font-normal rounded-lg flex justify-center items-center "
              >
                {" "}
                <img src="/trash.svg" />
                Clear Cart
              </div>
              <div
                onClick={() => {
                  router.push("/");
                }}
                style={{
                  boxShadow: "0px 8px 24px 0px rgba(57, 26, 0, 0.15)",
                }}
                className="h-full cursor-pointer px-3 bg-[#FF9135] rounded-lg flex justify-center items-center "
              >
                + Add Products
              </div>
            </div>
          </div>
          <div className=" flex flex-col w-full laptop:w-[32%] items-center justify-center gap-[2rem] max-w-full mq900:gap-[1rem] mq900:min-w-full mq1725:flex-1">
            <div className="self-stretch shadow-[0px_2px_24px_-4px_rgba(18,_25,_56,_0.1)] rounded-3xl bg-white overflow-hidden flex flex-col items-start justify-center p-[2rem]  gap-[1rem] max-w-full">
              <div className="w-[9.188rem] relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                Order Summary
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[1.187rem] max-w-full">
                <div className="self-stretch flex flex-col items-start justify-start gap-[0.062rem] max-w-full">
                  <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block min-w-[2.125rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                      Total
                    </div>
                    <div className="relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      {amount}
                    </div>
                  </div>
                  <div className="self-stretch  flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[1.75rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap">
                    <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small text-text3 text-left inline-block min-w-[1.875rem] max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
                      GST
                    </div>
                    <div className="relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small text-text3 text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
                      {(amount * (gst - 1)).toFixed(2)}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-row items-start justify-start pt-[0.5rem] px-[0rem] pb-[0.375rem] gap-[2rem] max-w-full border-0 border-b-[1px] border-solid border-text3 mq900:flex-wrap mq450:gap-[1rem]">
                    <div className="flex-1 relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block min-w-[3.938rem] max-w-full mq450:text-[1rem]">
                      Discount
                    </div>
                    <div className="relative text-[1rem] sm:text-[1.25rem] leading-[2rem] font-normal font-body-small  text-left inline-block min-w-[3.938rem] mq450:text-[1rem] mq450:leading-[1.625rem] text-success ">
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
            <div
              onClick={() => {
                Continue();
              }}
              className=" cursor-pointer invisable xs:visable  [border:none] py-[1.125rem] pr-[1.968rem] pl-[2.468rem] bg-secondary w-full shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"

              // onClick={onCustomerDetailsClick}
            >
              <div className="flex-1 relative text-[1.5rem] leading-[2rem] font-body-small text-white text-center mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                Buy Now
              </div>
            </div>
          </div>
          {/* {size.width < 500 && (
            
          )} */}
        </form>
      </main>
    </div>
  );
};

export default Frame1;
