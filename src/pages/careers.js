import { useRouter } from "next/router";

import { useState, useEffect, useRef } from "react";
import { submitMutation } from "@/hooks/prod";
import Navbar from "@/components/navbar";
import toast from "react-hot-toast";
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

const getSmallName = (name) => {
  if (name.length > 12) {
    return name.slice(0, 9) + "..." + name.slice(-3);
  }
  return name;
};



const Frame11 = () => {
  const [open, setOpen] = useState(false);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [PDF, setPDF] = useState();
  const router = useRouter();
  const size = useWindowSize();

  const { mutate } = submitMutation(
    (res) => {
      toast.success("Resume Uploaded Successfully");
      setPDF(null);
    },
    (err) => {
      console.log(err);
    }
  );
  

  const inputRef = useRef(null);

  return (
    <div
      style={{
        backgroundImage: "url(/CareersBackground.png)",
      }}
      className="w-full relative  flex flex-col items-center justify-start pt-[3rem] px-[8%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]"
    >
     
      {/* <InputArray /> */}
      {/* <Drawer
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

                <div className="w-[20px] h-0.5 bg-white"></div>
                <div className="w-[20px] h-0.5 bg-white"></div>
                <div className="w-[20px] h-0.5 bg-white"></div>
              </div>
            )}
          </div>
        </div>
      </div> */}
      <Navbar />

      <section className=" flex   flex-col items-start justify-start gap-[1.75rem] min-w-full">
        <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-[#123479]  flex flex-col items-center justify-center py-[2rem] pb-[4rem] px-[5%] sm:px-[3rem] box-border gap-[2.5rem] max-w-full  mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className="flex flex-col items-center gap-2 font-bold text-[2.5rem]">
            <div className="text-[#FF9135]">Careers at</div>
            <div className="text-white ">World One Forex</div>
          </div>
          <div className="text-white text-center font-normal text-[1.125rem] w-[80%]">
            Welcome to the World One Forex Careers page! We're a global leader
            in currency exchange, offering innovative solutions to our clients
            across the world. We're always looking for talented, driven
            individuals to join our team and help us achieve our mission of
            providing seamless and secure currency exchange services. Explore
            our current job openings below and take the first step towards an
            exciting career with World One Forex.
          </div>
          <div className="flex gap-8 items-center flex-row-reverse ">
            <div
              onClick={() => {
                if(PDF){
                  const Data = new FormData();
                  Data.append("resume", PDF);
                  mutate(Data);

                }else{
                 inputRef.current.click();}
              }}
              className=" cursor-pointer bg-white px-8 py-2 text-lg font-semibold text-[#333] rounded-lg flex items-center"
            >
              {" "}
              <div>{PDF ? "Submit" : "Upload Your Resume"}</div>{" "}
              {!PDF && <img className="w-10 h-10" src="arrow-right.svg" />}{" "}
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={(e) => {
                  setPDF(e.target.files[0]);
                }}
                className="invisible w-0"
              />
            </div>
            {PDF && (
              <div
              onClick={() => {
                inputRef.current.click();
              }}
                style={{
                  boxShadow:
                    "0px 6px 24px -4px rgba(18, 25, 56, 0.10), 0px 12px 48px 4px rgba(18, 25, 56, 0.15)",
                  backdropFilter: "blur(24px)",
                }}
                className="flex gap-1 w-28 py-2 px-2 rounded-xl text-sm text-white font-normal bg-secondary flex-col items-center gap-2 font-bold text-[2.5rem]"
              >
                <img src="/Pdf.svg" />
                {getSmallName(PDF.name)}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Frame11;
