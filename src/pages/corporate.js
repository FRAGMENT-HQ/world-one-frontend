import { useRouter } from "next/router";
import { submitQueryRequest } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
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


const Frame11 = () => {
  // const [userData, setUserData] = useAtom(user);
  // const [orderData, setOrderData] = useAtom(order);
  // const [panNumber, setPanNumber] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [companyName, setCompanyName] = useState();
  const [prod, setProd] = useState();
  const [code, setCode] = useState(); 
  const [open, setOpen] = useState(false);
  // const [countries, setCountries] = useState([]);
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
      query: prod.value,
      
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

  // const handleNext = () => {
  //   if (!panNumber || !/[A-Z]{5}[0-9]{4}[A-Z]{1}/.test(panNumber)) {
  //     toast.error(" valid pan number is required");
  //     return;
  //   }
  //   if (!name || name.length < 3) {
  //     toast.error("valid name is required");
  //     return;
  //   }
  //   // also validate emil using regx
  //   if (!email || !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
  //     toast.error("valid email is required");
  //     return;
  //   }
  //   // also validate phone number using regx
  //   if (!phone || !/^[6-9]+[0-9]{9}$/.test(phone)) {
  //     toast.error("Correct phone number is required");
  //     return;
  //   }

  //   setUserData({ panNumber, name, email, phone_no: phone });
  //   if (orderData.product === "Travel Services") {
  //     handleSubmission();
  //   } else {
  //     router.push("/verf");
  //   }
  // };

  return (
    <div className="w-full relative bg-background flex flex-col items-center justify-start pt-[3rem] px-[8%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
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
          <div className="sm:visible w-full w-[95%] h-[4vw] min-h-[85px] mt-0 rounded-3xl bg-secondary shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row  items-center justify-between py-[26px]  box-border top-[0] z-[99] sticky gap-[1px] latop:gap-[20px] max-w-full px-4  desktop:px-8 ">
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
        Corporate Help Desk
        </h1>
      </div>
      <section className=" flex  flex-col items-start justify-start gap-[1.75rem] min-w-full">
        <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  flex flex-col items-start justify-center py-[4rem] px-[5%] sm:px-[3rem] box-border gap-[1rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className=" text-secondary text-2xl font-semibold">
            Provide your contact details
          </div>

          <div className="w-full flex flex-col laptop:flex-row justify-between  gap-6 laptop:gap-[4%] ">
            <input
              className=" w-[calc(100% - )] font-normal laptop:w-[48%]  h-[2rem] flex-1 flex flex-row items-center justify-start text-[1.25rem] text-base text-[#000]  py-3 px-3 rounded-xl"
              placeholder="Enter Your Name"
              // type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="w-[calc(100% - )] font-normal laptop:w-[48%] h-[2rem] flex-1 flex flex-row items-center justify-start  text-[1.25rem] text-base text-[#000]  py-3 px-3 rounded-xl"
              placeholder="Enter email address"
              // type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full flex flex-col laptop:flex-row gap-6 laptop:gap-[4%]">
            <div className=" w-full laptop:w-[48%] flex flex-col sm:flex-row items-start justify-start gap-[0.75rem] max-w-full">
              <CountryCode value={code} setValue={setCode}  />
              <input
                className=" w-[96%] px-[2%] font-normal sm:w-full sm:px-3 h-[2rem] flex-1 flex flex-row items-center justify-start text-[1.25rem] text-base text-[#000]  py-3  rounded-xl"
                placeholder="Enter phone number"
                // type="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <input
              className=" w-[calc(100% - )] font-normal laptop:w-[48%]  h-[2rem] flex-1 flex flex-row items-center justify-start text-[1.25rem] text-base text-[#000]  py-3 px-3 rounded-xl"
              placeholder="Enter Company Name"
              // type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>
          
          <Select
              options={options}
              classNames={{
                container: () =>
                  " w-full  flex-1 min-w-36 text-white border-solid border-2 border-[#000] !rounded-2xl  rounded-lg bg-gray-100 py-1 sm:py-2 ",
                control: () =>
                  "self-stretch !bg-transparent !outline-none !border-none !mx-2",
                menuList: () => "!bg-secondary min-w-18",
                menu: () => "!bg-secondary min-w-18 py-2 rounded-xl",
                option: () => "text-white hover:text-midnightblue min-w-18 hover:text-secondary",
                input: () => "text-white !outline-none",
                singleValue: () => " !text-base",
                indicatorSeparator: () => "hidden",
              }}
              value={prod}
              onChange={setProd}
            />

          <div className="w-full flex justify-end ">
            <button
              // onClick={handleNext}
              className=" cursor-pointer invisable xs:visable  [border:none] py-[1.125rem] pr-[1.968rem] pl-[2.468rem] bg-secondary w-[13.813rem] shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[1rem]"
              onClick={handleSubmission}
            >
              <div className="flex-1 relative text-[1.5rem] leading-[2rem] font-body-small text-white text-left mq450:text-[1.188rem] mq450:leading-[1.625rem]">
                Continue
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frame11;
