import { listOutletsMutation } from "@/hooks/prod";
import Smodal from "@/components/smodal";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

import Navbar from "@/components/navbar";

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

const Outlets = () => {
  const [outlets, setOutlets] = useState([]);
  const [open, setOpen] = useState(false);
  
  const width = useWindowSize().width;

  const handleOpen = () => {
    setOpen(true);
    // if(checked){
  };

  const { mutate } = listOutletsMutation(
    (res) => {
      console.log(res);
      setOutlets(res.data);
    },
    (err) => {
      console.log(err.message);
    }
  );
  useEffect(() => {
    mutate();
  }, []);

  return (
    <div className="w-full relative bg-background flex flex-col items-center justify-start pt-[3rem] px-[5%] laptop:px-[120px] pb-[10rem] box-border gap-[2.75rem] leading-[normal] tracking-[normal] mq900:gap-[1.375rem]">
      <Smodal open={open} setOpen={setOpen} />
      {/* <InputArray /> */}
      <Navbar />

      <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-secondary">
        <h1 className="m-0 flex-1 relative tex-3xl leading-[56px] font-semibold font-inherit inline-block max-w-full ">
          World One Forex Locations
        </h1>
      </div>
      <div className="w-full text-left ">
        Book your forex order online in India and complete your order at any of
        the following forex locations
      </div>
      <section className=" flex  flex-col items-start justify-start gap-[1.75rem] min-w-full">
      {outlets.map((outlet) => {
        return (
          <>
            
              <div className="self-stretch shadow-[0px_6px_48px_-4px_rgba(18,_25,_56,_0.1)] rounded-13xl bg-white  flex flex-row flex-wrap gap-y-2 items-center justify-center tablet:justify-start py-8 px-[5%] sm:px-[3rem] box-border gap-[3%] laptop:gap-[5vw]  max-w-full">
                <div className="flex flex-col gap-1 items-center ">
                  <img
                    className="  laptop:w-20"
                    src={outlet.icon}
                  />
                  <div className="text-secondary text-base laptop:text-base font-semibold">
                    {outlet.city}
                  </div>
                </div>
                <div className="flex w-[80vw] tablet:w-[30vw] items-center tablet:items-start text-lg flex-col gap-3">
                  <div className="text-secondary font-semibold">
                    {outlet.name}
                  </div>
                  <div className="  tablet:w-full text-center tablet:text-left text-sm font-normal">
                    {outlet.address}
                  </div>
                </div>
                <div className="flex text-lg text-center flex-col items-center tablet:items-start gap-3">
                  <div className=" w-full text-right flex-1 text-secondary font-semibold">
                    Office { width<720? "": "Hours"}
                  </div>
                  <div className="text-text2 flex flex-col gap-1 text-sm font-semibold">
                    <div>{ outlet.timming_weekdays}</div>
                    <div>{ outlet.timming_weekend }</div>
                  </div>
                </div>
                <div className="flex text-lg flex-col gap-3">
                  <div className="text-secondary tablet:text-white text-left font-semibold">Hours</div>
                  <div className="text-text2 flex flex-col gap-1 text-sm font-semibold">
                    <div>(Monday - Friday)</div>
                    <div>(Saturday - Sunday)</div>
                  </div>
                </div>
              </div>
            
          </>
        );
      })}
      </section>
    </div>
  );
};

export default Outlets;
