import InputArray from "../components/input-array";
import FrameComponent4 from "../components/frame-component4";
import PhoneNumberInputField from "../components/phone-number-input-field";
import FrameComponent3 from "../components/frame-component3";
import { useAtom } from "jotai";
import { user, order,authUser } from "@/states/storage";
import { useRouter } from "next/router";
import { postOrderMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Select from "react-select";
import Switch from "@mui/material/Switch";

import countryData from "../../country2.json";

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

const options2 = [
  {
    value: "Leisure/Holiday/Personal Visit",
    label: "Leisure/Holiday/Personal Visit",
  },
  { value: "Medical Treatment Abroad", label: "Medical Treatment Abroad" },
  {
    value: "Overseas Education/Study Abroad",
    label: "Overseas Education/Study Abroad",
  },
];

const countryOptions = countryData.map((country) => ({
  value: country.name,
  label: country.name,
}));
const Frame11 = () => {
  const [userData, setUserData] = useAtom(user);
  const [authUserData, setAuthUserData] = useAtom(authUser);
  const [orderData, setOrderData] = useAtom(order);
  const [panNumber, setPanNumber] = useState( userData?.panNumber || "");
  const [name, setName] = useState( authUserData?.user?.name || userData?.name || "");
  const [email, setEmail] = useState( authUserData?.user?.email || userData?.email || "");
  const [phone, setPhone] = useState( authUserData?.user?.phone_no || userData?.phone_no || "");
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [status, setStatus] = useState(false);
  const [purpous, setPurpous] = useState({});
  const [code, setCode] = useState({
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJDSURBVHja7JfNaxNBGIef2WwalaahhaaYUm1ta4tivViUHqxSRISeBG/SP0vwVPDkTfAiqIh4ED8OORRrFT8qghZrpYkxu9mdmddDYhtFwak4ufQHy+zC7Mwz837MO0pE6KQCOqxdAAVkgFyr9SkDNEKgp7J4+YsEfudXKqCwsNgXAgUJFNlDM36X/+klQCEEclgLOkHiKiBt1qHtu91q8pv3X/vwx35qTw+iGwC5EABrER0hOvazfB2DNQC0ADSkcfPxoUwWbPozgCR1JI08BX8GTBuAWIM0akhS9+eFOtnyjgkRWXH9vx5r3n+oYrAMFvMUunM7CEU1Ge4E/tmrz9x7tMrxyQEA7j95x5HRImemh/5/Ko6TlBt3XnDp/CTfooRKrcHFuQnKz9f4uF7bUSp2MkF5eY2NzYgktdx9vEqlGnNuZoSxA72srdeYPzvuZALnHWikBhGIE009SqnVU+qxBiBqtc4mcClKjo73c/vhW05OlZg9McSF06PMnRrm1oM3TE+V/nqcH3M6A+T3dTE/O8aV62X29+cZKRW4dnOJsYO9DA8WnAEUMJGm6UoYugXExmbE8usNjLEcHu6jVOx2SwNak81mm2E4fnUByQQkrezkrKdu3bsyWYLmUdDMhNoYwjBA8FOgKgXa6m0Aay2Imy/8kwSs0dtOaI1BKZ/VEFjTHgVWUPgjUKjmrm+dhghKKbq79nqDsLINYESE6malE1W5UcAAcAzo9zz5OrCkWneCfKv1qQbwVe1eTjsN8H0AbQf7MRxAQMIAAAAASUVORK5CYII=",
    label: "+91",
    value: "+91",
  });; 
  const router = useRouter();
  const size = useWindowSize();

  const handleOpen = () => {
    setOpen(true);
    // if(checked){
  };
  const { mutate } = postOrderMutation(
    (res) => {
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
        currency: orderData?.finalCurrency?.value ? orderData?.finalCurrency?.value : "INR",
        
        amount: 0,
        forex_rate: 0,
        total_amount: 0,
        product: orderData?.product,
        city: orderData?.city?.value,
        purpous: orderData?.type=="Transfer Money Abroad" ? "Overseas Education/Study Abroad" : purpous?.value,
      })
    );
    data.append("user", JSON.stringify(userData));
    data.append("name", "");
    mutate(data);
  };

  const handleNext = () => {
    if ((orderData?.product != "Travel Services" || status) ) {
      if (!panNumber || !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(panNumber)) {
        toast.error("Valid PAN number is required");
        return;
      }
    }
    if (!name || name.length < 3) {
      toast.error("valid name is required");
      return;
    }
    // also validate emil using regx
    if (!email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      toast.error("valid email is required");
      return;
    }
    // also validate phone number using regx
    if (!phone || !/^[6-9]+[0-9]{9}$/.test(phone)) {
      toast.error("Correct phone number is required");
      return;
    }

    setUserData({ panNumber, name, email, phone_no: `${phone}`,country_code: code.value});
    if (orderData.product === "Travel Services") {
      handleSubmission();
    } else {
      setOrderData({
        ...orderData,
        countries: countries,
        purpous: purpous?.value,
        citizinShip: status ? "Indian/NRI" : "Forigner",
        purpous: purpous?.value,
      });
      router.push("/verf");
    }
  };

  return (
    <div className="w-full relative bg-background  flex flex-col items-center justify-start pt-[1.5rem] px-[1.25rem] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      <InputArray />
      <section className=" flex flex-col items-start justify-start gap-[2.5rem] max-w-full">
        <FrameComponent4
          handleClick={handleNext}
          step={2}
          title="Customer Details"
        />
        <footer className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  flex flex-col items-center justify-center py-[1.2rem] px-[5%] sm:px-[3rem] box-border gap-[1.1rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className="self-stretch flex flex-row flex-wrap items-end justify-start gap-[3rem] max-w-full shrink-0 ">
            {orderData?.type == "cart" && (
              <div className="flex-1 w-full rounded-lg bg-white box-border  flex flex-col items-start justify-between max-w-full gap-[0.75rem] text-[#000] border-[0px] border-solid border-text4  mq1600:flex-wrap">
                <div className="relative leading-[2rem] text-[1.25rem] text-text2 font-normal mq450:text-[1rem] ">
                  Purpose of Visit
                </div>
                <div className=" flex-1 flex flex-row items-center justify-start gap-[1rem] w-full">
                  <Select
                    options={options2}
                    isSearchable={true}
                    value={purpous}
                    onChange={(e) => setPurpous(e)}
                    classNames={{
                      container: () =>
                        "w-full text-white !rounded-3xl self-stretch rounded-lg bg-gray-100  ",
                      control: () =>
                        "py-1 self-stretch bg-transparent  !rounded-xl",
                      menuList: () => "bg-midnightblue",
                    }}
                  />
                </div>
              </div>
            )}
            { orderData?.product != "Travel Services" && <div className="flex gap-[20vw]" >
                <div> Are you an Indian Resident (including NRIs)</div>
                <Switch
                  checked={status}
                  onChange={() => {
                    setStatus(!status);
                  }}
                />
              </div>}
          </div>
          <PhoneNumberInputField
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            code={code}
            setCode={setCode}
          />
          {/* <FrameComponent6 /> */}
          {orderData?.type == "cart" && (
            <div className="w-full flex flex-col justify-start gap-3">
              <div className="relative text-[1.25rem] leading-[2rem] font-normal inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                Countries Visting to
              </div>
              <Select
                isMulti
                values={countries}
                onChange={(value) => {
                  setCountries(value);
                }}
                placeholder="Select Visting Countries"
                options={countryOptions}
                classNames={{
                  container: () =>
                    "w-full !underline-offset-2 px-0  text-white !rounded-xl border-2  ",
                  control: () =>
                    "self-stretch r !font-semibold !rounded-[1.2rem] !border-2 px-4 py-2   ",
                  menuList: () => "!bg-midnightblue hover:text-white",
                  option: () => "text-white hover:text-midnightblue",
                  input: () => "!text-center ",
                  singleValue: () => "!text-white !text-sm",
                  indicatorSeparator: () => "hidden",
                }}
              />
            </div>
          )}
          {orderData?.type != "Travel Services" && status && (
            <div className="self-stretch flex flex-row flex-wrap items-center justify-center gap-[3rem] max-w-full mq900:gap-[1.5rem]">
              <FrameComponent3
                travelersName="PAN number"
                frame18Placeholder="Enter full name"
                iconsarrowDropDown24px="/iconsarrow-drop-down-24px.svg"
                propMinWidth="23rem"
                // propWidth="7.3rem"
                propGap="15rem"
                value={panNumber}
                setValue={setPanNumber}
              />
            </div>
          )}

          {size.width < 500 && (
            <button
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
            </button>
          )}
        </footer>
      </section>
    </div>
  );
};

export default Frame11;
