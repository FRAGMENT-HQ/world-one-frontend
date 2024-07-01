import "@/styles/globals.css";
import "@/pages/global.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { submitQueryRequest } from "@/hooks/prod";
import { DefaultSeo } from 'next-seo';
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const handleClick = (mailId) => {
    window.location.href = `mailto:${mailId}`;
    // Additional functionality can be added here if needed
  };
  const phoneClick = (phoneNo) => {
    window.location.href = `tel:${phoneNo}`;
    // Additional functionality can be added here if needed
  };

  const handleSubmit = () => {
    const data = {
      name: name,
      email: email,
      phone_no: phone,
      query: message,
    };
    if (name.length < 3) {
      toast.error("Name should be atleast 3 characters long");
      return;
    }
    if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      toast.error("enter valid email");
      return;
    }
    if (!/^[6-9]+[0-9]{9}$/.test(phone)) {
      toast.error("enter valid phone number");
      return;
    }
    if (message.length < 10) {
      toast.error("Message should be atleast 10 characters long");
      return;
    }
    submitQueryRequest(data)
      .then((res) => {
        toast.success("Query Submitted Successfully");
      })
      .catch((err) => {
        toast.error("Failed to submit query");
      });
  };

  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <DefaultSeo

        title="World One India Forex Pvt. Ltd."
        description="Find the best exchange rates and transfer money worldwide with ease. Our transparent platform offers fast, reliable, and cost-effective currency exchange solutions"
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://worldoneforex.com/',
          site_name: 'World One India Forex Pvt. Ltd.',
          images:[
            {
              url: 'https://worldoneforex.com/seo.png',
              width: 800,
              height: 600,
              alt: 'World One India Forex Pvt. Ltd.',
            },
          
          ],
        description: 'Get the best exchange rates and transfer money globally with ease. Fast, secure, and reliable currency exchange for individuals and businesses.',
        }}
        // meta tags
        additionalMetaTags={[
          {
            name: 'keywords',
            content:'best exchange rates,send money online,buy currency,sell currency,transfer money abroad,cheapest way to send money,international money transfer,online currency exchange,real-time exchange rates,currency exchange,money transfer,foreign exchange,forex,exchange rates,international payments,remittance,money exchange,currency converter,wire transfer'
          }]}
      />

      <Component {...pageProps} />
      <section className="  !text-[0px] self-stretch bg-midnightblue overflow-hidden flex flex-col items-center justify-start pt-[60px] px-5 pb-12 box-border gap-[100px] max-w-full text-left text-13xl text-white  mq825:gap-[50px_100px] mq825:pt-[51px] mq825:pb-5 mq825:box-border mq450:gap-[25px_100px] mq1275:pt-[78px] mq1275:pb-[31px] mq1275:box-border">
        <div className="w-full flex flex-col tablet:flex-row items-start justify-start sm:justify-evenly max-w-full gap-[20px] mq1275:flex-wrap ">
          <div className="flex flex-col items-start text-left justify-start gap-[35px] mq450:gap-[17px_35px]">
            <iframe
              width="350px"
              height="400px"
              frameborder="0"
              // scrolling="no"
              marginheight="0"
              marginwidth="0"
              id="gmap_canvas"
              src="https://maps.google.com/maps?width=500&amp;height=400&amp;hl=en&amp;q=World%20One%20India%20Forex%20Private%20Limited.%20Roorkee+()&amp;t=&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
          <div className="flex  flex-col items-start text-left justify-start gap-5 sm:gap-[35px]">
            <b className="relative text-base leading-[40px] text-5xl mq825:leading-[32px] mq450:leading-[24px]">
              Quick Links
            </b>
            <div className="flex text-sm flex-col items-start justify-start gap-0 sm:gap-[16px] text-xl text-text5">
              <div
                onClick={() => {
                  router.push("/#about");
                }}
                href="/#about"
                className="cursor-pointer flex flex-row items-center justify-center p-2"
              >
                <div className="relative text-base inline-block min-w-[99px] sm:text-lgi ">
                  About Us
                </div>
              </div>
              <div
                onClick={() => {
                  router.push("/careers");
                }}
                className=" cursor-pointer flex flex-row items-center justify-center py-2 px-1.5"
              >
                <div className="relative text-base inline-block min-w-[99px] sm:text-lgi">
                  Careers
                </div>
              </div>
              <div onClick={() => {
                router.push("/outlets")
              }} className="flex cursor-pointer flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative text-base inline-block min-w-[99px] sm:text-lgi">
                  Outlets
                </div>
              </div>
              <div
                onClick={() => router.push("/faq")}
                className="cursor-pointer flex flex-row items-center justify-center p-2"
              >
                <div className="relative text-base inline-block min-w-[99px] sm:text-lgi">
                  FAQ
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col text-left items-start justify-start gap-10 sm:gap-[30px] max-w-full text-5xl text-text5">
            <b className="relative text-base leading-[40px] inline-block text-white min-w-[118px] ">
              Address
            </b>
            <div className=" flex flex-col items-start justify-start gap-[8px]">
              <b className="text-sm relative leading-[32px] sm:text-lgi sm:leading-[26px]">
                World One India Forex Private Limited.
              </b>
              <div className=" text-sm relative leading-[16px] sm:text-lgi sm:leading-[26px]">
                Shop No. 1, S-1, Ground Floor, <br />
                American Plaza, Eros Hotel, <br />
                Nehru Place, New Delhi, Delhi - 110019, India
              </div>
            </div>
            <div className=" flex flex-row flex-wrap items-center justify-center xs:justify-start py-0 pl-0 box-border gap-[8px] max-w-full mq825:pr-[146px] mq825:box-border mq450:pr-5 mq450:box-border">
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
                <b className="relative whitespace-nowrap  text-xl text-sm ">
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
              <b className="relative text-xl leading-[32px] inline-block  text-text0 text-left min-w-[99px]">
                Contact Us
              </b>
            </button>
          </div>
        </div>

        <div className="px-[120px] mq825:pl-[30px] mq825:pr-[30px] text-base">
          World One India Forex Pvt. Ltd. is a currency exchange service
          provider authorized by the Reserve Bank of India (RBI) RBI License
          Number is NDL-ADII-0001-2023
        </div>

        <div className="w-[1680px] rounded-[20px] bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-row items-start justify-between py-5  box-border max-w-full gap-[20px] z-[1] text-xl px-[120px] mq825:pl-[30px] mq825:pr-[30px] mq825:box-border mq1275:flex-wrap mq1275:justify-center mq1275:pl-[60px] mq1275:pr-[60px] mq1275:box-border">
          <div className="relative leading-[24px] font-medium inline-block max-w-full mq450:text-base mq450:leading-[19px]">
            @ 2024 World One India forex private limited
          </div>
          <div className="flex flex-row items-start justify-start gap-[45px] max-w-full mq450:flex-wrap mq450:gap-[45px_22px]">
            <div
              onClick={() => router.push("/privacy-policy")}
              className="relative leading-[24px] font-semibold inline-block min-w-[126px] mq450:text-base mq450:leading-[19px]"
            >
              Privacy Policy
            </div>
            <div
              onClick={() => router.push("/terms")}
              className="relative leading-[24px] font-semibold mq450:text-base mq450:leading-[19px]"
            >{`Terms & Conditions`}</div>
          </div>
        </div>
      </section>
    </QueryClientProvider>
  );
}
