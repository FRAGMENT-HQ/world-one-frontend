import "@/styles/globals.css";
import "@/pages/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const handleClick = (mailId) => {
    window.location.href = `mailto:${mailId}`;
    // Additional functionality can be added here if needed
  };
  const phoneClick = (phoneNo) => {
    window.location.href = `tel:${phoneNo}`;
    // Additional functionality can be added here if needed
  };

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Component {...pageProps} />
      <section className="self-stretch bg-midnightblue overflow-hidden flex flex-col items-center justify-start pt-[60px] px-5 pb-12 box-border gap-[100px] max-w-full text-left text-13xl text-white font-lato mq825:gap-[50px_100px] mq825:pt-[51px] mq825:pb-5 mq825:box-border mq450:gap-[25px_100px] mq1275:pt-[78px] mq1275:pb-[31px] mq1275:box-border">
        <div className="w-full flex flex-row items-start justify-start max-w-full gap-[20px] mq1275:flex-wrap justify-evenly">
          <div className="flex flex-col items-start text-left justify-start gap-[35px] mq450:gap-[17px_35px]">
            <div className="w-full  px-[4%] xs:px-4 py-4 rounded-xl border border-solid">
              <form className="flex  flex-col items-center  gap-4">
                <input
                  type="text"
                  className="text-white sm:w-[25vw] tablet:w-[20vw]  px-10 py-2 rounded-xl max-w-[419px]  [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-medium text-xl text-text5 "
                  placeholder="Name"
                  name="name"
                  required
                />
                <input
                  type="text"
                  className="text-white sm:w-[25vw] tablet:w-[20vw]  px-10 py-2 rounded-xl max-w-[419px]  [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-medium text-xl text-text5 "
                  placeholder="Email"
                  name="name"
                  required
                />

                <input
                  type="text"
                  className="text-white sm:w-[25vw] tablet:w-[20vw]  px-10 py-2 rounded-xl max-w-[419px]  [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-medium text-xl text-text5 "
                  placeholder="Contact Number"
                  name="name"
                  required
                />
                <textarea
                  type="text"
                  className="text-white sm:w-[25vw] tablet:w-[20vw] px-10 py-2 rounded-xl max-w-[419px]  [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-medium text-xl text-text5 "
                  placeholder="Message"
                  required
                />

                <button
                  onClick={() => {}}
                  className=" w-fit cursor-pointer [border:none] py-3 px-[77px] bg-white rounded-2xl shadow-[0px_4px_16px_rgba(0,_6,_57,_0.05)] overflow-hidden flex flex-row items-center justify-center whitespace-nowrap hover:bg-gainsboro-100  mq450:box-border"
                >
                  <b className="relative text-xl inline-block font-lato text-text0 text-center min-w-[99px]">
                    Submit
                  </b>
                </button>
              </form>
            </div>
            {/* <b className="relative leading-[40px] inline-block text-5xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Services
            </b> */}
            {/* <div className="flex overflow-hidden text-left flex-col items-start justify-start gap-[16px] text-xl text-text5">
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative text-center leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                  Exchange Currency
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                  Transfer Money Abroad
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] inline-block min-w-[117px] mq450:text-lgi mq450:leading-[26px]">
                  Forex Card
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                  Travel Insurance
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex flex-col items-start text-left justify-start gap-[35px]">
            <b className="relative leading-[40px] text-5xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Quick Links
            </b>
            <div className="flex flex-col items-start justify-start gap-[16px] text-xl text-text5">
              <div
                onClick={() => {
                  router.push("/#about");
                }}
                href="/#about"
                className="cursor-pointer flex flex-row items-center justify-center p-2"
              >
                <div className="relative leading-[32px] inline-block min-w-[99px] mq450:text-lgi mq450:leading-[26px]">
                  About Us
                </div>
              </div>
              <div
                onClick={() => {
                  handleClick("HR@worldoneforex.com");
                }}
                className=" cursor-pointer flex flex-row items-center justify-center py-2 px-1.5"
              >
                <div className="relative leading-[32px] inline-block min-w-[84px] mq450:text-lgi mq450:leading-[26px]">
                  Careers
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] inline-block min-w-[80px] mq450:text-lgi mq450:leading-[26px]">
                  Outlets
                </div>
              </div>
              <div  onClick={() => router.push("/faq")}  className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[48px] mq450:text-lgi mq450:leading-[26px]">
                  FAQ
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-center sm:text-left items-center sm:items-start justify-start  gap-[30px] max-w-full text-5xl text-text5">
            <b className="relative text-5xl leading-[40px] inline-block text-white min-w-[118px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Address
            </b>
            <div className=" flex flex-col items-start text-xl justify-start gap-[8px]">
              <b className=" relative leading-[32px] mq450:text-lgi mq450:leading-[26px]">
                World One India Forex Private Limited.
              </b>
              <div className=" relative leading-[32px] text-xl mq450:text-lgi mq450:leading-[26px]">
                Shop No. 1, S-1, Ground Floor, <br />
                American Plaza, Eros Hostel, <br />
                Nehru Place, New Delhi, Delhi - 110019, India
              </div>
            </div>
            <div className=" flex flex-col xs:flex-row flex-wrap items-center justify-center xs:justify-start py-0 pl-0 box-border gap-[8px] max-w-full mq825:pr-[146px] mq825:box-border mq450:pr-5 mq450:box-border">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/fimail.svg"
              />
              <div
                onClick={() => {
                  handleClick("nodaldelhi@worldoneforex.com");
                }}
                id="mail"
                className=" cursor-pointer flex flex-row items-center justify-start py-2 px-1.5 box-border ]"
              >
                <b className="relative leading-[32px] whitespace-nowrap mq450:text-[1.1rem] text-xl mq450:leading-[26px]">
                  nodaldelhi@worldoneforex.com
                </b>
              </div>
            </div>
            <button
              onClick={() => {
                phoneClick("+911143721069");
              }}
              className="cursor-pointer [border:none] py-3 px-[77px] bg-white rounded-2xl shadow-[0px_4px_16px_rgba(0,_6,_57,_0.05)] overflow-hidden flex flex-row items-center justify-center whitespace-nowrap hover:bg-gainsboro-100 mq450:pl-5 mq450:pr-5 mq450:box-border"
            >
              <b className="relative text-xl leading-[32px] inline-block font-lato text-text0 text-left min-w-[99px]">
                Contact Us
              </b>
            </button>
          </div>
        </div>
        <div className="w-[1681px] h-[511px] flex flex-row items-start justify-center max-w-full">
          <div className="self-stretch  flex flex-row items-start justify-start relative max-w-full">
            <div className="h-[998px]  absolute !m-[0] bottom-[-531px] left-[-32px] rounded-[50%] bg-steelblue-200 [filter:blur(500px)]" />
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              // scrolling="no"
              marginheight="0"
              marginwidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=520&amp;height=400&amp;hl=en&amp;q=World%20One%20India%20Forex%20Private%20Limited.%20Roorkee+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
        </div>
        <div className="px-[120px] mq825:pl-[30px] mq825:pr-[30px] text-base">
          World One India Forex Pvt. Ltd. is a currency exchange service
          provider authorized by the Reserve Bank of India (RBI) RBI License
          Number is NDL-ADII-0001-2023
        </div>

        <div className="w-[1680px] rounded-[20px] bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-row items-start justify-between py-5  box-border max-w-full gap-[20px] z-[1] text-xl px-[120px] mq825:pl-[30px] mq825:pr-[30px] mq825:box-border mq1275:flex-wrap mq1275:justify-center mq1275:pl-[60px] mq1275:pr-[60px] mq1275:box-border">
          <div className="relative leading-[24px] font-medium inline-block max-w-full mq450:text-base mq450:leading-[19px]">
            @ 2024 World one India forex private limited
          </div>
          <div className="flex flex-row items-start justify-start gap-[45px] max-w-full mq450:flex-wrap mq450:gap-[45px_22px]">
            <div
              onClick={() => router.push("/privacy-policy")}
              className="relative leading-[24px] font-semibold inline-block min-w-[126px] mq450:text-base mq450:leading-[19px]"
            >
              Privacy Policy
            </div>
            <div  onClick={() => router.push("/terms")} className="relative leading-[24px] font-semibold mq450:text-base mq450:leading-[19px]">{`Terms & Conditions`}</div>
          </div>
        </div>
      </section>
    </QueryClientProvider>
  );
}
