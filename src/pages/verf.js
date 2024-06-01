import MainForm from "../components/main-form";
import { useAtom } from "jotai";
import { order } from "@/states/storage";
import { useState, useEffect } from "react";
import InputArray from "@/components/input-array";

const Frame2 = () => {
  const [orderData, setOrderData] = useAtom(order);



  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-center pt-[2rem] pb-[16rem]  px-[5vw] sm:pr-[1.687rem] sm:pl-[1.25rem] box-border gap-[2rem] leading-[normal] ">
      <InputArray/>
      <MainForm />
    </div>
  );
};

export default Frame2;
