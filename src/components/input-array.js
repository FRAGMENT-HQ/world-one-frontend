import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { order } from "@/states/storage";
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

const InputArray = () => {
  const [orderData, setOrderData] = useAtom(order);
  const size = useWindowSize();
  return (
    <section className="w-[105rem] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-3xl bg-darkslateblue-700 flex flex-row items-center justify-between py-[1.875rem] px-[4rem] box-border gap-[1.25rem] max-w-full text-left text-[1.25rem] text-white font-body-small mq450:flex-wrap mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
      <img
        className="h-[1.594rem] w-[6.188rem] relative"
        loading="lazy"
        alt=""
        src={size?.width < 600 ? "worldOneLogo.svg" : "LOGO.svg"}
      />
      <div className="flex flex-row items-center justify-start">
        <div className="overflow-hidden flex flex-row items-center justify-center py-[0.25rem] px-[0.968rem]">
          <div className="relative leading-[2rem] inline-block min-w-[4.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
            {orderData?.city.value}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InputArray;
