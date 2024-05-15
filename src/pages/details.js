import InputArray from "../components/input-array";
import FrameComponent4 from "../components/frame-component4";
import PhoneNumberInputField from "../components/phone-number-input-field";
import FrameComponent3 from "../components/frame-component3";
import { useState } from "react";
import { useAtom } from "jotai";
import { user,order } from "@/states/storage";
import { useRouter } from "next/router";
import { postOrderMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";

const Frame11 = () => {
  const [userData, setUserData] = useAtom(user);
  const [orderData, setOrderData] = useAtom(order);
  const [panNumber, setPanNumber] = useState(userData?.panNumber || "");
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [open, setOpen] = useState(false);
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
      // handleOpen();
    }
  );

  const handleSubmission = () => {
    
        const data = new FormData();
        data.append(
          "order",
          JSON.stringify({
            currency: orderData.finalCurrency.value,
            amount: 0,
            forex_rate: 0,
            total_amount: 0,
            product: orderData.product,
            city: orderData.city.value,
          })
        );
        data.append("user", JSON.stringify(userData));
        mutate(data);
      
  };

  const handleNext = () => {
    if (!panNumber ) {
      toast.error("pan number is required");
      return;
    }
    if (!name) {
      toast.error("name is required");
      return;
    }
    // also validate emil using regx
    if (!email) {
      toast.error("email is required");
      return;
    }
    if (!phone && phone.length < 10) {
      toast.error("Correct phone number is required");
      return;
    }
    
    setUserData({ panNumber, name, email, phone_no:phone });
    if(orderData.product === "Travel Insurance"){
      handleSubmission();
    }
    else{
    router.push("/verf");}
  }
  

  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-start pt-[3rem] px-[1.25rem] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      <InputArray />
      <section className=" flex flex-col items-start justify-start gap-[1.75rem] max-w-full">
        <FrameComponent4 

        handleClick={handleNext}
        
        step={2} title="Order Details" />
        <footer className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white overflow-hidden flex flex-col items-center justify-center py-[4rem] px-[5%] sm:px-[3rem] box-border gap-[3rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <PhoneNumberInputField
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          />
          {/* <FrameComponent6 /> */}
          <div className="self-stretch flex flex-row flex-wrap items-center justify-center gap-[3rem] max-w-full mq900:gap-[1.5rem]">
            <FrameComponent3
              travelersName="PAN number"
              frame18Placeholder="Enter full name"
              iconsarrowDropDown24px="/iconsarrow-drop-down-24px.svg"
              propMinWidth="23rem"
              propWidth="7.3rem"
              propGap="15rem"
              value={panNumber}
              setValue={setPanNumber}
            />
            {/* <FrameComponent5
              startingDate="Starting Date"
              frame18Placeholder="Travel start date"
            />
            <FrameComponent5
              startingDate="Ending Date"
              frame18Placeholder="Travel end date"
              propWidth="7rem"
            /> */}
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Frame11;
