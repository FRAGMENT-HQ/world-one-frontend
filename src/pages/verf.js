import MainForm from "../components/main-form";

// import { useState, useEffect } from "react";
import InputArray from "@/components/input-array";

const Frame2 = () => {
 

  return (
    <div className="w-full relative bg-background overflow-hidden flex flex-col items-center justify-center pt-[2rem] pb-[16rem] px-[5vw] sm:pr-[1.25rem] sm:pl-[1.25rem] box-border gap-[2rem] leading-[normal] ">
      <InputArray/>
      <MainForm />
    </div>
  );
};

export default Frame2;
