import FrameComponent4 from "./frame-component4";
import FrameComponent6 from "./frame-component6";
import FrameComponent5 from "./frame-component5";
import { order,user } from "@/states/storage";
import { useAtom } from "jotai";
import { useState } from "react";
import { postOrderMutation } from "@/hooks/prod"
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
  const router = useRouter();
  const {mutate} = postOrderMutation(
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
    const data = new FormData();
    data.append("pan", pan);
    data.append("passport_front", passportFront);
    data.append("passport_back", passportBack);
    data.append("air_ticket", airTicket);
    data.append("visa", visa);
    data.append("order", JSON.stringify({currency: orderData.finalCurrency.value,
      amount: orderData.amount,
      forex_rate: orderData.rate,
      total_amount: orderData.amount * orderData.rate * 1.18,
    }));
    data.append("user", JSON.stringify(userData));
    mutate(data);
  }
  return (
    <section className="w-[105.438rem] flex flex-col items-start justify-start gap-[1.75rem] max-w-full text-left text-[1.5rem] text-text2 font-body-small">
      <FrameComponent4 title="document verification"  handleClick={handleSubmission}  step={3} />
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
      </div>
    </section>
  );
};

export default MainForm;
