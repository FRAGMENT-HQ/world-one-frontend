import FrameComponent4 from "./frame-component4";
import FrameComponent5 from "./frame-component5";
import { order, user } from "@/states/storage";
import { useAtom } from "jotai";
import { useState, useEffect } from "react";
import { postOrderMutation } from "@/hooks/prod";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Smodal from "./smodal";

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

const MainForm = () => {
  const [orderData, setOrderData] = useAtom(order);
  const [userData, setUserData] = useAtom(user);
  const [pan, setPan] = useState(null);
  const [passportFront, setPassportFront] = useState(null);
  const [passportBack, setPassportBack] = useState(null);
  const [airTicket, setAirTicket] = useState(null);
  const [visa, setVisa] = useState(null);
  const [selected, setSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(
    orderData?.type == "Transfer Money Abroad" ? true : false
  );
  const [extraFile, setExtraFile] = useState(null);
  const [purpous, setPurpous] = useState(
    orderData?.type == "Transfer Money Abroad"
      ? "Overseas Education/Study Abroad"
      : null
  );
  const [cPan, setCPan] = useState(null);

  const getName = () => {
    
    switch (purpous) {

      case null:
        return false;
      case "Medical Treatment Abroad":
        return "Hospital Bill";
      case "Overseas Education/Study Abroad":
        return "Admission letter";
      case "Business":
        return "LERMS Letter";
      default:
        return false;
    }
  };

  const size = useWindowSize();

  const router = useRouter();
  const handleOpen = () => {
    setOpen(true);
    // if(checked){
  };
  const { mutate } = postOrderMutation(
    (res) => {
      toast.success("Order placed successfully");
      if(orderData?.type == "cart"){
        router.push("/delivery");
      }
      else{
      handleOpen();}
    },
    (err) => {
      console.log(err);
    }
  );

  const handleSubmission = () => {
    if (selected === true) {
      // if (getName() && !extraFile) {
      //   toast.error("upload all files");
      //   return;
      // }
      // if (orderData?.product !== "Transfer Money Abroad") {
      //   if (Object.keys(purpous).length == 0) {
      //     toast.error("Please select a purpous");
      //     return;
      //   }

      // }
      // if (!pan || !passportFront || !passportBack) {
      //   toast.error("upload all files");
      //   return;
      // }
      // make a string coitaing all countries

      const countryString = orderData.countries.reduce((acc, country) => {
        return acc + `${country.value},`;
      }, "");
      const orderItems = orderData.orderItems.map((item) => {
        return {
          product: item.product,
          currency: item.currency,
          inr_amount: item.amount,
          forex_rate: item.rate,
          forex_amount: item.forexAmount,
          bs: item.bs,
          currency: item.finalCurrency.smValue,
        };
      });

      const data = new FormData();
      data.append("pan", pan);
      data.append("passport_front", passportFront);
      data.append("passport_back", passportBack);
      data.append("air_ticket", airTicket);
      data.append("visa", visa);
      data.append("extra_file", extraFile);
      data.append("c_pan", cPan);
      data.append("purous_of_visit", orderData.purpous);
      data.append("name", getName());
      data.append(
        "order",
        JSON.stringify({
          // currency: orderData.finalCurrency.value,
          amount: 0,
          forex_rate: orderData.rate,
          total_amount: 0,
          product: orderData.product,
          city: orderData.city.value,
          gst_amount: orderData.gst,
          countries: countryString,

          purpous: purpous,
        })
      );
      data.append("items", JSON.stringify(orderItems));
      data.append("user", JSON.stringify(userData));
      mutate(data);
    } else {
      toast.error("Please confirm the statement");
    }
  };

  return (
    <section className="flex flex-col items-start justify-start gap-[1.75rem] pb-10 max-w-full text-left text-[1.5rem] text-text2 font-body-small">
      <Smodal
        open={open}
        route={"/delivery"}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <FrameComponent4
        title="Document Verification"
        handleClick={handleSubmission}
        step={3}
      />
      {/* <FrameComponent2 /> */}
      {/* <img
        className="self-stretch relative max-w-full overflow-hidden max-h-full shrink-0"
        loading="lazy"
        alt=""
        src="/vector-20.svg"
      /> */}

      <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-center py-[6rem] sm:py-[2.5rem] px-[1rem] sm:px-[3rem] box-border gap-[3rem] max-w-full text-[1.25rem] mq900:gap-[1.5rem] mq450:pt-[2.625rem] mq450:pb-[2.625rem] mq450:box-border mq1325:pl-[1.5rem] mq1325:pr-[1.5rem] mq1325:box-border">
        {/* <FrameComponent6 /> */}
        <FrameComponent5
          airTicketState={
            orderData?.product == "Transfer Money Abroad"
              ? false
              : orderData?.bs == "Buy"
          }
          pan={pan}
          setPan={setPan}
          cPan={cPan}
          setCPan={setCPan}
          passportFront={passportFront}
          setPassportFront={setPassportFront}
          passportBack={passportBack}
          setPassportBack={setPassportBack}
          airTicket={airTicket}
          setAirTicket={setAirTicket}
          visa={visa}
          setVisa={setVisa}
          checked={checked}
          setChecked={setChecked}
          extraFile={extraFile}
          setExtraFile={setExtraFile}
          name={getName()}
          setPurpous={setPurpous}
          purpous={purpous}
          orderData={orderData}
          showPan={orderData?.type == "Cart"}
        />
        <div className="flex items-center gap-5 flex-col sm:flex-row">
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
              className={` flex justify-center items-center cursor-pointer border-3 border-solid border-[#4F4F4F] ${selected ? "" : "bg-transperent"} h-4 w-6`}
            ></div>
          )}

          <div className=" text-[15px] text-left sm:text-inherit ">
            I confirm that I'm in possession of valid documents as per the list
            shown above and that I haven't bought or transfered foreign currency
            for more than USD 250,000 (or equivalent in another currency) in the
            current financial year.{" "}
          </div>
        </div>
        {size.width < 500 && (
          <button
            onClick={handleSubmission}
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
      </div>
    </section>
  );
};

export default MainForm;
