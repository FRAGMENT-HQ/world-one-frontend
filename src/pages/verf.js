import MainForm from "../components/main-form";
import { useAtom } from "jotai";
import { order } from "@/states/storage";
import { useState, useEffect } from "react";


const Frame2 = () => {
  const [orderData, setOrderData] = useAtom(order);



  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-center pt-[3rem] pb-[16rem]  px-[5vw] sm:pr-[1.687rem] sm:pl-[1.25rem] box-border gap-[2.75rem] leading-[normal] ">
      <section className="w-full shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-3xl bg-darkslateblue-700 flex flex-row items-center justify-between py-[1.875rem] px-[4rem] box-border gap-[1.25rem] max-w-full text-left text-[1.25rem] text-white font-body-small mq450:flex-wrap mq450:pl-[1.25rem] mq450:pr-[1.25rem] mq450:box-border">
        <img
          className="h-[1.594rem] w-[6.188rem] relative"
          loading="lazy"
          alt=""
          src="/w-o-f.svg"
        />
        <div className="flex flex-row items-center justify-start">
          <div className="overflow-hidden flex flex-row items-center justify-center py-[0.25rem] px-[0.968rem]">
            <div className="relative leading-[2rem] inline-block min-w-[4.938rem] mq450:text-[1rem] mq450:leading-[1.625rem]">
              {orderData?.city.value}
            </div>
          </div>
        </div>
      </section>
      <MainForm />
    </div>
  );
};

export default Frame2;
