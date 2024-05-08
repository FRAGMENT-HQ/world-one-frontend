import FrameComponent4 from "./frame-component4";
import FrameComponent6 from "./frame-component6";
import FrameComponent5 from "./frame-component5";
import { order, user } from "@/states/storage";
import { useAtom } from "jotai";
import { useState } from "react";
import { postOrderMutation } from "@/hooks/prod";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
const MainForm = () => {
  const [orderData, setOrderData] = useAtom(order);
  const [userData, setUserData] = useAtom(user);
  const [pan, setPan] = useState(null);
  const [passportFront, setPassportFront] = useState(null);
  const [passportBack, setPassportBack] = useState(null);
  const [airTicket, setAirTicket] = useState(null);
  const [visa, setVisa] = useState(null);
  const [selected, setSelected] = useState(false)
  const router = useRouter();
  const { mutate } = postOrderMutation(
    (res) => {
      console.log(res);
      toast.success("Order placed successfully");
      router.push("/");
    },
    (err) => {
      console.log(err);
    }
  );
  const handleSubmission = () => {
    if (selected === true) {
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
        forex_rate: 1/orderData.rate,
        total_amount: orderData.amount / (orderData.rate*1.05) * 1.005,
        product: orderData.product,
        city: orderData.city,

      })
    );
    data.append("user", JSON.stringify(userData));
    mutate(data);}
  };
  return (
    <section className="w-[105.438rem] flex flex-col items-start justify-start gap-[1.75rem] max-w-full text-left text-[1.5rem] text-text2 font-body-small">
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
      
      
      
      
      <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-start justify-center py-[4rem] px-[3rem] box-border gap-[3rem] max-w-full text-[1.25rem] mq900:gap-[1.5rem] mq450:pt-[2.625rem] mq450:pb-[2.625rem] mq450:box-border mq1325:pl-[1.5rem] mq1325:pr-[1.5rem] mq1325:box-border">
        {/* <FrameComponent6 /> */}
        <FrameComponent5
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
        />
        <div className="flex items-center gap-5">
          {" "}
          <div onClick={()=>{setSelected(!selected)}} className={`cursor-pointer border-3 border-solid border-[#4F4F4F] ${ selected? "bg-darkslateblue-700" : "bg-transperent"} w-6 h-4`}></div>
          <div className="">
            I confirm that I'm in possession of valid documents as per the list
            shown above and that I haven't bought or transfered foreign currency
            for more than USD 250,000 (or equivalent in another currency) in
            the current financial year.{" "}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainForm;


const Frame = () => {
  const onFrameContainerClick = () => {
    // Please sync "Frame 160" to the project
  }

  return (
    <div
      className="w-full relative shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-[32px] bg-white overflow-hidden flex flex-col items-start justify-center py-[4rem] px-[3rem] box-border gap-[3rem] leading-[normal] tracking-[normal] cursor-pointer text-left text-[1.25rem] text-text2 font-avenir-next-lt-pro mq900:pl-[1.5rem] mq900:pr-[1.5rem] mq900:box-border mq450:gap-[1.5rem]"
      onClick={onFrameContainerClick}
    >
      <FrameComponent2 />
      <img
        className="self-stretch relative max-w-full overflow-hidden max-h-full shrink-0"
        loading="lazy"
        alt=""
        src="/vector-20.svg"
      />
      <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[3rem] max-w-full shrink-0 mq900:gap-[1.5rem]">
        <div className="relative leading-[2rem] font-medium mq450:text-[1rem] mq450:leading-[1.625rem]">
          Citizenship status
        </div>
        <div className="flex-1 rounded-lg bg-white box-border overflow-hidden flex flex-row items-center justify-between py-[0.625rem] px-[1.437rem] min-w-[55.875rem] [row-gap:20px] max-w-full gap-[0rem] text-text3 border-[1px] border-solid border-text4 mq1275:min-w-full mq1600:flex-wrap">
          <div className="w-[80.938rem] flex flex-row items-center justify-start gap-[1rem] max-w-full">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0 object-cover hidden min-h-[2rem]"
              alt=""
              src="/iconframe@2x.png"
            />
            <div className="flex-1 relative leading-[2rem] font-medium inline-block max-w-full mq450:text-[1rem] mq450:leading-[1.625rem]">
              Select
            </div>
          </div>
          <img
            className="h-[2rem] w-[2rem] relative"
            alt=""
            src="/iconsarrow-drop-down-24px-1.svg"
          />
        </div>
      </div>
      <section className="self-stretch flex flex-col items-start justify-center gap-[2rem] max-w-full shrink-0 text-left text-[1.25rem] text-text1 font-avenir-next-lt-pro mq900:gap-[1rem]">
        <div className="relative leading-[2rem] font-medium mq450:text-[1rem] mq450:leading-[1.625rem]">
          Documents Required
        </div>
        <FrameComponent1 />
        <FrameComponent />
      </section>
      
    </div>
  );
};


