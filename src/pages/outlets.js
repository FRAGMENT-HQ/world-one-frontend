import { useAtom } from "jotai";
import { user, order } from "@/states/storage";
import { useRouter } from "next/router";
import { postOrderMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import Drawer from "@mui/material/Drawer";
import countryData from "../../country2.json";
import CountryCode from "@/components/countryCode";
import Select from "react-select";

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

const countryOptions = countryData.map((country) => ({
  value: country.name,
  label: country.name,
}));
const Outlets = () => {
  const [userData, setUserData] = useAtom(user);
  const [orderData, setOrderData] = useAtom(order);
  const [panNumber, setPanNumber] = useState(userData?.panNumber || "");
  const [name, setName] = useState();
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([]);
  const [drawerOpen, setdrawerOpen] = useState(false);
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
    if (!panNumber || !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(panNumber)) {
      toast.error(" valid pan number is required");
      return;
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

    setUserData({ panNumber, name, email, phone_no: phone });
    if (orderData.product === "Travel Services") {
      handleSubmission();
    } else {
      router.push("/verf");
    }
  };

  return (
    <div className="w-full relative bg-background flex flex-col items-center justify-start pt-[3rem] px-[5%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      {/* <InputArray /> */}
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setdrawerOpen(false);
        }}
      >
        <div className="w-[100vw] h-[100vh] bg-darkslateblue-700">
          <div className=" sm:visible w-full mt-5  rounded-3xl flex flex-col items-center justify-between py-[26px] px-16 box-border top-[0] z-[99] sticky gap-[20px] max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
            <div className="w-[75%] flex flex-col items-center justify-center text-[15px] font-semibold">
              <div className="flex flex-col text-white  gap-[15%] ">
                <div className=" flex  items-center justify-center py-1 ">
                  <div
                    onClick={() => {
                      setdrawerOpen(false);
                      scroll("#about");
                    }}
                    className=" cursor-pointer text-white relative leading-[32px] inline-block "
                  >
                    About
                  </div>
                </div>
                <div className="  shrink-0 flex flex-row items-center justify-center py-1  box-border">
                  <div
                    onClick={() => {
                      setdrawerOpen(false);
                      scroll("#services");
                    }}
                    className="cursor-pointer relative leading-[32px]"
                  >
                    Services
                  </div>
                </div>
                <div
                  onClick={() => {
                    router.push("/rates");
                  }}
                  className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                >
                  <div className="relative leading-[32px]">Rates</div>
                </div>
                {/* <div className=" flex flex-row items-center justify-center py-1 ">
                        <div className="relative leading-[32px] inline-block ">
                          Support
                        </div>
                      </div> */}
                <div
                  onClick={() => {
                    setdrawerOpen(false);
                    scroll("#blogs");
                  }}
                  className="  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                >
                  <div className="relative leading-[32px]">Blogs</div>
                </div>
              </div>
            </div>
            <div className="flex gap-[5%] flex-col-reverse items-center w-full">
              <div
                onClick={() => {
                  setdrawerOpen(false);
                  scroll("#mail");
                }}
                className="cursor-pointer w-[10rem] h-8 mt-3 rounded-xl bg-white overflow-hidden flex flex-row items-center justify-start py-2 pr-[18px] pl-4 box-border gap-[12px]"
              >
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  alt=""
                  src="/support.svg"
                />
                <div className="relative text-base !text-[#27357E]  inline-block ">
                  Contact Us
                </div>
              </div>

              <div
                onClick={() => {
                  router.push("/rates");
                }}
                className="cursor-pointer w-[10rem] h-8 mt-3 rounded-xl bg-white overflow-hidden flex flex-row items-center justify-start py-2 pr-[18px] pl-4 box-border gap-[12px]"
              >
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0"
                  alt=""
                  src="/FOREX.svg"
                />
                <div className="relative text-base  !text-[#27357E]  inline-block ">
                  Forex Rates
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="self-stretch flex  flex-row items-start justify-center py-0  box-border w-full">
        <div className=" flex flex-col items-end  justify-start gap-[50px] w-full mq825:gap-[49px_98px] mq450:gap-[24px_98px]   ">
          <div className="sm:visible w-full w-[95%] h-[4vw] min-h-[85px] mt-0 rounded-3xl  bg-secondary bg-secondary shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row  items-center justify-between py-[26px]  box-border top-[0] z-[99] sticky gap-[1px] latop:gap-[20px] max-w-full px-4  desktop:px-8 ">
            <img
              className=" h-[60px] sm:h-[60px] sm:w-[180px] relative"
              loading="lazy"
              alt=""
              src="LOGO.svg"
            />
            {size.width > 600 ? (
              <>
                {" "}
                <div className="w-[75%] flex flex-row items-center justify-center text-[15px] font-semibold mq825:hidden">
                  <div className="flex gap-[10%] laptop:gap-[15%] ">
                    <div className=" flex flex-row items-center laptop:text-base !text:xs justify-center py-1 ">
                      <div
                        onClick={() => {
                          scroll("#about");
                        }}
                        className=" cursor-pointer relative leading-[32px] inline-block "
                      >
                        About
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        router.push("/rates");
                      }}
                      className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                    >
                      <div className="relative leading-[32px]">Rates</div>
                    </div>
                    <div className="  shrink-0 flex flex-row items-center justify-center py-1  box-border">
                      <div
                        onClick={() => {
                          scroll("#services");
                        }}
                        className="cursor-pointer relative leading-[32px]"
                      >
                        Services
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setdrawerOpen(false);
                        scroll("#blogs");
                      }}
                      className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                    >
                      <div className="relative leading-[32px]">Blogs</div>
                    </div>
                  </div>
                </div>
                <div className="flex h-16 gap-[12%] items-center flex-row">
                  <div className=" text-[#FF9135] font-semibold text-sm ">
                    Login
                  </div>

                  <div
                    onClick={() => {
                      scroll("#mail");
                    }}
                    className="cursor-pointer w-[11rem] h-10 rounded-xl bg-[#3c498b4d] overflow-hidden flex flex-row items-center justify-start py-2 pr-[12px] pl-4 box-border gap-[12px]"
                  >
                    <img
                      className="h-6 w-6 relative overflow-hidden shrink-0"
                      alt=""
                      src="/newSupport.svg"
                    />
                    <div className="relative text-base text-semibold !text-white  inline-block ">
                      Contact Us
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div
                onClick={() => {
                  setdrawerOpen(true);
                }}
                className="cursor-pointer flex gap-1 h-5 flex-col"
              >
                {/* three line using divs */}
                <div className="w-[20px] h-0.5 bg-white"></div>
                <div className="w-[20px] h-0.5 bg-white"></div>
                <div className="w-[20px] h-0.5 bg-white"></div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
        <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-bold font-inherit inline-block max-w-full ">
          World One Forex Locations
        </h1>
      </div>
      <div className="w-full text-left ">
        Book your forex order online in India and complete your order at any of
        the following forex locations
      </div>
      <section className=" flex  flex-col items-start justify-start gap-[1.75rem] min-w-full">
        <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  flex flex-row items-center justify-start py-8 px-[5%] sm:px-[3rem] box-border gap-[5vw]  max-w-full">
          <div className="flex flex-col gap-1 items-center ">
            <img className=" w-[8vw] laptop:w-20" src="/LotusTemple.svg" />
            <div className="text-secondary text-[1.5vw] laptop:text-base font-semibold">New Delhi</div>
          </div>
          <div className="flex text-lg flex-col gap-3">
            <div className="text-secondary font-semibold">
              World One India Forex Pvt. Ltd.
            </div>
            <div className=" text-sm font-normal">
              Shop No. 1, S 1, Ground Floor, American Plaza, Eros <br /> Hotel,
              Nehru Place, New Delhi, Delhi 110019
            </div>
          </div>
          <div className="flex text-lg flex-col gap-3">
            <div className="text-secondary font-semibold">Office Hours</div>
            <div className="text-text2 flex flex-col gap-1 text-sm font-semibold">
              <div>9:30 AM - 6:30 PM</div>
              <div>9:30 AM - 6:30 PM</div>
            </div>
          </div>
          <div className="flex text-lg flex-col gap-3">
            <div className="text-white font-semibold">o</div>
            <div className="text-text2 flex flex-col gap-1 text-sm font-semibold">
              <div>(Monday - Friday)</div>
              <div>(Saturday - Sunday)</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Outlets;
