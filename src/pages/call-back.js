import { useRouter } from "next/router";
import { submitQueryRequest } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import Drawer from "@mui/material/Drawer";
// import countryData from "../../country2.json";
import CountryCode from "@/components/countryCode";
import Select from "react-select";
import Navbar from "@/components/navbar";
const options = [
  { value: "Exchange Currency", label: "Exchange Currency" },
  { value: "Transfer Money Abroad", label: "Transfer Money Abroad" },
  { value: "Forex Card", label: "Forex Card" },
  { value: "Travel Services", label: "Travel Services" },
];

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
  return windowSize;
}

const Frame11 = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [open, setOpen] = useState(false);
  const [querry, setQuerry] = useState();
  const [code, setCode] = useState({
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJDSURBVHja7JfNaxNBGIef2WwalaahhaaYUm1ta4tivViUHqxSRISeBG/SP0vwVPDkTfAiqIh4ED8OORRrFT8qghZrpYkxu9mdmddDYhtFwak4ufQHy+zC7Mwz837MO0pE6KQCOqxdAAVkgFyr9SkDNEKgp7J4+YsEfudXKqCwsNgXAgUJFNlDM36X/+klQCEEclgLOkHiKiBt1qHtu91q8pv3X/vwx35qTw+iGwC5EABrER0hOvazfB2DNQC0ADSkcfPxoUwWbPozgCR1JI08BX8GTBuAWIM0akhS9+eFOtnyjgkRWXH9vx5r3n+oYrAMFvMUunM7CEU1Ge4E/tmrz9x7tMrxyQEA7j95x5HRImemh/5/Ko6TlBt3XnDp/CTfooRKrcHFuQnKz9f4uF7bUSp2MkF5eY2NzYgktdx9vEqlGnNuZoSxA72srdeYPzvuZALnHWikBhGIE009SqnVU+qxBiBqtc4mcClKjo73c/vhW05OlZg9McSF06PMnRrm1oM3TE+V/nqcH3M6A+T3dTE/O8aV62X29+cZKRW4dnOJsYO9DA8WnAEUMJGm6UoYugXExmbE8usNjLEcHu6jVOx2SwNak81mm2E4fnUByQQkrezkrKdu3bsyWYLmUdDMhNoYwjBA8FOgKgXa6m0Aay2Imy/8kwSs0dtOaI1BKZ/VEFjTHgVWUPgjUKjmrm+dhghKKbq79nqDsLINYESE6malE1W5UcAAcAzo9zz5OrCkWneCfKv1qQbwVe1eTjsN8H0AbQf7MRxAQMIAAAAASUVORK5CYII=",
    label: "+91",
    value: "+91",
  });
  const [drawerOpen, setdrawerOpen] = useState(false);
  const router = useRouter();
  const size = useWindowSize();

  const handleOpen = () => {
    setOpen(true);
    // if(checked){
  };

  const handleSubmission = () => {
    const data = {
      name: name,
      email: email,
      phone_no: `${code.value}${phone}`,
      query: querry,
    };

    submitQueryRequest(data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Query submitted successfully");
          router.push("/");
        }
      })
      .catch((err) => {
        toast.error("Query submission failed");
      });
  };

  const handleNext = () => {};

  return (
    <div className="w-full relative bg-background flex flex-col items-center justify-start pt-[3rem] px-[8%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      {/* <InputArray /> */}
      
      <Navbar />
      <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
        <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-semibold font-inherit inline-block max-w-full ">
          Request Call Back
        </h1>
      </div>
      <section className=" flex  flex-col items-start justify-start gap-[1.75rem] min-w-full">
        <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  flex flex-col items-start justify-center py-[4rem] px-[5%] sm:px-[3rem] box-border gap-[1rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className=" text-secondary text-2xl font-semibold">
            Provide your contact details
          </div>

          <div className="w-full flex flex-col laptop:flex-row justify-between  gap-6 laptop:gap-[4%] ">
            <input
              className=" w-[calc(100% - )] laptop:w-[48%] font-normal h-[2rem] flex-1 flex flex-row items-center justify-start text-[1.25rem] text-base text-[#000]  py-3 px-3 rounded-xl"
              placeholder="Enter Your Name"
              // type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-[calc(100% - )] laptop:w-[48%] font-normal h-[2rem] flex-1 flex flex-row items-center justify-start  text-[1.25rem] text-base text-[#000]  py-3 px-3 rounded-xl"
              placeholder="Enter email address"
              // type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col laptop:flex-row gap-6 laptop:gap-[4%]">
            <div className=" w-full laptop:w-[48%] flex flex-col sm:flex-row items-start justify-start gap-[0.75rem] max-w-full">
              <CountryCode value={code} setValue={setCode} />
              <input
                className=" w-[96%] px-[2%] sm:w-full sm:px-3 h-[2rem] flex-1 flex flex-row items-center justify-start text-[1.25rem] text-base text-[#000]  py-3  rounded-xl"
                placeholder="Enter phone number"
                // type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <Select
              options={options}
              classNames={{
                container: () =>
                  " w-full laptop:w-[48%] flex-1 min-w-36 text-white border-solid border-2 border-[#000] !rounded-2xl rounded-lg bg-gray-100 py-1 sm:py-2 ",
                control: () =>
                  "self-stretch !bg-transparent !outline-none !border-none !mx-2",
                menuList: () => "!bg-secondary min-w-18",
                menu: () => "!bg-secondary min-w-18 py-2 rounded-xl",
                option: () =>
                  "text-white hover:text-midnightblue min-w-18 hover:text-secondary",
                input: () => "text-white !outline-none",
                singleValue: () => "font-normal !text-base",
                indicatorSeparator: () => "hidden",
              }}
            />
          </div>
          <textarea
            placeholder="Briefly tell us about your issue..."
            className="w-[calc(100%-48px)] font-normal py-2 px-[24px] h-[32rem] flex-1 flex flex-row items-center justify-start text-[1.25rem] text-base text-[#000]    rounded-xl"
            rows="5"
            value={querry}
            onChange={(e) => setQuerry(e.target.value)}
          />
          {/* <PhoneNumberInputField
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
          /> */}
          {/* <FrameComponent6 /> */}

          <div className="w-full flex justify-end ">
            <button
              onClick={handleSubmission}
              className=" cursor-pointer invisable xs:visable  [border:none] py-[1.125rem] pr-[1.968rem] pl-[2.468rem] bg-secondary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"
              // onClick={onCustomerDetailsClick}
            >
              <div className="flex-1 relative text-[1.5rem] leading-[2rem] font-body-small text-white text-center mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                Submit
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frame11;
