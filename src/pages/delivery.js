const cityOptions = [
  { label: "New Delhi", value: "New Delhi", state: "Delhi" },
  { label: "Gurgaon", value: "Gurgaon", state: "Haryana" },
  { label: "Noida", value: "Noida", state: "Uttar Pradesh" },
  { label: "Kolkata", value: "Kolkata", state: "West Bengal" },
  { label: "Mumbai", value: "Mumbai", state: "Maharashtra" },
  { label: "Chandigarh", value: "Chandigarh", state: "Chandigarh" },
  { label: "Hyderabad", value: "Hyderabad", state: "Telangana" },
  { label: "Vadodara", value: "Vadodara", state: "Gujarat" },
  { label: "Lucknow", value: "Lucknow", state: "Uttar Pradesh" },
  { label: "Bangalore", value: "Bangalore", state: "Karnataka" },
  { label: "Kochi", value: "Kochi", state: "Kerala" },
  { label: "Chennai", value: "Chennai", state: "Tamil Nadu" },
  { label: "Ludhiana", value: "Ludhiana", state: "Punjab" },
  { label: "Jalandhar", value: "Jalandhar", state: "Punjab" },
  { label: "Amritsar", value: "Amritsar", state: "Punjab" },
  { label: "Ahmedabad", value: "Ahmedabad", state: "Gujarat" },
  { label: "Trichy", value: "Trichy", state: "Tamil Nadu" },
  { label: "Pune", value: "Pune", state: "Maharashtra" },
  { label: "Calicut", value: "Calicut", state: "Kerala" },
];
import InputArray from "../components/input-array";
import FrameComponent4 from "../components/frame-component4";
import FrameComponent3 from "../components/frame-component3";
import { useAtom } from "jotai";
import { user, creatOrder, order } from "@/states/storage";
import { useRouter } from "next/router";
import { locationMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Select from "react-select";
import CountryCode from "@/components/countryCode";
import countryData from "../../country2.json";
import { Switch } from "@mui/material";

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



const countryOptions = countryData.map((country) => ({
  value: country.name,
  label: country.name,
}));
const Frame11 = () => {
  const [userData, setUserData] = useAtom(user);
  const [orderData, setOrderData] = useAtom(order);
  const [orderData1, setOrderData1] = useAtom(creatOrder);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [open, setOpen] = useState(false);

  const [selected, setSelected] = useState(true);

  const [code, setCode] = useState({
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJDSURBVHja7JfNaxNBGIef2WwalaahhaaYUm1ta4tivViUHqxSRISeBG/SP0vwVPDkTfAiqIh4ED8OORRrFT8qghZrpYkxu9mdmddDYhtFwak4ufQHy+zC7Mwz837MO0pE6KQCOqxdAAVkgFyr9SkDNEKgp7J4+YsEfudXKqCwsNgXAgUJFNlDM36X/+klQCEEclgLOkHiKiBt1qHtu91q8pv3X/vwx35qTw+iGwC5EABrER0hOvazfB2DNQC0ADSkcfPxoUwWbPozgCR1JI08BX8GTBuAWIM0akhS9+eFOtnyjgkRWXH9vx5r3n+oYrAMFvMUunM7CEU1Ge4E/tmrz9x7tMrxyQEA7j95x5HRImemh/5/Ko6TlBt3XnDp/CTfooRKrcHFuQnKz9f4uF7bUSp2MkF5eY2NzYgktdx9vEqlGnNuZoSxA72srdeYPzvuZALnHWikBhGIE009SqnVU+qxBiBqtc4mcClKjo73c/vhW05OlZg9McSF06PMnRrm1oM3TE+V/nqcH3M6A+T3dTE/O8aV62X29+cZKRW4dnOJsYO9DA8WnAEUMJGm6UoYugXExmbE8usNjLEcHu6jVOx2SwNak81mm2E4fnUByQQkrezkrKdu3bsyWYLmUdDMhNoYwjBA8FOgKgXa6m0Aay2Imy/8kwSs0dtOaI1BKZ/VEFjTHgVWUPgjUKjmrm+dhghKKbq79nqDsLINYESE6malE1W5UcAAcAzo9zz5OrCkWneCfKv1qQbwVe1eTjsN8H0AbQf7MRxAQMIAAAAASUVORK5CYII=",
    label: "+91",
    value: "+91",
  });
  const [city, setCity] = useState({});
  const [State, setState] = useState({});
  const [pin, setPin] = useState("")
  const [location, setLocation] = useState("")
  const [checked, setChecked] = useState(false)
  const [defValue, setDefValue] = useState(null)



  useEffect(() => {
    setCity(orderData?.city);
    const state = cityOptions.find(
      (city) => city?.value === orderData?.city?.value
    )?.state;
    setState({
      value: state,
      label: state,
    });
  }, [orderData?.city]);
  useEffect(() => {
    if(checked){
      // alert(userData?.phone_no)
      setPhone(userData?.phone_no)
      setDefValue(userData?.country_code)
    }


  }, [checked])
  

  const router = useRouter();
  const size = useWindowSize();


  const { mutate } = locationMutation(
    (res) => {
      toast.success("Order delivery saved successfully");
      router.push("/payment");
      // handleOpen();
      // setOrderData({});
      // setOrderData1({});
    },
    (err) => {
      console.log(err);
      // handleOpen();
    }
  );

  const handleSubmission = () => {
    if (email.length < 5) {
      toast.error("Please enter a valid address");
      return;
    }
    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!/^[1-9]{1}[0-9]{5}$/.test(pin)) {
      toast.error("Please enter a valid pin code")
      return;
    }
    if (location.length < 3) {
      toast.error("Please enter a valid landmark")
      return;
    }
    mutate({
      email: userData?.email,
      phone_no: `${code.value}${phone}`,
      city: city?.value,
      state: State?.value,
      address: email,
      order: orderData1.id,
      landmark: location,
      pincode: pin

    })

  };

  const handleNext = () => {
    if (selected === true) {
      handleSubmission();
    }
  };

  return (
    <div className="w-full relative bg-background  flex flex-col items-center justify-start pt-[1.5rem] px-[1.25rem] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} route="/payment" />
      <InputArray />
      <section className=" flex flex-col items-start justify-start gap-[2.5rem] max-w-full">
        <FrameComponent4
          handleClick={handleNext}
          step={4}
          title="Order Processing"
        />
        <footer className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  flex flex-col items-center justify-center py-[1.2rem] px-[5%] sm:px-[3rem] box-border gap-[1.1rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className="self-stretch rounded-3xl bg-darkslateblue-600 overflow-hidden flex flex-row flex-wrap items-center justify-start py-[1rem] px-[2rem] box-border gap-[1.5rem] max-w-full">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/info-circle.svg"
            />
            <div className="flex-1 text-sm relative leading-[1.5rem] font-normal inline-block min-w-[59.5rem] max-w-full mq1275:min-w-full">
              Your order will be door delivered. A service charge of Rs. 100.0
              will be charged additionally.
            </div>
          </div>
          <form className="m-0 self-stretch flex flex-row flex-wrap items-center justify-center gap-[3rem] max-w-full mq900:flex-col mq900:gap-[1.5rem]">
            <div className="flex-1 flex flex-col items-start justify-center gap-[0.75rem] min-w-[95%] sm:min-w-[30rem] max-w-full ">
              <div className=" w-full flex justify-between relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                <div>Delivery Coordination Phone</div><div className="text-sm" >Use Same as previous
                  <Switch
                    checked={checked}
                    onChange={() => {
                      setChecked(!checked);
                    }}
                  /> </div>
              </div>
              <div className="self-stretch flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
                <CountryCode isDisabled={checked} border="border" value={code} setValue={setCode} defaultVal={defValue} />

                <div className="flex-1 rounded-lg bg-white box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem]  max-w-full border-[1px] border-solid border-text4">
                  <input
                    className=" w-[65%] sm:w-[42.75rem] [border:none] [outline:none] bg-[transparent] h-[2rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] text-text3 max-w-[231%] shrink-0 "
                    placeholder="Enter phone number"
                    type="phone"
                    value={phone}
                    disabled={checked}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <FrameComponent3
              travelersName="Delivery Address"
              frame18Placeholder="Enter your address"
              iconsarrowDropDown24px="/iconsarrow-drop-down-24px11.svg"
              propMinWidth="23.125rem"
              propWidth="8.25rem"
              propGap="14.956rem"
              value={email}
              setValue={setEmail}
            />
            <FrameComponent3
              travelersName="Landmark"
              frame18Placeholder="Lanmark"
              iconsarrowDropDown24px="/iconsarrow-drop-down-24px11.svg"
              propMinWidth="23.125rem"
              propWidth="8.25rem"
              propGap="14.956rem"
              value={location}
              setValue={setLocation}
            />
          </form>
          <form className="m-0 self-stretch flex flex-row flex-wrap items-center justify-center gap-[3rem] max-w-full mq900:flex-col mq900:gap-[1.5rem]">
            <FrameComponent3
              travelersName="Pin Code"
              frame18Placeholder="pin-code"
              iconsarrowDropDown24px="/iconsarrow-drop-down-24px11.svg"
              propMinWidth="23.125rem"
              propWidth="8.25rem"
              propGap="14.956rem"
              value={pin}
              setValue={setPin}
            />
            <div className="flex-1 flex flex-col items-start justify-center gap-[0.75rem] min-w-[95%] sm:min-w-[23.125rem] max-w-full mq900:min-w-full mq900:flex-[unset] mq900:self-stretch">
              <div className=" relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                City
              </div>
              <Select
                options={countryOptions}
                placeholder="Select City"
                isDisabled={true}
                value={city}
                classNames={{
                  container: () =>
                    "w-full text-white !border-none !outline-0 !rounded-3xl self-stretch rounded-lg   ",
                  control: () => "py-2 self-stretch bg-[#BDBDBD]  !rounded-xl",
                  menuList: () => "bg-midnightblue",
                  singleValue: () => "text-[#000]",
                }}
              />
            </div>
            <div className="flex-1 flex flex-col items-start justify-center gap-[0.75rem] min-w-[95%] sm:min-w-[23.125rem] max-w-full mq900:min-w-full mq900:flex-[unset] mq900:self-stretch">
              <div className=" relative text-[1.25rem] leading-[2rem] font-normal font-body-small text-text2 text-left inline-block mq450:text-[1rem] mq450:leading-[1.625rem]">
                State
              </div>
              <Select
                options={countryOptions}
                placeholder="Select State"
                isDisabled={true}
                value={State}
                classNames={{
                  container: () =>
                    "w-full text-white !border-none !outline-0 !rounded-3xl self-stretch rounded-lg   ",
                  control: () => "py-2 self-stretch bg-[#BDBDBD]  !rounded-xl",
                  menuList: () => "bg-midnightblue",
                  singleValue: () => "text-[#000]",
                }}
              />
            </div>
          </form>
          {/* <FrameComponent6 /> */}

          <div className="self-stretch rounded-3xl bg-[#FFEFE1] overflow-hidden flex flex-row flex-wrap items-center justify-start py-[1rem] px-[2rem] box-border gap-[1.5rem] max-w-full">
            <img
              className="h-[2rem] w-[2rem] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/u_clock.svg"
            />
            <div className="flex-1 text-[#333333] text-sm relative leading-[1.5rem] font-normal inline-block min-w-[59.5rem] max-w-full mq1275:min-w-full">
              For forex orders placed before 1 PM on a working day, delivery is
              scheduled on the same day. In all other instances, delivery will
              be attempted on the next working day
            </div>


          </div>
          <div className="flex items-center justify-start w-full gap-5 flex-col sm:flex-row">
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
              I confirm that I will be present myself to collect the order at the time of delivery.
            </div>
          </div>

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
