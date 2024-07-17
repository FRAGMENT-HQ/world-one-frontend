import { useState } from "react";
// import OTPInput, { ResendOTP } from "otp-input-react";
import OtpInput from "react-otp-input";
import CountryCode from "./countryCode";
import {
  loginMutation,
  gLoginMutation,
  signupMutation,
  verifyMutation,
  completeMutation,
  forgotPasswordMutation,
  verifyPasswordMutation,
} from "@/hooks/auth";
import toast from "react-hot-toast";
import { authUser } from "@/states/storage";
import { useAtom } from "jotai";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import app, { auth } from "../utils/google";

const provider = new GoogleAuthProvider();
const Login = ({ setStage, close }) => {
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [user, setUser] = useAtom(authUser);
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(0);
  const [code, setCode] = useState("");
  const { mutate: login,isLoading } = gLoginMutation(
    (res) => {
      console.log(res);
      // if code is 200 then login successfull
      console.log(res.status);
      if (res.status == 200) {
        setUser(res.data);
        close();
      }

      if (res.status == 201) {
        setStep(1);
      }
      toast.success("Login successfull");
    },
    (err) => {
      console.log(err);
      toast.error(err?.response?.data?.error || "An error occured");
    }
  );

  const { mutate,isLoading:isLoading1 } = loginMutation(
    (res) => {
      console.log(res);

      setUser(res.data);
      close();

      toast.success("Login successfull");
    },
    (err) => {
      console.log(err);
      toast.error(err?.response?.data?.error || "An error occured");

    }
  );
  const { mutate: complete,isLoading:isLoading2 } = completeMutation(
    (res) => {
      close();

      setUser(res.data);

      toast.success("Login successfull");
    },
    (err) => {
      console.log(err);
      toast.error(err?.response?.data?.error || "Phone no alderdy registered");

    }
  );
  return (
    <div className="flex flex  ">
      <div
        style={{
          boxSadow:
            " 0px 6px 24px -4px rgba(18, 25, 56, 0.10), 0px 12px 48px 4px rgba(18, 25, 56, 0.15)",
          backdropFilter: "blur(24px)",
        }}
        className="flex flex-col px-8 rounded-xl items-center bg-darkslateblue-700"
      >
        <div
          onClick={() => {
            close();
          }}
          className="cursor-pointer w-full text-right text-white pt-2 text-7xl  -mr-8 "
        >
          x
        </div>
        <div className="flex flex-col w-full items-center">
          <h1 className="text-[2rem] text-white font-bold -mb-4">
            Welcome to World One Forex!
          </h1>
          <p className="text-sm text-white mb-8">
            {step == 0
              ? "Please enter your details to login"
              : "complete rest of ypur details"}
          </p>
          {step == 1 && (
            <>
              <div className="self-stretch mb-1 flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
                <CountryCode
                  border="border-0"
                  padding="py-0.5"
                  value={code}
                  setValue={setCode}
                />

                <div className="flex-1 rounded-2xl bg-gray-100 box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] max-w-full border-[1px] ">
                  <input
                    className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                    placeholder="Enter phone number"
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}
          {step == 0 && (
            <>
              <div className="self-stretch mb-8 flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
                <div className="flex-1 rounded-2xl bg-gray-100 box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] max-w-full border-[1px] ">
                  <input
                    className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white  max-w-[231%] shrink-0 "
                    placeholder="Enter phone number"
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="w-full text-sm mb-4 flex justify-end">
                <a
                  onClick={() => {
                    setStage("ForgotPassword");
                  }}
                  className="text-primary cursor-pointer underline"
                >
                  Forgot password?
                </a>
              </div>
            </>
          )}
          <button
            onClick={() => {
              if (step == 0) {
                if (password.length < 8) {
                  toast.error("Password should be atleast 8 characters");
                  return;
                }
                if (phone.length < 10) {
                  toast.error("Phone number should be atleast 10 characters");
                  return;
                }
                mutate({ phone_no: phone, password });
              } else {
                complete({
                  phone_no: phone,
                  country_code: code.value,
                  email: email,
                });
              }
            }}
            className="w-full bg-orange-500 text-white py-3 [border:none] rounded-2xl font-bold mb-4"
          >
             { isLoading || isLoading1 || isLoading2 ? "Laoding..." :  step == 0 ? "Login" : "Complete"}
          </button>
          {step == 0 && (
            <>
              <div className="flex text-white items-center justify-between mb-4">
                <hr className="w-full border-gray-700" />
                <span className="mx-4">or</span>
                <hr className="w-full border-gray-700" />
              </div>

              <button
                onClick={() => {
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

                      // setUserData({
                      //     name: user.displayName,
                      //     email: user.email,
                      //     photo: user.photoURL,
                      //     token: token,
                      // });
                      setEmail(user.email);
                      console.log(token, user);
                      login({
                        email: user.email,
                        first_name: user.displayName.split(" ")[0],
                        last_name: user.displayName.split(" ")[1],
                        password: "randompassword",
                        token: token,
                      });
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
                className="w-full [border:none]  bg-white text-lg font-semibold text-secondary py-2.5 rounded-2xl flex items-center justify-center mb-1 whitespace-nowrap"
              >
                <img
                  src={"flat-color-icons-google.svg"}
                  alt="Google icon"
                  className="w-6 h-6 mr-3"
                />
                Continue with Google
              </button>
              <div className="w-full text-sm flex justify-center gap-1 mb-6">
                <div className="text-white">{"Dont have an account "} </div>
                {` `}
                <a
                  onClick={() => {
                    setStage("Signup");
                  }}
                  className="text-primary cursor-pointer underline"
                >
                  Sign Up?
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const Signup = ({ setStage, close }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(0);
  const { mutate } = signupMutation(
    (res) => {
      toast.success("Signup successfull");
      setStep(1);
    },
    (err) => {
      toast.error(err?.response?.data?.message || "An error occured");
    }
  );
  const { mutate: verify } = verifyMutation(
    (res) => {
      toast.success("Account verified");
      close();
    },
    (err) => {
      toast.error(err?.response?.data?.message || "An error occured");
    }
  );
  return (
    <div className="flex flex px-12 py-4  ">
      <div
        style={{
          boxSadow:
            " 0px 6px 24px -4px rgba(18, 25, 56, 0.10), 0px 12px 48px 4px rgba(18, 25, 56, 0.15)",
          backdropFilter: "blur(24px)",
        }}
        className="flex flex-col px-8 rounded-xl items-center bg-darkslateblue-700"
      >
        <div
          onClick={() => {
            close();
          }}
          className="cursor-pointer w-full text-right text-white pt-2 text-7xl  -mr-8 "
        >
          x</div>
        <div className="flex flex-col w-full items-center">
          <h1 className="text-[2rem] text-white font-bold -mb-4">
            Create an Account
          </h1>
          <p className="text-sm text-white mb-8">Please enter your details</p>
          {step == 0 && (
            <>
              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Enter Your Name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="self-stretch mb-1 flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
                <CountryCode
                  border="border-0"
                  padding="py-0.5"
                  value={code}
                  setValue={setCode}
                />

                <div className="flex-1 rounded-2xl bg-gray-100 box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] max-w-full border-[1px] ">
                  <input
                    className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                    placeholder="Enter phone number"
                    type="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Enter Your Email Id"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
          {step == 1 && (
            <div className="self-stretch w-full  mb-6 flex flex-row items-center justify-center">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span className="w-2"></span>}
                renderInput={(props) => <input {...props} />}
                inputStyle="[border:none] [outline:none] bg-gray-100 h-[1.5rem] rounded-md justify-center font-body-small font-normal text-[1.25rem] !placeholder-white text-white "
              />
            </div>
          )}

          <button
            onClick={() => {
              if (step == 0) {
                if (password.length < 8) {
                  toast.error("Password should be atleast 8 characters");
                  return;
                }
                if (phone.length < 10) {
                  toast.error("Phone number should be atleast 10 characters");
                  return;
                }
                if (password !== confirmPassword) {
                  toast.error("Password and Confirm Password should be same");
                  return;
                }
                // chec for vlid email
                if (
                  !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                    email
                  )
                ) {
                  toast.error("Enter a valid email");
                  return;
                }
                mutate({
                  phone_no: phone,
                  password,
                  email,
                  name,
                  country_code: code.value,
                });
              }
              if (step == 1) {
                verify({ otp, phone_no: phone });
              }
            }}
            className="w-full bg-orange-500 text-white py-3 [border:none] rounded-2xl font-bold mb-4"
          >
            {step == 0 && "Register"}
            {step == 1 && "Verify"}
          </button>

          <div className="w-[80%] text-sm flex justify-center gap-1 mb-6">
            <div className="text-white">{"Alderedy have an account "} </div>
            {` `}
            <a
              onClick={() => {
                setStage("Login");
              }}
              className="text-primary cursor-pointer underline"
            >
              Sign in?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const ForgotPassword = ({ setStage, close }) => {
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const { mutate } = forgotPasswordMutation(
    (res) => {
      console.log(res);
      setStep(1);
      toast.success("OTP sent");
    },
    (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "An error occured");
    }
  );
  const { mutate: verify } = verifyPasswordMutation(
    (res) => {
      console.log(res);
      toast.success("Password changed");
      close();
    },
    (err) => {
      console.log(err);
      toast.error(err?.response?.data?.message || "An error occured");
    }
  );

  const handleNext = () => {
    if (step == 0) {
      if (phone.length < 10) {
        toast.error("Phone number should be atleast 10 characters");
        return;
      }
      mutate({ phone_no: phone });
      setStep(1);
    }
    if (step == 1) {
      if (OTP.length < 6) {
        toast.error("OTP should be 6 characters");
        return;
      }
      if (password.length < 8) {
        toast.error("Password should be atleast 8 characters");
        return;
      }
      if (password !== confirmPassword) {
        toast.error("Password and Confirm Password should be same");
        return;
      }
      verify({ otp: OTP, password, phone_no: phone });
    }
  };
  return (
    <div className="flex flex px-12 py-4  ">
      <div
        style={{
          boxSadow:
            " 0px 6px 24px -4px rgba(18, 25, 56, 0.10), 0px 12px 48px 4px rgba(18, 25, 56, 0.15)",
          backdropFilter: "blur(24px)",
        }}
        className="flex flex-col px-8 rounded-xl items-center bg-darkslateblue-700"
      >
        <div
          onClick={() => {
            close();
          }}
          className="cursor-pointer w-full text-right text-white pt-2 text-7xl  -mr-8 "
        >
          x</div>
        <div className="flex flex-col w-full items-center">
          <h1 className="text-[2rem] text-white font-bold mb-4">
            Forgot Password
          </h1>

          {step == 0 && (
            <div className="self-stretch mb-1 flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
              <div className="flex-1 rounded-2xl bg-gray-100 box-border overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] max-w-full border-[1px] ">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Enter phone number"
                  type="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
          )}
          {step == 1 && (
            <>
              {" "}
              <div className="self-stretch mb-1 flex flex-row items-center justify-start gap-[0.75rem] max-w-full mq900:flex-wrap">
                <OtpInput
                  value={OTP}
                  onChange={setOTP}
                  numInputs={6}
                  renderSeparator={<span className="w-2"></span>}
                  renderInput={(props) => <input {...props} />}
                  inputStyle="[border:none] [outline:none] bg-gray-100 h-[1.5rem] rounded-md justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white "
                />
              </div>
              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex-1 rounded-2xl bg-gray-100 box-border mb-1 overflow-hidden flex flex-row items-center justify-start py-[0.625rem] pr-[0rem] pl-0 xs:pl-[1.5rem] gap-[0.5rem] w-full border-[1px]">
                <input
                  className="[border:none] [outline:none] bg-[transparent] h-[1.5rem] flex flex-row items-center justify-start font-body-small font-normal text-[1.25rem] !placeholder-white text-white max-w-[231%] shrink-0 "
                  placeholder="Confirm Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}

          <button
            onClick={() => {
              handleNext();
            }}
            className="w-full bg-orange-500 text-white py-3 [border:none] rounded-2xl font-bold mb-4"
          >
            {step == 0
              ? "Send OTP"
              : step == 1
                ? "Verify OTP"
                : "Change Password"}
          </button>
          <div className="w-[80%] text-sm flex justify-center gap-1 mb-6">
            <div className="text-white">{"Back to "} </div>
            {` `}
            <a
              onClick={() => {
                setStage("Login");
              }}
              className="text-primary cursor-pointer underline"
            >
              Sign in?
            </a>
          </div>

          {/* <div className="w-[80%] text-sm flex justify-center gap-1 mb-6" ><div className="text-white" >{"Alderedy have an account "} </div>{` `}
                        <a className="text-primary cursor-pointer underline">
                            Sign in?
                        </a>
                    </div> */}
        </div>
      </div>
    </div>
  );
};

const ModalDisp = ({ close }) => {
  const [stage, setStage] = useState("Login");
  return (
    <div className="" >
      {stage == "Login" && <Login close={close} setStage={setStage} />}
      {stage == "Signup" && <Signup close={close} setStage={setStage} />}
      {stage == "ForgotPassword" && (
        <ForgotPassword close={close} setStage={setStage} />
      )}
    </div>
  );
};

export default ModalDisp;
