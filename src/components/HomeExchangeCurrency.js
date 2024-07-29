import { useState, useEffect, useRef } from "react";
import { order, cart } from "@/states/storage";
import FrameComponent2 from "./frame-component2";
import FrameComponent from "./frame-component";
import LinkFunction from "./link-function";
import Counter from "./counter";
import "react-multi-carousel/lib/styles.css";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { getRateMutation } from "@/hooks/prod";
import CityModal from "./cityModal";
import CurrencyCard from "./currancyCard";
import { getRateCardMutation, getCityMutation } from "@/hooks/prod";
import { getBlogsMutation } from "@/hooks/blogs";
import Select from "react-select";
import toast from "react-hot-toast";
import ColorAdjustor from "./color-adjustor";
import FaqItems from "./faqItems";
import { Modal } from "@mui/material";

import { authUser } from "@/states/storage";
import { auth } from "../utils/google";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Navbar from "./navbar";
const provider = new GoogleAuthProvider();

// const usd = 84;

// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
const cityOptions = [
  { label: "New Delhi", value: "New Delhi" },
  { label: "Gurgaon", value: "Gurgaon" },
  { label: "Noida", value: "Noida" },
  { label: "Kolkata", value: "Kolkata" },
  { label: "Mumbai", value: "Mumbai" },
  { label: "Chandigarh", value: "Chandigarh" },
  { label: "Hyderabad", value: "Hyderabad" },
  { label: "Vadodara", value: "Vadodara" },
  { label: "Lucknow", value: "Lucknow" },
  { label: "Bangalore", value: "Bangalore" },
  { label: "Kochi", value: "Kochi" },
  { label: "Chennai", value: "Chennai" },
  { label: "Ludhiana", value: "Ludhiana" },
  { label: "Jalandhar", value: "Jalandhar" },
  { label: "Amritsar", value: "Amritsar" },
  { label: "Ahmedabad", value: "Ahmedabad" },
  { label: "Trichy", value: "Trichy" },
  { label: "Pune", value: "Pune" },
  { label: "Calicut", value: "Calicut" },
]
  .slice()
  .sort((a, b) => a.label.trim().localeCompare(b.label.trim()));
// import CountryData
function useWindowSize() {

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
const options = [
  { value: "Exchange Currency", label: "Exchange Currency" },
  { value: "Transfer Money Abroad", label: "Transfer Money Abroad" },
  { value: "Forex Card", label: "Forex Card" },
  { value: "Travel Services", label: "Travel Services" },
];

const dispMap = {
  "Exchange Currency":
    "At World One Forex, we offer convenient and reliable currency exchange services for travelers, businesses, and individuals. Whether you're planning a trip abroad or need to exchange currency for business purposes, we provide competitive rates and exceptional service to ensure a seamless exchange experience.",
  "Transfer Money Abroad":
    "Sending money internationally is made easy with World One Forex's money transfer services. Whether you need to support family members overseas or conduct business transactions, our secure and efficient transfer options ensure that your funds reach their destination safely and on time.",
  "Forex Card":
    "Our pre-loaded travel currency cards offer convenience and security for your international travels. With World One Forex, you can easily reload your card with additional funds or unload remaining balances upon your return, ensuring financial flexibility and peace of mind while you're on the go.",
  "Travel Services":
    "Sending money internationally is made easy with Worldone Forex's money transfer services. To support your family members Studying Abroad, our secure and efficient transfer options ensure that your funds reach their destination safely and on time.",
};

const serviceOption = [
  { value: "Travel Insurance", label: "Travel Insurance" },
  { value: "Visa Services", label: "Visa Services" },
  { value: "Sim Card", label: "Sim Card" },
];

const HomeExchangeCurrency = () => {
  const [selected, setSelected] = useState(true);

  const [intialCurrency, setIntialCurrency] = useState({
    label: "INR",
    value: "INR",
    smValue: "INR",
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAJDSURBVHja7JfNaxNBGIef2WwalaahhaaYUm1ta4tivViUHqxSRISeBG/SP0vwVPDkTfAiqIh4ED8OORRrFT8qghZrpYkxu9mdmddDYhtFwak4ufQHy+zC7Mwz837MO0pE6KQCOqxdAAVkgFyr9SkDNEKgp7J4+YsEfudXKqCwsNgXAgUJFNlDM36X/+klQCEEclgLOkHiKiBt1qHtu91q8pv3X/vwx35qTw+iGwC5EABrER0hOvazfB2DNQC0ADSkcfPxoUwWbPozgCR1JI08BX8GTBuAWIM0akhS9+eFOtnyjgkRWXH9vx5r3n+oYrAMFvMUunM7CEU1Ge4E/tmrz9x7tMrxyQEA7j95x5HRImemh/5/Ko6TlBt3XnDp/CTfooRKrcHFuQnKz9f4uF7bUSp2MkF5eY2NzYgktdx9vEqlGnNuZoSxA72srdeYPzvuZALnHWikBhGIE009SqnVU+qxBiBqtc4mcClKjo73c/vhW05OlZg9McSF06PMnRrm1oM3TE+V/nqcH3M6A+T3dTE/O8aV62X29+cZKRW4dnOJsYO9DA8WnAEUMJGm6UoYugXExmbE8usNjLEcHu6jVOx2SwNak81mm2E4fnUByQQkrezkrKdu3bsyWYLmUdDMhNoYwjBA8FOgKgXa6m0Aay2Imy/8kwSs0dtOaI1BKZ/VEFjTHgVWUPgjUKjmrm+dhghKKbq79nqDsLINYESE6malE1W5UcAAcAzo9zz5OrCkWneCfKv1qQbwVe1eTjsN8H0AbQf7MRxAQMIAAAAASUVORK5CYII=",
  });
  const [finalCurrency, setFinalCurrency] = useState({
    image:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAALESURBVHja7Jc/aBNxFMc/l0STtqYtihgkYLOYitjuFuwiUgfBUOgSOqS6CNqmRRqLmyjBBDQ4FLRL/TOokEEhgyC4O7RSB0MHWxEtWLGtrW2Su/s9h8ZeUlF7rV4XHzy+995v+d77vnf3fpqIsJ3mYpvtPwENcAPeMjppJlD0APXHj9/44nZvrhh3d45tsvYuAk9GdwM0nTiRkZmZb3L9+jPbuBUDmjyA1zAUIyMviMXaSaVzDPSfJJ3O0V+JqRz9A1acSufQgC+XrlpvJRXCVua06nNXYz36m0kArwtAKUVPTzvJ5FPifR0kk0/pW4/x6jje10GhoEOhaHmx7OtzP50XQDfWOIbb2lISjz+SqakFicVGN4yx2OhWJQh7AAzDJB7vYHDwEclkF4nExnBo6DGz3Rfs959/F8aHGQDKBBSJxEOuXeuit/cemUz3hhBA6d82NfxSKlkStLZekcnJeTl2LC35/Jwt/CsS6LpJT88d7oycJRod5sH9c0Sjw9z/A4Lw8egp0MptLmI9V8br8prPB8WCJYGuK27fPkPk9E2y2T5ORzJks71EIqtxZC2uznd23kJ8y9Vj9zv7MZKGjlROQSg0JKHQZZmYmJVgMLFhDAYTW5YAIBwMJmR8/JPU1Z2XsTF7OL3nkH0PtMj7g20ChDUgHAhczC8tlTAM03ZD52ue258CjwfNX8eBty+bNSBsmmbe5XL2z6yUwu12N3sApve34jFMpKQ7swPs3IGxw2NNgTINRARRpv1tQtbFld3+q3VT3CjTsAgE34/j8/kclWBlZQVqa1cJTO89TI3XiyyvOCNBbQ3LpaK1E5pKVX/B/jkDDaWkQoKPr2hoaHBUgoWFBWhsXCXwLtBCY73fUQJzXxfXKmDqfpPPMu8oAfEDBUwN2AccAfY6vJbPAq+18p3AX0YnrQgsav8vp9tN4PsALYQJa7MTgzkAAAAASUVORK5CYII=",
    label: "United States Dollar",
    smValue: "USD",
    value: "United States Dollar",
  });
  const [amount, setAmount] = useState(0);
  const router = useRouter();
  const [Order, setOrder] = useAtom(order);
  const [openBlog, setOpenBlog] = useState(false);
  const [message, setMessage] = useState(`Blogs are coming soon ! `);
  const [rate, setRate] = useState(83);
  const [usd, setUsd] = useState(83);
  const [factor, setFactor] = useState(1);
  const [mFactor, setMFactor] = useState([1, -1]);

  const [open, setOpen] = useState(false);
  const [city, setCity] = useState("");
  const [rates, setRates] = useState([]);
  const [powerFactor, setPowerFactor] = useState(1);
  const [drawerOpen, setdrawerOpen] = useState(false);
  const [prod, setprod] = useState({
    label: "Exchange Currency",
    value: "Exchange Currency",
  });
  const [userData, setUserData] = useAtom(authUser);
  const [cartItems, setCartItems] = useAtom(cart);
  const [service, setService] = useState("");
  const [callBack, setCallBack] = useState(() => { setOpenBlog(false); })
  const [blogs, setBlogs] = useState([]);
  const [cfs, setCfs] = useState([]);
  const [cf, setCf] = useState([]);
  const srollRef = useRef();
  const size = useWindowSize();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { width, height } = useWindowSize();
  const getImgObjectURL = (imgSrc) => {
    const imgStyle = {
      backgroundImage: "url(" + imgSrc + ")",
      backgroundSize: "cover",
      backgroundRepeat: "150%",
    };
    return imgStyle;
  };

  const { mutate: getRate } = getRateMutation(
    (res) => {
      setRate(1 / res.data.rate);
      setUsd(1 / res.data.usd);
      setMFactor([res.data.mark_up, res.data.mark_down])
      setFactor(selected ? res.data.mark_up : -1 * res.data.mark_down);
    },
    (err) => {
      console.log(err);
    }
  );
  const { mutate:getRates } = getRateMutation(
    (res) => {
      
    },
    (err) => {
      console.log(err);
    }
  );
  const { mutate: getCity } = getCityMutation(
    (res) => {
      const stored = [res?.data.markup_percentage, -1 * res?.data.markdown_percentage];
      setCfs(stored);
      setCf(stored[selected ? 0 : 1]);
    },
    (err) => {
      console.log(err);
    }
  );

  const { mutate: getBlogs } = getBlogsMutation(
    (res) => {
      setBlogs(res?.data);
    },
    (err) => {
      console.log(err);
    }
  );
  // const { mutate: login } = loginMutation(
  //   (res) => {
  //     console.log();
  //   },
  //   (err) => {
  //     console.log(err);
  //   }
  // );

  useEffect(() => {
    setFactor(selected ? mFactor[0] : -1 * mFactor[1]);
    setPowerFactor(selected ? 1 : -1);
    setCf(cfs[selected ? 0 : 1]);
  }, [selected]);

  useEffect(() => {
    getCity(city.value);
  }, [city])



  useEffect(() => {
    setSelected(true);
  }, [prod]);

  useEffect(() => {
    getRate([finalCurrency.smValue,prod.value=="Exchange Currency"?"currancy":"crd"]);
  }, [finalCurrency,prod]);

  const { mutate: getRateCard } = getRateCardMutation(
    (res) => {
      setRates(res?.data);
    },
    (err) => {
      console.log(err);
    }
  );
  useEffect(() => {
    getRate([finalCurrency.value,prod.value=="Exchange Currency"?"currancy":"card"]);
    getRateCard();
    getBlogs();
  }, []);

  const AddToCart = () => {
    if (
      prod.value != "Travel Services" &&
      (amount == undefined || amount == "" || amount * (rate * (1 + ((factor + cf) / 100))) < 5000)) {
      toast.error("Please enter the amount greater than 5000");

      return;
    }
    // console.log((amount * (rate + factor))/usd,prod);

    if (city == "") {
      toast.error("Please select the city");
      return;
    }
    setOrder({
      ...Order,
      city: city,
    });

    if (prod.value == "Exchange Currency") {
      if ((amount * (rate / usd)) > 3000) {
        toast.error(
          <div className="text-[#102A83] flex flex-col justify-start gap-0" >
            <div>Heads Up!</div>
            <div><b>Max Currency Exchange: $3,000</b></div>
            <div><b>Max Forex Card Load: $250,000</b></div>
            <div>Plan your transactions accordingly.</div>
          </div>
        );
        return;
      }
    }
    if (prod.value == "Forex Card") {
      if ((amount * (rate / usd)) > 250000) {
        toast.error(
          <div className="text-[#102A83] flex flex-col justify-start gap-0" >
            <div>Heads Up!</div>
            <div><b>Max Currency Exchange: $,000</b></div>
            <div><b>Max Forex Card Load: $250,000</b></div>
            <div>Plan your transactions accordingly.</div>
          </div>
        );
        return;
      }
    }
    if (
      (prod.value == "Exchange Currency" && selected) ||
      prod.value == "Forex Card"
    ) {
      const append_obj = {
        intialCurrency: selected ? intialCurrency : finalCurrency,
        finalCurrency: selected ? finalCurrency : intialCurrency,
        amount: (amount * ((rate * (1 + ((factor + cf) / 100))) ** powerFactor)).toFixed(2),
        forexAmount: amount,
        inrAmount: (amount * (rate * (1 + ((factor + cf) / 100)))).toFixed(2),
        rate: ((rate * (1 + (factor + cf) / 100)) ** powerFactor).toFixed(2),
        product: prod.value == "Exchange Currency" ? "Currancy" : "Forex Card",
        bs: selected ? "Buy" : "Sell",
      };
      if (cartItems?.Items?.length > 0) {
        setCartItems({
          Items: [...cartItems.Items, append_obj],
        });
      } else {
        setCartItems({
          Items: [append_obj],
        });
      }
      setAmount(0);
      toast.success("Added to cart sucesfully ");
    }
  };

  const handleOrder = () => {
    if (
      !userData?.user?.name
    ) {
      setOpenBlog(true);
      setMessage("Please Login to continue");
      setCallBack((e) => {


        setdrawerOpen(false);

        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential =
              GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...

            setUserData({
              name: user.displayName,
              email: user.email,
              photo: user.photoURL,
              token: token,
            });
            // login({
            //   email: user.email,
            //   name: user.displayName,
            //   password: token,
            // });

          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error?.customData?.email;
            // The AuthCredential type that was used.
            console.log(error);
            const credential =
              GoogleAuthProvider.credentialFromError(error);
            // ...
          });

      })


      return;
    }
    if (
      prod.value != "Travel Services" &&
      (amount == undefined || amount == "" || amount * (rate * (1 + (factor + cf) / 100)) < 5000)
    ) {
      toast.error("Please enter the amount greater than 5000");

      return;
    }
    if (city == "") {
      toast.error("Please select the city");
      return;
    }
    if (prod.value == "Exchange Currency") {
      if ((amount * (rate / usd)) > 3000) {
        toast.error(<div className="text-[#102A83] flex flex-col justify-start gap-0" >
          <div>Heads Up!</div>
          <div><b>Max Currency Exchange: $3,00</b></div>
          <div><b>Max Forex Card Load: $250,000</b></div>
          <div>Plan your transactions accordingly.</div>
        </div>);
        return;
      }
    }
    if (prod.value == "Forex Card") {
      if ((amount * (rate / usd)) > 250000) {
        toast.error(<div className="text-[#102A83] flex flex-col justify-start gap-0" >
          <div>Heads Up!</div>
          <div><b>Max Currency Exchange: $3,000</b></div>
          <div><b>Max Forex Card Load: $20,000</b></div>
          <div>Plan your transactions accordingly.</div>
        </div>);
        return;
      }
    }
    const Item = {
      intialCurrency: selected ? intialCurrency : finalCurrency,
      finalCurrency: selected ? finalCurrency : intialCurrency,
      amount: (amount * ((rate * (1 + (factor + cf) / 100)) ** powerFactor)).toFixed(2),
      forexAmount: amount,
      inrAmount: (amount * (rate * (1 + (factor + cf) / 100))).toFixed(2),
      rate: ((rate * (1 + (factor + cf) / 100)) ** powerFactor).toFixed(2),
      product: prod.value == "Exchange Currency" ? "Currancy" : prod.value,
      bs: selected ? "Buy" : "Sell",
    };
    // const meta = { city: city };
    if (
      (prod.value == "Exchange Currency" && selected) ||
      prod.value == "Forex Card"
    ) {
      setOrder({
        ...Order,
        city: city,
        product: prod.value,
      });
      if (cartItems?.Items?.length > 0) {
        setCartItems({
          Items: [...cartItems.Items, Item],
        });
      } else {
        setCartItems({
          Items: [Item],
        });
      }
      router.push("my-cart");
      return;
    } else {
      setOrder({
        city: city,
        type: prod.value,
        product: prod.value,
        orderItems: [
          {
            intialCurrency: selected ? intialCurrency : finalCurrency,
            finalCurrency: selected ? finalCurrency : intialCurrency,
            amount: (amount * ((rate * (1 + (factor + cf) / 100)) ** powerFactor)).toFixed(2),
            forexAmount: amount,
            inrAmount: (amount * (rate * (1 + (factor + cf) / 100))).toFixed(2),
            rate: (rate * (1 + (factor + cf) / 100) ** powerFactor).toFixed(2),
            product:
              prod.value == "Exchange Currency"
                ? "Currancy"
                : prod.value == "Transfer Money Abroad"
                  ? "Remittance"
                  : prod.value,
            bs: selected ? "Buy" : "Sell",
          },
        ],
      });
      router.push(prod.value == "Travel Services" ? "/details/" : "/summary/");
    }
    // router.push(prod.value == "Travel Services" ? "/details/" : "/summary/");
  };
  const scroll = (id) => {
    const section = document.querySelector(id);
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollLeft = () => {
    console.log(srollRef);
    // srollRef.current.scrollLeft -= srollRef.
    if (srollRef.current) {
      srollRef.current.scrollBy({
        top: 0,
        left: -1 * (width > 600 ? 300 : 200),
        behavior: 'smooth'
      });
    }
  }
  const scrollRight = () => {
    if (srollRef.current) {
      srollRef.current.scrollBy({
        top: 0,
        left: (width > 600 ? 300 : 200),
        behavior: 'smooth'
      });
    }
  }

  return (
    <div className=" bg-background w-full  overflow-hidden flex flex-col items-start justify-start">
      <CityModal
        onClick={handleOrder}
        open={open}
        handleClose={handleClose}
        city={city}
        onCitySelect={setCity}
        redirectTo="/summary/"
      />
      {/* <WarningModal message={" You can Buy 3000$ worth cash and 250000$ forx card"} /> */}
      <Modal
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#FFF",
          p: 4,
          borderRadius: "32px",
          width: "100vw",
        }}
        open={openBlog}
      >
        {/* <div className="w-96 h-96 bg-white !border-none" >

        </div> */}

        <div className="  sm:w-[822px] w-[95vw] shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] rounded-13xl bg-white max-w-full overflow-hidden flex flex-col items-start justify-start py-[100px] px-[5%] laptop:px-[120px] box-border gap-[39px] leading-[normal] tracking-[normal] cursor-pointer text-center text-5xl text-text3 font-body-small mq450:gap-[19px] mq450:box-border">
          <div className="self-stretch flex flex-row items-start justify-center text-left text-13xl text-secondary">
            <div className="relative leading-[40px] mq450:text-lgi mq450:leading-[24px] mq750:text-7xl mq750:leading-[32px]">
              <span>{message}</span>
              {/* <span className="text-primary">{userData?.user?.name}</span> */}
            </div>
          </div>
          <div className="self-stretch relative leading-[36px] font-medium mq450:text-lgi mq450:leading-[29px]"></div>
          <div className="self-stretch flex flex-row items-start justify-center max-w-full">
            <div className="w-[489px] relative inline-block max-w-full mq450:text-lgi">
              <span className="leading-[40px] text-secondary">
                {/* {userData?.email} */}
              </span>
            </div>
          </div>
          <div className="self-stretch flex flex-row items-start justify-start py-0 px-[76px] box-border max-w-full mq750:pl-[38px] mq750:pr-[38px] mq750:box-border">
            <button
              onClick={() => {

                setMessage("Blogs are coming soon ! ");
                callBack
                setCallBack(() => { setOpenBlog(false); })
              }}
              className="cursor-pointer [border:none] py-[18px] px-5 bg-secondary flex-1 shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] rounded-2xl overflow-hidden flex flex-row items-start justify-center box-border gap-[16px] max-w-full hover:bg-darkslateblue-800"
            >
              <img
                className="h-8 w-8 relative overflow-hidden shrink-0 hidden min-h-[32px]"
                alt=""
                src="/ushoppingcart.svg"
              />
              <div className="relative text-5xl leading-[32px] font-body-small text-white text-left inline-block min-w-[61px] mq450:text-lgi mq450:leading-[26px]">
                Continue
              </div>
            </button>
          </div>
        </div>
      </Modal>
      <section className="self-stretch  bg-black flex flex-col items-start justify-start pt-4 px-0 pb-0 box-border relative gap-[82px] max-w-full text-left text-xl text-white font-body-small mq825:gap-[20px_82px] mq825:pt-5 mq825:box-border mq1275:gap-[41px_82px] mq1275:pt-[31px] mq1275:box-border">
        <div
          onClick={() => {
            router.push("/my-cart/");
          }}
          className="fixed flex flex-col gap-[-4px] items-end z-50 bottom-[30px] right-[20px] "
        >
          <div className="w-6 h-6  z-[55] rounded-full text-center bg-[#FF9135]">
            {cartItems?.Items ? cartItems?.Items.length : 0}
            {/* {console.log(Order)} */}
          </div>
          <div
            style={{
              boxShadow:
                "0px 6px 24px -4px rgba(18, 25, 56, 0.10), 0px 12px 48px 4px rgba(18, 25, 56, 0.15)",
              backdropFilter: "blur(24px)",
            }}
            className="bg-[#161435] opacity-[90%] font-normal -mt-3 rounded-md px-4 py-2 font-semibold flex flex-col items-center gap-1  text-sm "
          >
            <img src="/AddCart.svg" />
            cart
          </div>
        </div>
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/bg-grad.png"
        />
        <img className="w-full absolute !m-[0] z-[1]" alt="" />
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
                  <div className=" flex flex-row items-center justify-center py-1 ">
                    <div
                      onClick={() => {
                        setdrawerOpen(false);

                        scroll("#about");

                      }}
                      className=" cursor-pointer relative leading-[32px] inline-block "
                    >
                      About
                    </div>
                  </div>
                  <div
                    onClick={() => {
                      setdrawerOpen(false);

                      router.push("/rates-new");
                    }}
                    className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                  >
                    <div className="relative leading-[32px]">Rates</div>
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
                      setdrawerOpen(false);

                      setdrawerOpen(false);
                      scroll("#blogs");
                    }}
                    className="cursor-pointer  shrink-0 flex flex-row items-center justify-center py-1  box-border"
                  >
                    <div className="relative leading-[32px]">Blogs</div>
                  </div>
                </div>
              </div>
              <div className={` flex h-16 gap-[12%] items-center flex-col`}>
                <div
                  onClick={() => {
                    setdrawerOpen(false);

                    if (userData?.user?.name) {
                      router.push("/profile");
                      return;
                    }
                    signInWithPopup(auth, provider)
                      .then((result) => {
                        // This gives you a Google Access Token. You can use it to access the Google API.
                        const credential =
                          GoogleAuthProvider.credentialFromResult(result);
                        const token = credential.accessToken;

                        // The signed-in user info.
                        const user = result.user;
                        // IdP data available using getAdditionalUserInfo(result)
                        // ...

                        setUserData({
                          name: user.displayName,
                          email: user.email,
                          photo: user.photoURL,
                          token: token,
                        });
                        // login({
                        //   email: user.email,
                        //   name: user.displayName,
                        //   password: token,
                        // });
                      })
                      .catch((error) => {
                        // Handle Errors here.
                        const errorCode = error.code;
                        const errorMessage = error.message;
                        // The email of the user's account used.
                        const email = error?.customData?.email;
                        // The AuthCredential type that was used.
                        console.log(error);
                        const credential =
                          GoogleAuthProvider.credentialFromError(error);
                        // ...
                      });
                  }}
                  className={` ${userData?.user?.name && "bg-[#3c498b4d] py-3 px-5 rounded-xl cursor-pointer "} text-[#FF9135] font-semibold text-sm `}
                >
                  {userData?.user?.name ? userData?.user?.name.split(" ")[0] : "Login"}
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
            </div>
          </div>
        </Drawer> */}
        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-0 pl-0 box-border max-w-full">
          <div className=" flex flex-col items-end justify-start gap-[50px] max-w-full mq825:gap-[49px_98px] mq450:gap-[24px_98px] px-5 sm:px-[3%] laptop:px-[120px] ">
            <Navbar container="!bg-darkslateblue-200" />
            {/* <div className="sm:visible w-full w-[95%] h-[4vw] min-h-[85px] mt-0 rounded-3xl bg-darkslateblue-200 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] flex flex-row  items-center justify-between py-[26px] px-16 box-border top-[0] z-[99] sticky gap-[20px] max-w-full mq1275:pl-8 mq1275:pr-8 mq1275:box-border">
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
                    <div className="flex gap-[15%] ">
                      <div className=" flex flex-row items-center justify-center py-1 ">
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
                          router.push("/rates-new");
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
                  <div className={` flex h-16 gap-[12%] items-center flex-row`}>
                    <div
                      onClick={() => {
                        if (userData?.user?.name) {
                          router.push("/profile");
                          return;
                        }
                        signInWithPopup(auth, provider)
                          .then((result) => {
                            // This gives you a Google Access Token. You can use it to access the Google API.
                            const credential =
                              GoogleAuthProvider.credentialFromResult(result);
                            const token = credential.accessToken;

                            // The signed-in user info.
                            const user = result.user;
                            // IdP data available using getAdditionalUserInfo(result)
                            // ...

                            setUserData({
                              name: user.displayName,
                              email: user.email,
                              photo: user.photoURL,
                              token: token,
                            });
                            // login({
                            //   email: user.email,
                            //   name: user.displayName,
                            //   password: token,
                            // });
                          })
                          .catch((error) => {
                            // Handle Errors here.
                            const errorCode = error.code;
                            const errorMessage = error.message;
                            // The email of the user's account used.
                            const email = error?.customData?.email;
                            // The AuthCredential type that was used.
                            console.log(error);
                            const credential =
                              GoogleAuthProvider.credentialFromError(error);
                            // ...
                          });
                      }}
                      className={` ${userData?.user?.name && "bg-[#3c498b4d] py-3 px-5 rounded-xl "} text-[#FF9135] font-semibold text-sm `}
                    >
                      {userData?.user?.name ? userData?.user?.name.split(" ")[0] : "Login"}
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
            </div> */}
            <div className="self-stretch w-full flex sm:flex-row flex-col items-start justify-between laptop:gap-[10%] gap-12 max-w-full text-[64px] text-text5  mq1575:flex-wrap">
              <form
                id="main-content"
                className="ml-[6%]  m-0 sm:ml-0 w-[90%] sm:w-[48%] tablet:min-w-[600px] laptop:min-w-[640px] flex-1 ml-[3%] rounded-lg sm:rounded-13xl bg-darkslateblue-200 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-col items-center justify-start pt-8 px-2 sm:px-8 pb-12 box-border gap-[56px]  max-w-full z-[2] mq825:pt-[21px] mq825:pb-[31px] mq825:box-border "
              >
                <div className="text-[25%] overflow-x-hidden h-0 sm:h-auto invisible sm:visible w-full max-w-[95%] rounded-3xl bg-darkslateblue-100 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-x-auto flex flex-row items-center justify-evenly py-2 px-8 gap-[1px]">
                  <div
                    onClick={() => {
                      setprod({
                        label: "Exchange Currency",
                        value: "Exchange Currency",
                      });
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium  font-body-small ${prod.value == "Exchange Currency" ? "" : "font-medium"} text-white text-center`}
                    >
                      Exchange Currency
                    </div>
                    {prod.value == "Exchange Currency" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      setprod({
                        label: "Transfer Money Abroad",
                        value: "Transfer Money Abroad",
                      });
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium  font-body-small ${prod.value == "Transfer Money Abroad" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Transfer Money Abroad
                    </div>
                    {prod.value == "Transfer Money Abroad" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      setprod({ label: "Forex Card", value: "Forex Card" });
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium font-body-small ${prod.value == "Forex Card" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Forex Card
                    </div>
                    {prod.value == "Forex Card" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                  <div
                    onClick={() => {
                      setprod({
                        label: "Travel Services",
                        value: "Travel Services",
                      });
                    }}
                    className="cursor-pointer [border:none] py-4 px-2 bg-[transparent]  shadow-[0px_8px_16px_rgba(39,_53,_126,_0.1)] box-border shrink-0 flex flex-col items-center justify-center border-b-[4px] border-solid border-primary hover:bg-chocolate-200"
                  >
                    <div
                      className={`relative text-medium  font-body-small ${prod.value == "Travel Services" ? "" : "font-medium   "} text-white text-center`}
                    >
                      Travel Services
                    </div>
                    {prod.value == "Travel Services" && (
                      <div className="w-full h-1 rounded-xl mt-2 -mb-2 bg-[#FF9135]"></div>
                    )}
                  </div>
                </div>
                <div className="self-stretch flex  -mt-20 sm:mt-0 flex-col items-center justify-center gap-[32px] max-w-full ">
                  {size.width < 640 && (
                    <div className="flex-1 w-[100%] flex flex-col items-start justify-start gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
                      <Select
                        defaultValue={prod}
                        value={prod}
                        isSearchable={true}
                        onChange={setprod}
                        options={options}
                        classNames={{
                          container: () =>
                            "w-full !rounded-[1rem] !underline-offset-2  text-white !rounded-[1rem] !border-none  bg-[#263772] py-1 sm:py-2 ",
                          control: () =>
                            "self-stretch !bg-[#263772]  !text-center !font-semibold  !border-b-4 border-x-0 border-t-0  !border-[#FF9135] mb-1 !mx-6 ",
                          menuList: () => "!bg-midnightblue",
                          option: () => "text-white hover:text-midnightblue",
                          input: () =>
                            "text-white !text-center !border-[#FF9135]  ",
                          singleValue: () => "!text-white !text-sm",
                          indicatorSeparator: () => "hidden",
                        }}
                      />
                    </div>
                  )}

                  {prod.value == "Exchange Currency" && (
                    <div className="self-stretch -mt-6 rounded-2xl bg-gray-100 shadow-[-2px_2px_8px_rgba(14,_21,_56,_0.2)_inset,_-4px_4px_16px_rgba(15,_20,_45,_0.15)_inset] flex flex-row items-start justify-start max-w-full [row-gap:20px] mq825:flex-wrap">
                      <div
                        onClick={() => {
                          setSelected(true);
                        }}
                        className={` w-[50%] cursor-pointer [border:none] py-3 px-5 ${selected ? "bg-primary" : ""} rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border whitespace-nowrap max-w-full hover:font-semibold`}
                      >
                        <div
                          className={`relative text-base sm:text-xl ${selected ? "font-semibold" : "font-medium"} hover:font-semibold  text-white text-center inline-block min-w-[123px] `}
                        >
                          Buy Currency
                        </div>
                      </div>
                      <div className="  w-[50%] flex-1 overflow-hidden flex flex-row items-center justify-center box-border ">
                        <div
                          onClick={() => {
                            setSelected(false);
                          }}
                          className={` cursor-pointer [border:none] py-3 px-2 sm:px-5 ${!selected ? "bg-primary" : ""} flex-1 rounded-2xl overflow-hidden flex flex-row items-center justify-center box-border  whitespace-nowrap max-w-full hover:font-semibold`}
                        >
                          <div
                            className={`relative text-base sm:text-xl ${!selected ? "font-semibold" : "font-medium"} hover:font-semibold  text-white text-center inline-block min-w-[123px]`}
                          >
                            Sell Currency
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="flex-1 w-[100%] flex flex-col -mb-4 items-start justify-start gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
                    <Select
                      defaultValue={city}
                      value={city}
                      isSearchable={true}
                      onChange={setCity}
                      options={cityOptions}
                      placeholder="Select City"
                      classNames={{
                        container: () =>
                          "w-full  !text-white !rounded-xl !border-none  rounded-lg bg-gray-100 py-1 sm:py-2 ",
                        control: () =>
                          "self-stretch !bg-transparent !border-none !mx-2",
                        menuList: () => "!bg-midnightblue",
                        option: () => "!text-white hover:!text-midnightblue",
                        input: () => "!text-white",
                        singleValue: () => "!text-white !text-base",
                        indicatorSeparator: () => "hidden",
                        placeholder: () => "!text-white",
                      }}
                    />
                  </div>
                  {prod.value == "Travel Services" && (
                    <div className="flex-1 w-[100%] flex flex-col -mb-4 items-start justify-start gap-[16px] min-w-[240px] max-w-full text-left text-xl text-text5 font-body-small">
                      <Select
                        value={service}
                        isSearchable={true}
                        onChange={setService}
                        options={serviceOption}
                        placeholder="Select Service"
                        classNames={{
                          container: () =>
                            "w-full  !text-white !rounded-xl !border-none  rounded-lg bg-gray-100 py-1 sm:py-2 ",
                          control: () =>
                            "self-stretch !bg-transparent !border-none !mx-2",
                          menuList: () => "!bg-midnightblue",
                          option: () => "!text-white hover:!text-midnightblue",
                          input: () => "!text-white",
                          singleValue: () => "!text-white !text-base",
                          indicatorSeparator: () => "hidden",
                          placeholder: () => "!text-white",
                        }}
                      />
                    </div>
                  )}
                  <div className="self-stretch  flex flex-col items-start justify-between gap-[24px] max-w-full">
                    {prod.value != "Travel Services" && (
                      <div className="self-stretch flex flex-row items-start justify-between gap-5 max-w-full mq825:flex-wrap">
                        {/* <FrameComponent2
                          selectedOption={intialCurrency}
                          setSelectedOption={setIntialCurrency}
                          currencyYouHave={
                            selected ? "Currency you Have" : "Currency you Want"
                          }
                        /> */}
                        <FrameComponent2
                          fixed={true}
                          selectedOption={finalCurrency}
                          setSelectedOption={setFinalCurrency}
                          currencyYouHave={
                            selected ? "Currency you Want" : "Currency you Have"
                          }
                        />
                      </div>
                    )}

                    {prod.value != "Travel Services" && (
                      <div className="self-stretch flex flex-col sm:flex-row flex-wrap items-startr sm:items-end justify-start gap-[24px] max-w-full flex-wrap">
                        <div className="flex flex-col gap-2 flex-1 self-stretch ">
                          <div className=" relative self-stretch font-semibold text-base ">
                            Forex Amount
                          </div>
                          <div className="flex-1 self-stretch sm:self-auto min-w-0 xs:w-full rounded-[12px] sm:rounded-lg bg-gray-100 overflow-hidden flex flex-row items-center justify-between py-2 sm:py-3 px-2 sm:px-6 box-border [row-gap:20px] max-w-full gap-[0px] mq825:flex-wrap">
                            <input
                              style={{ color: "white" }}
                              className="!text-white self-stretch w-[80%] max-w-[419px]  [border:none] [outline:none] bg-[transparent] h-8 flex flex-row items-center justify-start font-body-small font-semibold  !text-base sm:text-xl text-text5 "
                              placeholder="Forex Amount"
                              type="text"
                              value={amount}
                              onChange={(e) => setAmount(e.target.value)}
                            />
                            <img
                              onClick={() => {
                                setMessage(
                                  <div className="text-[#102A83] flex flex-col justify-start gap-0" >
                                    <div>Heads Up!</div>
                                    <div><b>Max Currency Exchange: $3,000</b></div>
                                    <div><b>Max Forex Card Load: $250,000</b></div>
                                    <div>Plan your transactions accordingly.</div>
                                  </div>
                                );
                                setOpenBlog(true);
                              }}
                              className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
                              alt=""
                              src="/uinfocircle.svg"
                            />
                          </div>
                        </div>
                        <div className="w-[239px] rounded-2xl bg-informative box-border overflow-hidden shrink-0 flex flex-row items-center justify-center py-2 sm:py-3 px-[26px] whitespace-nowrap border-[2px] border-solid border-secondary">
                          <div className="flex-1 relative text-base sm:text-3xl leading-[32px] font-body-small text-white text-left">
                            1 {finalCurrency?.smValue} ={" "}
                            {(rate * (1 + (factor + cf) / 100)).toFixed(2)} {intialCurrency?.value}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="self-stretch -mt-8 flex flex-row items-end justify-between gap-4 sm:gap-10 max-w-full mq825:flex-wrap ">
                  {prod.value != "Travel Services" && (
                    <div className="flex flex-col items-start justify-center gap-[8px]">
                      <div className="w-[181px] relative text-7xl leading-[32px] font-body-small text-accent text-left inline-block mq825:text-7xl mq825:leading-[26px] mq450:text-lgi mq450:leading-[19px]">
                        {"INR"} Amount
                      </div>
                      <h1
                        style={{
                          textSizeAdjust: "0.58",
                        }}
                        className="m-0 w-32 text-wrap  relative text-2xl leading-[56px] font-normal font-body-small text-white text-left mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]"
                      >
                        {`${(amount * (rate * (1 + cf / 100) * (1 + factor / 100))).toFixed(2)}`}
                      </h1>
                    </div>
                  )}

                  {((prod.value == "Exchange Currency" && selected) ||
                    prod.value == "Forex Card") && (
                      <div
                        onClick={() => {
                          AddToCart();
                        }}
                        className="cursor-pointer [border:none] py-3 px-10 sm:py-2 bg-[#FF9135] rounded-lg sm:rounded-3xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden flex flex-row items-center justify-center box-border gap-[16px] whitespace-nowrap max-w-full hover:bg-gainsboro-100"
                      >
                        <img
                          className="h-11 w-11 relative overflow-hidden shrink-0 min-h-[32px]"
                          alt=""
                          src="/AddCart.svg"
                        />
                      </div>
                    )}

                  <div
                    onClick={() => {
                      handleOrder();
                    }}
                    className="cursor-pointer min-w-[240px] w-[35%] flex-1 [border:none] py-3 sm:py-4 bg-white rounded-lg sm:rounded-2xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden flex flex-row items-center justify-center box-border gap-[16px] min-w-[163px] whitespace-nowrap max-w-full hover:bg-gainsboro-100"
                  >
                    {/* <img
                      className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[32px]"
                      alt=""
                      src="/ushoppingcart.svg"
                    /> */}
                    <div className="relative text-base sm:text-3xl  font-semibold font-body-small text-text1 text-left">
                      {prod.value != "Travel Services"
                        ? selected
                          ? "Buy Now"
                          : "Sell Now"
                        : "Submit Request"}
                    </div>
                  </div>
                </div>
              </form>
              <div className=" w-[98%] sm:w-[38%] flex-1 self-streach laptop:w-full flex flex-col items-start justify-start pt-0 sm:pt-[24px] px-0  pb-0 box-border  max-w-full mq825:min-w-full mq450:box-border mq1575:flex-1">
                {size.width > 640 && (
                  <div className=" w-[100%] ml-[12%]  pb-5 sm:ml-0 sm:w-inherit sm:self-stretch flex flex-col items-start justify-start gap-[32px] z-[2] mq825:gap-[32px_64px] mq450:gap-[16px_64px]">
                    <h1 className="m-0 self-stretch relative text-[3rem] font-semibold font-inherit mq825:text-[51px] mq825:leading-[58px] mq450:text-19xl mq450:leading-[43px]">
                      {prod?.value == "Exchange Currency"
                        ? "Exchange Your Currency"
                        : `${prod?.value}${prod?.value == "Transfer Money Abroad" ? "- Remittance for Education" : ""}`}
                    </h1>
                    <div className="self-stretch relative text-[1.25rem] leading-[30px] font-medium text-white mq450:text-lgi mq450:leading-[29px]">
                      {size.width > 640 && <>{dispMap[prod?.value]}</>}
                    </div>
                    <div className="cursor-pointer bg-rd-400 w-full py-3 flex justify-start gap-[11%] ">
                      <div
                        onClick={() => {
                          router.push("/corporate");
                        }}
                        className="w-[42%] font-semibold flex flex-col items-center gap-5 rounded-lg text-base py-6 bg-[#181545] "
                      >
                        <img src="/Briefcase.svg" />
                        <div>Corporate Solutions</div>
                      </div>
                      <div
                        onClick={() => {
                          router.push("/call-back");
                        }}
                        className="w-[42%] font-semibold flex flex-col items-center gap-5 rounded-lg text-base py-6 bg-[#181545] "
                      >
                        <img src="/Support.png" />
                        <div>Request Call Back</div>
                      </div>
                    </div>
                    {/* {size.width < 640 && (
                    
                   */}
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>

        {/* {size.width > 640 && ( */}
        <div className="flex w-full flex-col bg-darkslateblue-300 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] max-w-full p-0 justify-start" >
          <div className="self-stretch flex  overflow-hidden flex flex-row items-center justify-start py-12 px-0 tablet:px-8 box-border relative gap-0 tablet:gap-4 max-w-full z-[2]  mq450:pt-[31px] mq450:pb-[31px] mq450:box-border">
            <div onClick={() => {
              scrollLeft()
            }} ><img src="u_angle-right-l.svg" /></div>
            <div ref={srollRef} className="flex w-full snap-x overflow-x-scroll flex w-full gap-5">
              {rates.map((rate, index) => {
                
                return <>
                  <CurrencyCard ref={index == 0 ? srollRef : null} key={index} rate={rate} />
                </>
              }

              )}
            </div>
            <div onClick={() => {
              scrollRight()
            }} ><img src="u_angle-right-b.svg" /></div>

          </div>
          <div className=" self-stretch flex justify-center pt-2 pb-12 px-8 box-border relative gap-4 max-w-full z-[2] ">

            <button
              onClick={() => {
                router.push("/rates-new");
              }}
              className="cursor-pointer [border:none] gap-[8px] tablet:gap-[14px] py-0 tablet:py-4 px-[30px] tablet:px-[38px] bg-background h-12 tablet:h-16 rounded-2xl shadow-[0px_8px_24px_rgba(57,_26,_0,_0.15)] overflow-hidden shrink-0 flex flex-row items-center justify-center box-border whitespace-nowrap hover:bg-gainsboro-200"
            >
              <img
                className="h-8 w-8 relative overflow-hidden shrink-0 min-h-[28px]"
                alt=""
                src="/gglist.svg"
              />
              <div className="relative text-base font-semibold  text-secondary text-left">
                See Full Rate Card
              </div>
            </button>
          </div>
        </div>
        {/* )} */}

      </section>

      <section
        id="about"
        style={{
          ...getImgObjectURL("/abtbg.png"),
          backdropFilter: "blur(24px)",
        }}
        className="self-stretch py-20 bg-background overflow-hidden flex flex-col items-start justify-center px-[2vw] sm:px-[5vw] box-border max-w-full text-left text-29xl text-white font-body-small mq825:py-[104px] sm:px-[30px] mq825:box-border mq450:pt-[68px] mq450:pb-[68px] mq450:box-border mq1275:box-border"
      >
        <div className="self-stretch flex flex-row items-center justify-start gap-[5%] w-[95%] ml-[2.5%] sm:ml-0  sm:w-full mq825:gap-[111px_55px] mq450:gap-[111px_28px] mq1575:flex-wrap">
          <div
            style={{ backdropFilter: "blur(108px)" }}
            className="flex bg-[#00236df2]  gap-8 rounded-[2rem] py-10 px-[7%] sm:px-[5%] sm:px-12 flex-col items-start justify-start w-[90vw] sm:w-[94%]"
          >
            <div className=" box-border flex flex-row items-center justify-center py-0 px-[21px] border-l-[5px] border-0 border-solid border-primary">
              <h1 className="m-0 relative text-[2.5rem] font-semibold inline-block mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                Welcome to World One Forex
              </h1>
            </div>
            <div className="self-stretch  font-normal mt-2 relative text-lg tablet:text-[1.2vw] font-medium text-white inline-block mq450:text-lgi leading-[29px]">
              <p className="m-0">
                Where your foreign exchange needs are met with expertise and
                care.
                <br /> Established in 2013, World One Forex has become a leading
                name in reliable and efficient foreign exchange services. We are
                a licensed operator, holding both the AD CAT II and Import of
                Foreign Currencies Licence, ensuring you safe and secure
                transactions.
                <br />
                <b>
                  {" "}
                  Our unwavering focus on professionalism and efficiency has
                  resulted in a remarkable customer retention rate exceeding 90%
                </b>
                . <br />
                We understand the importance of trust and transparency when
                dealing with your hard-earned money. That's why we prioritize
                building long-lasting relationships with our clients.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        style={getImgObjectURL("/counterbg.png")}
        className="w-full flex justify-center items-center py-[70px] sm:px-[1%] max-w-[100vw]  h-full"
      >
        <Counter bgStyle={getImgObjectURL("/abtbg.png")} />
      </section>
      {/* <section className="w-full bg-background overflow-hidden flex flex-wrap flex-col sm:flex-row items-evenely sm:items-start gap-8  mb-5 box-border max-w-full text-left text-29xl text-text1 font-body-small ">
        <div className="sm:w-[60%] w-full px-[5%] h-36 bg-red-400 flex flex-col items-center justify-start ">
          <div className="w-full h-full flex flex-col gap-[3vw] sm:gap-[2vw] bg-blue-400  ">
            <div className=" text-[2rem] sm:text-[2.8vw] font-bold">
              Welcome to World One Forex
            </div>
            <div className="text-[1.5rem] sm:text-[2vw] font-semibolt">
              Where your foreign exchange needs are met with expertise and care.
            </div>
            <div className="text-[2.6vw] sm:text-[1.4vw] font-[480]">
              Established in 2013, World One Forex has become a leading name in
              reliable and efficient foreign exchange services. We are a
              licensed operator, holding both the AD CAT II and Import of
              Foreign Currencies Licence, ensuring you safe and secure
              transactions.
            </div>
          </div>
          <div className="w-full bg-blue-100 h-12 mb-12 "> </div>
          
        </div>
        <div className="sm:w-[36%] w-full h-36 bg-secondary flex flex-col items-center justify-start gap-[5%]">
          <img className="w-full" src="/unsplash8nppe0ylmn8@2x.png" />
        </div>
      </section> */}
      <section
        id="services"
        className="self-stretch bg-secondary overflow-hidden flex flex-row items-start justify-center py-[120px] px-5 box-border relative gap-[8px] max-w-full text-left text-29xl text-text5 font-body-small mq825:pt-[51px] mq825:pb-[51px] mq825:box-border mq1275:pt-[78px] mq1275:pb-[78px] mq1275:box-border"
      >
        <img
          className="h-full w-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-cover"
          alt=""
          src="/conditional-branch@2x.png"
        />
        <div className="w-full px-[5%] flex flex-row items-start justify-start max-w-full z-[1] mq825:gap-[120px_60px] mq450:gap-[120px_30px]">
          <div className="flex-1  flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
            <div className="w-full  box-border flex flex-row items-start justify-start py-0 px-[21px] max-w-full text-text2 border-0 border-l-[5px] border-solid border-accent">
              <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal text-white font-inherit inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                Products Offered
              </h1>
            </div>

            <div className="self-stretch relative text-5xl leading-[36px] font-medium mq450:text-lgi mq450:leading-[29px]"></div>
            <div className=" w-full gap-y-4 flex flex-row  flex-wrap items-center justify-evenly relative gap-[1%] max-w-full text-13xl ">
              <FrameComponent
                currency="/currency.svg"
                exchangeCurrency="Exchange Currency"
                onClick={() => {
                  setprod({
                    label: "Exchange Currency",
                    value: "Exchange Currency",
                  });
                  scroll("#main-content");
                }}
                content={`Exchange major world currencies with competitive rates and exceptional service, ensuring seamless transactions for your convenience.`}
              />
              <FrameComponent
                currency="/send-money.svg"
                exchangeCurrency="Transfer Money Abroad"
                onClick={() => {
                  setprod({
                    label: "Transfer Money Abroad",
                    value: "Transfer Money Abroad",
                  });
                  scroll("#main-content");
                }}
                content={`Send money internationally, fast & secure. Ideal for fees, Currently availaible for all educational transphers only.`}
              />
              <FrameComponent
                currency="/mdilightcreditcard.svg"
                exchangeCurrency="Forex Card"
                onClick={() => {
                  setprod({ label: "Forex Card", value: "Forex Card" });
                  scroll("#main-content");
                }}
                content={`Secure & convenient prepaid card for spending abroad. Lock in rates, avoid hidden fees.`}
              />
              <FrameComponent
                currency="/phairplanetakeofflight.svg"
                exchangeCurrency="Travel Services"
                onClick={() => {
                  setprod({
                    label: "Travel Services",
                    value: "Travel Services",
                  });
                  scroll("#main-content");
                }}
                content={`Protect your trip with comprehensive Travel Services. Get peace of mind for medical emergencies, trip cancellations, and more.`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 sm:px-[3%] laptop:px-[120px]  self-stretch flex flex-row items-start justify-start max-w-full text-left text-29xl text-text1 font-body-small">
        <div className="flex-1 bg-background overflow-hidden flex flex-col items-start justify-center py-40 box-border max-w-full  mq825:box-border mq450:pt-[68px] mq450:pb-[68px] mq450:box-border mq1275:py-[104px]  mq1275:box-border">
          <div className="self-stretch flex flex-col items-start justify-start gap-[111px] max-w-full mq825:gap-[55px_111px] mq450:gap-[28px_111px]">
            <div className="self-stretch flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
              <div className=" box-border flex flex-row items-center justify-center py-0 px-[21px] max-w-full border-l-[5px] border-0 border-solid border-secondary">
                <div className="flex-1 relative leading-[56px] inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
                  Why Choose World One Forex?
                </div>
              </div>
              <div className="self-stretch relative text-5xl  leading-[36px]  text-text2 mq450:text-lgi mq450:leading-[29px]">
                Embark on a journey of seamless currency exchange with World One
                Forex. Here's why our users love us:
              </div>
            </div>
            <div className=" overflow-x-hidden flex flex-row flex-wrap items-center justify-evenly gap-[0.5px] w-full ">
              <LinkFunction
                reliability="Reliability"
                trustOurExperienceAndSecu="Trust our experience and secure transactions."
                imgSrc="/relablity.svg"
              />
              <LinkFunction
                reliability="Competitive Rates"
                trustOurExperienceAndSecu="Maximize currency value with our rates.
"
                imgSrc="/crates.svg"
              />
              <LinkFunction
                reliability="Convenience"
                trustOurExperienceAndSecu="Experience hassle-free currency exchange online."
                imgSrc="/security.svg"
              />
              <LinkFunction
                reliability="Security"
                trustOurExperienceAndSecu="Rest assured with our stringent measures."
                imgSrc={"/Convenience.svg"}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <section className="self-stretch [background:radial-gradient(50%_50%_at_50%_50%,_#1e2962,_#4058d1)] overflow-hidden flex flex-col items-center justify-start pt-[114.5px] px-5 pb-[122.5px] box-border relative gap-[64px] max-w-full text-left text-29xl text-white font-body-small mq825:gap-[32px_64px] mq825:pt-[74px] mq825:pb-20 mq825:box-border mq450:gap-[16px_64px]">
        <img
          className="w-full h-full absolute !m-[0] top-[0px] right-[0px] bottom-[0px] left-[0px] max-w-full overflow-hidden max-h-full object-contain"
          alt=""
          src="/7-1@2x.png"
        />
        <div className="w-[1685px] flex flex-row items-start justify-center max-w-full">
          <div className="w-[323px] flex flex-row items-start justify-start py-0 px-6 box-border max-w-full z-[1]">
            <h1 className="m-0 flex-1 relative text-inherit leading-[56px] font-normal font-inherit mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
              Testimonials
            </h1>
          </div>
        </div>
        <div className="w-[1685px] overflow-x-auto flex flex-row items-start justify-start relative gap-[72px] max-w-full z-[1] text-5xl text-text5 mq825:gap-[72px_36px] mq450:gap-[72px_18px]">
          <Component />
          <Component propMarginLeft="unset" />
          <div className="w-[1109px] rounded-13xl bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden shrink-0 flex flex-row items-start justify-start py-0 pr-8 pl-0 box-border gap-[48px] [debug_commit:f6aba90]">
            <img
              className="h-96 w-72 relative object-cover"
              alt=""
              src="/rectangle-515-2@2x.png"
            />
            <div className="flex-1 flex flex-col items-start justify-start pt-16 px-0 pb-0 box-border max-w-full">
              <div className="self-stretch flex flex-col items-start justify-center gap-[32px] max-w-full">
                <div className="self-stretch relative leading-[36px] font-medium shrink-0 mq450:text-lgi mq450:leading-[29px]">
                  Lorem ipsum dolor sit amet consectetur. Gravida tellus neque
                  enim dictum commodo. Facilisis odio pulvinar risus id nunc
                  consectetur. Nisi et facilisi condimentum id imperdiet ac duis
                  rutrum faucibus.
                </div>
                <img
                  className="w-[387px] h-1 relative max-w-full"
                  alt=""
                  src="/vector-9-2.svg"
                />
                <div className="self-stretch flex flex-col items-start justify-center gap-[8px] shrink-0 text-13xl text-white">
                  <div className="self-stretch relative leading-[40px] mq825:text-7xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
                    Kathryn Murphy
                  </div>
                  <div className="self-stretch flex flex-row flex-wrap items-center justify-start py-0 pr-[453px] pl-0 gap-[16px] text-5xl text-text5">
                    <div className="flex-1 relative leading-[36px] font-medium inline-block min-w-[103px] mq450:text-lgi mq450:leading-[29px]">
                      IT Professional
                    </div>
                    <img
                      className="h-9 w-0.5 relative min-h-[36px]"
                      alt=""
                      src="/vector-10-2.svg"
                    />
                    <div className="relative leading-[36px] font-medium inline-block min-w-[95px] mq450:text-lgi mq450:leading-[29px]">
                      Age - 28
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Component propMarginLeft="unset" />
          <Component propMarginLeft="unset" />
          <img
            className="h-16 w-16 absolute !m-[0] top-[calc(50%_-_32px)] left-[76px] overflow-hidden shrink-0 object-contain z-[1]"
            alt=""
            src="/uanglerightb-2.svg"
          />
          <img
            className="h-16 w-16 absolute !m-[0] top-[calc(50%_-_32px)] right-[76px] overflow-hidden shrink-0 object-contain z-[1]"
            loading="lazy"
            alt=""
            src="/uangleleftb.svg"
          />
        </div>
      </section> */}
      <section className="self-stretch overflow-hidden flex flex-row items-start justify-center py-[120px] px-5 box-border min-h-[828px] max-w-full text-left text-29xl text-text1 font-body-small mq825:pt-[78px] mq825:pb-[78px] mq825:box-border mq450:pt-[51px] mq450:pb-[51px] mq450:box-border">
        <div className=" flex flex-col items-start justify-start gap-[56px] max-w-full mq825:gap-[28px_56px]">
          <div className=" box-border border-0 flex flex-row flex-between flex-wrap w-full items-start justify-start py-0 px-[21px] max-w-full border-l-[5px] border-solid border-secondary">
            <h1 className="m-0 flex-1 relative text-inherit font-normal font-inherit inline-block max-w-full mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
              Frequently Asked Questions
            </h1>
            {width > 654 && <button
              onClick={() => {
                router.push("/faq");
              }}
              className="cursor-pointer [border:none] py-4 px-[38.5px] bg-secondary h-16 rounded-2xl  overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[14px] whitespace-nowrap hover:bg-gainsboro-200"
            >

              <div className="relative text-base leading-[32px] font-semibold  text-white text-left">
                View More
              </div>
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[32px]"
                alt=""
                src="/fiarrowright.svg"
              />
            </button>}
          </div>
          <FaqItems
            number="01"
            small="What are the sactioned limit on Russian Fedration and Iraq?"
            content="For CIS countries like Russian Fedrtion and Iraq, there is full cash limit. For Iraq and Lybia the sanctioned limit is USD 5000 or equivalent per person per visit."
          />
          <FaqItems
            number="02"
            small="How much currency can I carry on an official/tourist trip abroad?"
            content="You can avail of foreign exchange up to USD 10,000 in any calendar year for tourism or private travel to any country other than Nepal and Bhutan on the basis of self-certification. You are allowed to carry currency equivalent to USD 3,000 & rest in Travel Money Card."
          />
          <FaqItems
            number="03"
            small="How long does it take to service a forex order? Can you provide the currency/card on the same day?"
            content="While we endeavor to process and service all orders within 4-6 business hours (excluding Sunday), we recommend that you place your order 24 hours before you travel so that there is no last minute stress for you"
          />
          <FaqItems
            number="04"
            small="Which bank forex card do you issue?"
            content="IndusInd Bank, Yes Bank & Thomas Cook India Ltd."
          />
          <FaqItems
            number="05"
            small="Can I retain any of the forex that I bought for foreign travel and did not spend?"
            content="You can indefinitely retain foreign exchange up to USD 2,000 for future use. Any foreign exchange in cash in excess of this sum, is required to be surrendered within 90 days of return."
          />
          {width < 654 && <button
            onClick={() => {
              router.push("/faq");
            }}
            className="cursor-pointer [border:none] py-4 px-[38.5px] bg-secondary h-16 rounded-2xl  overflow-hidden shrink-0 flex flex-row items-center justify-center box-border gap-[14px] whitespace-nowrap hover:bg-gainsboro-200"
          >

            <div className="relative text-base leading-[32px] font-semibold  text-white text-left">
              View More
            </div>
            <img
              className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[32px]"
              alt=""
              src="/fiarrowright.svg"
            />
          </button>}
        </div>
      </section>
      <section
        id="blogs"
        style={getImgObjectURL("/blog_bg.svg")}
        className="overflow-hidden w-[100vw] px-[5%] py-24 flex flex-col items-start justify-start  box-border relative gap-[56px] max-w-full text-left text-29xl text-white font-body-small "
      >
        <div className="w-[272px] box-border border-0 flex flex-row items-start justify-start py-0 px-[21px] z-[1] border-l-[5px] border-solid border-accent">
          <h1 className="m-0 w-56 relative text-inherit leading-[56px] font-normal font-inherit inline-block mq825:text-19xl mq825:leading-[45px] mq450:text-10xl mq450:leading-[34px]">
            Our Blogs
          </h1>
        </div>
        <div className="w-[90vw] overflow-x-auto flex flex-row flex-wrap items-start justify-evenly gap-[48px] max-w-full z-[1] mq825:gap-[48px_24px]">
          {/* <ColorAdjustor
            unsplash3PyBkxgTiL0="/unsplash3pybkxgtil0@2x.png"
            welcomeToWorldOneForexBlo="Welcome to WorldOne Forex Blog!"
            onClick={() => {
              setOpenBlog(true);
            }}
          /> */}
          {blogs?.length > 0 && blogs.map((blog, index) => {
            return (
              <ColorAdjustor
                key={index}
                unsplash3PyBkxgTiL0={blog.mobile_image}
                welcomeToWorldOneForexBlo={blog.title}
                content={blog?.mini_content}
                onClick={() => {
                  router.push(`/blogs/${blog.id}`);
                }}
              />
            );
          })}
          {/* <ColorAdjustor
            unsplash3PyBkxgTiL0="/image-14@2x.png"
            welcomeToWorldOneForexBlo="How to exchange currency in India?"
            onClick={() => {
              setOpenBlog(true);
            }}
          />
          <ColorAdjustor
            unsplash3PyBkxgTiL0="/unsplashvp4wmibxvcy@2x.png"
            welcomeToWorldOneForexBlo="Forex Trading In India"
            onClick={() => {
              setOpenBlog(true);
            }}
          /> */}
        </div>
      </section>
      {/* <section className="self-stretch bg-midnightblue overflow-hidden flex flex-col items-center justify-start pt-[30px] px-5 pb-12 box-border gap-[100px] max-w-full text-left text-13xl text-white  mq825:gap-[50px_100px] mq825:pt-[51px] mq825:pb-5 mq825:box-border mq450:gap-[25px_100px] mq1275:pt-[78px] mq1275:pb-[31px] mq1275:box-border">
        <div className="w-full flex flex-row items-start justify-start max-w-full gap-[20px] mq1275:flex-wrap justify-evenly">
          <div className="flex flex-col items-start text-left justify-start gap-[35px] mq450:gap-[17px_35px]">
            <b className="relative leading-[40px] inline-block text-5xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Services
            </b>
            <div className="flex overflow-hidden text-left flex-col items-start justify-start gap-[16px] text-xl text-text5">
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
                  Travel Services
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start text-left justify-start gap-[35px]">
            <b className="relative leading-[40px] text-5xl mq825:leading-[32px] mq450:text-lgi mq450:leading-[24px]">
              Quick Links
            </b>
            <div className="flex flex-col items-start justify-start gap-[16px] text-xl text-text5">
              <div className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[99px] mq450:text-lgi mq450:leading-[26px]">
                  About Us
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-1.5">
                <div className="relative leading-[32px] inline-block min-w-[84px] mq450:text-lgi mq450:leading-[26px]">
                  Careers
                </div>
              </div>
              <div className="flex flex-row items-center justify-center py-2 px-[7px]">
                <div className="relative leading-[32px] inline-block min-w-[80px] mq450:text-lgi mq450:leading-[26px]">
                  Outlets
                </div>
              </div>
              <div className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[48px] mq450:text-lgi mq450:leading-[26px]">
                  FAQ
                </div>
              </div>
              <div className="flex flex-row items-center justify-center p-2">
                <div className="relative leading-[32px] inline-block min-w-[94px] mq450:text-lgi mq450:leading-[26px]">
                  Site Map
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
            <div className="h-12 flex flex-row items-center justify-start py-0  pl-0 box-border gap-[8px] max-w-full mq825:pr-[146px] mq825:box-border mq450:pr-5 mq450:box-border">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/fimail.svg"
              />
              <div id="mail" className="flex flex-row items-center justify-start py-2 px-1.5 box-border max-w-[calc(100%_-_32px)]">
                <b className="relative leading-[32px] whitespace-nowrap mq450:text-lgi text-xl mq450:leading-[26px]">
                  nodaldelhi@worldoneforex.com
                </b>
              </div>
            </div>
            <button className="cursor-pointer [border:none] py-3 px-[77px] bg-white rounded-2xl shadow-[0px_4px_16px_rgba(0,_6,_57,_0.05)] overflow-hidden flex flex-row items-center justify-center whitespace-nowrap hover:bg-gainsboro-100 mq450:pl-5 mq450:pr-5 mq450:box-border">
              <b className="relative text-xl leading-[32px] inline-block  text-text0 text-left min-w-[99px]">
                Contact Us
              </b>
            </button>
          </div>
        </div>
        <div className="w-[1681px] h-[511px] flex flex-row items-start justify-center max-w-full">
          <div className="self-stretch w-[1436px] flex flex-row items-start justify-start relative max-w-full">
            <div className="h-[998px] w-[1413px] absolute !m-[0] bottom-[-531px] left-[-32px] rounded-[50%] bg-steelblue-200 [filter:blur(500px)]" />
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
        <div className="w-[1680px] rounded-[20px] bg-darkslateblue-600 shadow-[0px_6px_24px_-4px_rgba(18,_25,_56,_0.1),_0px_12px_48px_4px_rgba(18,_24,_56,_0.15)] [backdrop-filter:blur(48px)] overflow-hidden flex flex-row items-start justify-between py-5 px-[120px] box-border max-w-full gap-[20px] z-[1] text-xl mq825:pl-[30px] mq825:pr-[30px] mq825:box-border mq1275:flex-wrap mq1275:justify-center mq1275:pl-[60px] mq1275:pr-[60px] mq1275:box-border">
          <div className="relative leading-[24px] font-medium inline-block max-w-full mq450:text-base mq450:leading-[19px]">
            @ 2024 World ne India forex private limited
          </div>
          <div className="flex flex-row items-start justify-start gap-[45px] max-w-full mq450:flex-wrap mq450:gap-[45px_22px]">
            <div className="relative leading-[24px] font-semibold inline-block min-w-[126px] mq450:text-base mq450:leading-[19px]">
              Privacy Policy
            </div>
            <div className="relative leading-[24px] font-semibold mq450:text-base mq450:leading-[19px]">{`Terms & Conditions`}</div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default HomeExchangeCurrency;
