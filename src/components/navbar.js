import React from "react";
import { useState, useEffect } from "react";

import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import ModalDisp from "./login";
import { Modal  } from "@mui/material";

import Drawer from "@mui/material/Drawer";

import { authUser } from "@/states/storage";
import app, { auth } from "../utils/google";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";

const provider = new GoogleAuthProvider();

const usd = 84;

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
export default function Navbar({ container = "bg-darkslateblue-900" }) {
  const [drawerOpen, setdrawerOpen] = useState(false);

  const router = useRouter();

  const [open, setOpen] = useState(false);

  // const [drawerOpen, setdrawerOpen] = useState(false);

  const [userData, setUserData] = useAtom(authUser);

  const size = useWindowSize();

  const style = {
    // top: "50%",
    // left: "40%",
    // transform: "translate(-30%, -70%)",
    bgcolor: "#FFF",
    p: 4,
    borderRadius: "32px",
    backgroundColor: "",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // boxShadow: 24,
  };

  return (
    <div className={` w-full flex  self-stretch`}>
      <Modal
        style={style}
        open={open}
      
      >
        
        <ModalDisp
          close={() => {
            setOpen(false);
          }}
        />
      </Modal>
      <Drawer
        open={drawerOpen}
        onClose={() => {
          setdrawerOpen(false);
        }}
      >
        <div className={`w-[100vw] h-[100vh] bg-secondary `}>
          
          <div className="text-white sm:visible w-full mt-5  rounded-3xl flex flex-col items-center justify-between py-[26px] px-16 box-border top-[0] z-[99] sticky gap-[20px] max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
          <div onClick={()=>{
            setdrawerOpen(false)
          }} className="w-full cursor-pointer relative leading-[32px] inline-block text-2xl text-right " >x</div>
            <div className="w-[75%] flex flex-col items-center justify-center text-[15px] font-semibold">
            
              <div className=" flex flex-row items-center justify-center py-1 ">
                <div
                  onClick={() => {
                    router.push("/#about");
                    setdrawerOpen(false);
                  }}
                  className=" cursor-pointer relative leading-[32px] inline-block "
                >
                  About
                </div>
              </div>
              <div
                onClick={() => {
                  router.push("/rates-new");
                  setdrawerOpen(false);
                }}
                className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
              >
                <div className="relative leading-[32px]">Rates</div>
              </div>
              <div className="  shrink-0 flex flex-row items-center justify-center py-1  box-border">
                <div
                  onClick={() => {
                    router.push("/#services");
                    setdrawerOpen(false);
                  }}
                  className="cursor-pointer relative leading-[32px]"
                >
                  Services
                </div>
              </div>

              <div
                onClick={() => {
                  setdrawerOpen(false);
                  router.push("/#blogs");
                }}
                className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
              >
                <div className="relative leading-[32px]">Blogs</div>
              </div>
            </div>
          </div>
          <div className={`cursor-pointer flex h-16 gap-[12%] items-center flex-col`}>
            <div
              onClick={() => {
                if (userData?.user?.email) {
                  router.push("/profile");
                  return;
                }
                setOpen(true);
              }}
              className={` ${userData?.user?.name && "bg-[#3c498b4d] py-3 px-5 rounded-xl "} cursor-pointer text-[#FF9135] font-semibold text-sm `}
            >
              {userData?.user?.name
                ? userData?.user?.name.split(" ")[0]
                : "Login"}
            </div>

            <div
              onClick={() => {
                router.push("/#mail");
                setdrawerOpen(false);
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
        </div>
      </Drawer>
      <div className="self-stretch flex flex-row items-start justify-center py-0 pr-0 pl-0 box-border w-full">
        <div className=" flex flex-col items-end justify-start gap-[50px] w-full mq825:gap-[49px_98px] mq450:gap-[24px_98px]  ">
          <div
            className={`sm:visible w-full w-[95%] h-[4vw] min-h-[85px] mt-0 rounded-3xl ${container} shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row  items-center justify-between py-[26px] px-16 box-border top-[0] z-[99] sticky gap-[20px] max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border`}
          >
            <img
              className=" h-[60px] sm:h-[60px] sm:w-[180px] relative"
              loading="lazy"
              alt=""
              src="/LOGO.svg"
              onClick={() => {
                router.push("/");
              }}
            />
            {size.width > 600 ? (
              <>
                {" "}
                <div className="w-[75%] flex flex-row items-center justify-center text-[15px] font-semibold mq825:hidden">
                  <div className="flex text-white gap-[15%] ">
                    <div className=" flex flex-row items-center justify-center py-1 ">
                      <div
                        onClick={() => {
                          router.push("/#about");
                        }}
                        className=" cursor-pointer relative leading-[32px] inline-block "
                      >
                        About
                      </div>
                    </div>
                    <div
                      onClick={() => {
                        router.push("/rates-new");
                      }}
                      className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                    >
                      <div className="relative leading-[32px]">Rates</div>
                    </div>
                    <div className="  shrink-0 flex flex-row items-center justify-center py-1  box-border">
                      <div
                        onClick={() => {
                          router.push("/#services");
                        }}
                        className="cursor-pointer relative leading-[32px]"
                      >
                        Services
                      </div>
                    </div>

                    <div
                      onClick={() => {
                        setdrawerOpen(false);
                        router.push("/#blogs");
                      }}
                      className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                    >
                      <div className="relative leading-[32px]">Blogs</div>
                    </div>
                  </div>
                </div>
                <div className={`cursor-pointer flex h-16 gap-[12%] items-center flex-row`}>
                  <div
                    onClick={() => {
                      if (userData?.user?.name) {
                        router.push("/profile");
                        return;
                      }
                      setOpen(true);
                    }}
                    className={` ${userData?.user?.name && "bg-[#3c498b4d] py-3 px-5 rounded-xl "} text-[#FF9135] font-semibold text-sm `}
                  >
                    {userData?.user?.name
                      ? userData?.user?.name.split(" ")[0]
                      : "Login"}
                  </div>

                  <div
                    onClick={() => {
                      router.push("/#mail");
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
    </div>
  );
}
