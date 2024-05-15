import FrameComponent4 from "./frame-component4";
import FrameComponent6 from "./frame-component6";
import FrameComponent5 from "./frame-component5";
import { order, user } from "@/states/storage";
import { useAtom } from "jotai";
import { useState } from "react";
import { postOrderMutation } from "@/hooks/prod";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import Smodal from "./smodal";
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
  const [checked, setChecked] = useState(false);
  const router = useRouter();
  const handleOpen = () => {
    setOpen(true);
    // if(checked){
  };
  const { mutate } = postOrderMutation(
    (res) => {
      console.log(res);
      toast.success("Order placed successfully");
      handleOpen();
    },
    (err) => {
      console.log(err);
    }
  );

  const handleSubmission = () => {
    if (selected === true) {
      if (
        (checked &&
          visa &&
          passportBack &&
          passportFront &&
          pan &&
          airTicket ^ (orderData?.bs == "Buy")) ||
        (passportBack &&
          passportFront &&
          pan &&
          airTicket ^ (orderData?.bs == "Buy"))
      ) {
        const data = new FormData();
        data.append("pan", pan);
        data.append("passport_front", passportFront);
        data.append("passport_back", passportBack);
        data.append("air_ticket", airTicket);
        data.append("visa", visa);
        data.append(
          "order",
          JSON.stringify({
            currency: orderData.finalCurrency.value,
            amount: orderData.amount,
            forex_rate: orderData.rate,
            total_amount: orderData.inrAmount  * 1.005,
            product: orderData.product,
            city: orderData.city.value,
          })
        );
        data.append("user", JSON.stringify(userData));
        mutate(data);
      } else {
        toast.error("upload all files");
      }
    } else {
      toast.error("Please confirm the statement");
    }
  };

  return (
    <section className="flex flex-col items-start justify-start gap-[1.75rem] pb-10 max-w-full text-left text-[1.5rem] text-text2 font-body-small">
      <Smodal
        open={open}
        handleClose={() => {
          setOpen(false);
        }}
      />
      <FrameComponent4
        title="document verification"
        handleClick={handleSubmission}
        step={3}
      />
      {/* <FrameComponent2 /> */}
      <img
        className="self-stretch relative max-w-full overflow-hidden max-h-full shrink-0"
        loading="lazy"
        alt=""
        src="/vector-20.svg"
      />

      <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-center py-[6rem] sm:py-[4rem] px-[1rem] sm:px-[3rem] box-border gap-[3rem] max-w-full text-[1.25rem] mq900:gap-[1.5rem] mq450:pt-[2.625rem] mq450:pb-[2.625rem] mq450:box-border mq1325:pl-[1.5rem] mq1325:pr-[1.5rem] mq1325:box-border">
        {/* <FrameComponent6 /> */}
        <FrameComponent5
          airTicketState={orderData?.bs == "Buy"}
          pan={pan}
          setPan={setPan}
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
        />
        <div className="flex items-center gap-5 flex-col sm:flex-row">
          {" "}
          <div
            onClick={() => {
              setSelected(!selected);
            }}
            className={` flex justify-center items-center cursor-pointer border-3 border-solid border-[#4F4F4F] ${selected ? "" : "bg-transperent"} sm:w-6 w-4 h-6 sm:h-4`}
          >
           { selected && <img className=" sm:w-6 w-4 h-4 sm:h-6"  src="tick.png" />}
          </div>
          <div className=" text-[15px] text-center sm:text-inherit ">
            I confirm that I'm in possession of valid documents as per the list
            shown above and that I haven't bought or transfered foreign currency
            for more than USD 250,000 (or equivalent in another currency) in the
            current financial year.{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainForm;
