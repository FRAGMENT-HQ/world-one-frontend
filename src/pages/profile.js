
import { useRouter } from "next/router";
import { postOrderMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Drawer from "@mui/material/Drawer";
import Select from "react-select";

const options = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "highest", label: "Highest" },
  { value: "lowest", label: "Lowest" },
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

const BuySell = ({ type }) => {
  return (
    <div
      className={` font-semibold ${type == "BUY" ? "text-[#38B000]" : "text-[#FF3F2C]"}`}
    >
      {type}
    </div>
  );
};

const Status = ({ status }) => {
  return (
    <div className="">
      <img
        src={
          status == "PENDING"
            ? "/pending.svg"
            : status == "COMPLETED"
              ? "/approved.svg"
              : "/rejected.svg"
        }
      />
    </div>
  );
};

const BlockTime = ({ date = "May 22, 2024", time = "22:30" }) => {
  return (
    <div className="flex flex-col gap-2">
      <div> {date} </div> <div> {time}</div>
    </div>
  );
};

const Frame11 = () => {
  const [open, setOpen] = useState(false);

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
                <div className="relative text-base bg-red-400 !text-[#27357E]  inline-block ">
                  Forex Rates
                </div>
              </div>
            </div>
          </div>
        </div>
      </Drawer>
      <div className="self-stretch flex bg-red-400 flex-row items-start justify-center py-0  box-border w-full">
        <div className=" flex flex-col items-end justify-start gap-[50px] w-full mq825:gap-[49px_98px] mq450:gap-[24px_98px]   ">
          <div className="sm:visible w-full w-[95%] h-[4vw] min-h-[85px] mt-0 rounded-3xl bg-secondary shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row  items-center justify-between py-[26px]  box-border top-[0] z-[99] sticky gap-[1px] latop:gap-[20px] max-w-full px-4  desktop:px-8 ">
            <img
              className=" h-[60px] sm:h-[60px] sm:w-[180px] relative"
              loading="lazy"
              alt=""
              src="LOGO.svg"
            />
            {size?.width > 600 ? (
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

      <section className=" flex  flex-row items-start justify-start gap-[2%] min-w-full">
        <div className="w-[23%] text-white min-w-[300px] h-96 bg-[#3C498B] rounded-xl pt-10 pb-2 flex flex-col items-center">
          <div className="w-24 h-24 bg-[#FF9135] text-center align-middle text-white font-semibold flex justify-center items-center text-[4rem] rounded-full">
            <div>A</div>
          </div>
          <div className="font-normal text-lg tracking-wide mt-4">
            Akshat Verma
          </div>
          <div className="font-medium mt-2">9833250066</div>
          <div className="font-medium mt-2">akshatverma522@gmail.com</div>
          <div className="flex-1"></div>
          <div className="">
            {" "}
            <img src="/logout.svg" />{" "}
          </div>
        </div>
        <div className="w-[75%] shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white flex flex-col items-start justify-center py-[4rem] px-[5%] sm:px-[1rem] box-border gap-[1rem] max-w-full mq900:gap-[1.5rem] mq900:pt-[2.625rem] mq900:pb-[2.625rem] mq900:box-border mq1325:pl-[1.625rem] mq1325:pr-[1.625rem] mq1325:box-border">
          <div className="w-full flex justify-between">
            <div className="text-5xl text-secondary font-semibold">
              All Transactions
            </div>
            <div className="flex gap-5">
              <Select
                options={options}
                classNames={{
                  container: () =>
                    " w-full  flex-1 min-w-36 text-white border-solid border-2 border-[#000] !rounded-xl bg-gray-100 py-0.5  ",
                  control: () =>
                    "self-stretch !bg-transparent !outline-none !border-none !mx-2",
                  menuList: () => "!bg-secondary min-w-18",
                  menu: () => "!bg-secondary min-w-18 py-2 rounded-xl",
                  option: () => "text-white hover:text-midnightblue min-w-18 hover:text-secondary",
                  input: () => "text-white !outline-none",
                  singleValue: () => "!text-[#333] !text-base",
                  indicatorSeparator: () => "hidden",
                }}
              />
              <input placeholder="search" className="w-48 rounded-xl px-4 " />
            </div>
          </div>
          <table
            className="w-full border-collapse gap-12 border-spacing-2.5 border border-slate-400 "
            // style={{
            //   borderSpacing: "0 12rem",
            // }}
          >
            <tr className="!border-b-2 border-t-0 border-x-0 py-5 !border-secondary !border-solid ">
              <td className="" >Time</td>
              <td className="py-4" >Type</td>
              <td>Product</td>
              <td>Currency</td>
              <td>Rate</td>
              <td>Forex Amount</td>
              <td>INR Amount</td>
              <td>Status</td>
              <td></td>
            </tr>

            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"SELL"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"COMPLETED"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  
                  Repeat Order
                </div>
              </td>
            </tr>
            <tr className="!text-xs !border-b border-t-0 border-x-0 py-5 !border-[#BDBDBD] !border-solid ">
              <td className="py-4">
                <BlockTime />
              </td>
              <td>
                <BuySell type={"BUY"} />
              </td>
              <td>Currency Notes</td>
              <td>USD</td>
              <td>1 USD = ₹ 83.17</td>
              <td>1000000</td>
              <td>1000000</td>
              <td>
                <Status status={"PENDING"} />
              </td>
              <td>
                <div className="text-secondary px-2 py-2 rounded-xl border-solid border">
                  
                  Repeat Order
                </div>
              </td>
            </tr>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Frame11;
