import InputArray from "../components/input-array";
import FrameComponent4 from "../components/frame-component4";
import PhoneNumberInputField from "../components/phone-number-input-field";
import FrameComponent3 from "../components/frame-component3";

import { useAtom } from "jotai";
import { user,order } from "@/states/storage";
import { useRouter } from "next/router";
import { postOrderMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from 'react'
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
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
  return windowSize;}
const Frame11 = () => {
  const [userData, setUserData] = useAtom(user);
  const [orderData, setOrderData] = useAtom(order);
  const [panNumber, setPanNumber] = useState(userData?.panNumber || "");
  const [name, setName] = useState(userData?.name || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const size = useWindowSize();

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
          {size.width <500 && <button
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
        </button>}
        </footer>
      </section>
    </div>
  );
};

export default Frame11;
