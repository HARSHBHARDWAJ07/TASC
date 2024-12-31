import * as React from "react";
import { Link } from "react-router-dom";
import {useEffect, useRef, useState} from "react";

const OtpVerification = ({length = 6, onOtpSubmit = () => {}}) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };
  return (
    <div className="flex overflow-hidden flex-col px-11 pb-10 bg-white max-md:px-5">
      <div className="flex items-center mx-20  h-[758px] max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto min-w-[260px] w-[500px] max-md:max-w-full">
          <div className="flex gap-2.5 mb-[40px] items-center w-[52px]">
            <img 
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/9f200e20b4d6bc932f4e20252c7bcc204fc576458c21374b143afbc86435abf4?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
              alt=""
              className="object-contain self-stretch my-auto aspect-square w-[52px]"
            />
          </div>
          <div className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col w-full max-md:max-w-full">
              <div className="flex flex-col max-md:max-w-full">
                <div className="flex flex-col max-w-full font-semibold w-[390px]">
                  <div className="flex flex-col w-[400px]">
                    <h1 className="max-w-full text-5xl text-black rounded-none ">
                      Enter OTP
                    </h1>
                    <div className="pb-3.5 w-full text-3xl rounded-none text-zinc-600">
                      sent on xxx@gmail.com
                    </div>
                  </div>
                </div>
               
                  <div className="flex gap-2 justify-center items-center w-full max-md:max-w-full">
                    <div className="flex  gap-2 items-center self-stretch my-auto min-w-[200px] max-md:max-w-full">
                    {otp.map((value, index) => {
        return (
          <input
            key={index}
            type="text"
            ref={(input) => (inputRefs.current[index] = input)}
            value={value}
            onChange={(e) => handleChange(index, e)}
            onClick={() => handleClick(index)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="flex  items-center justify-center text-6xl text-center w-full rounded-xl border border-black border-solid min-h-[73px]"
          />
         
        );
      })}
      
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex flex-col mt-1 w-36 max-w-full text-2xl font-semibold text-zinc-500"
                  >
                    <div className="w-full rounded-none">Resend OTP</div>
                  </button>
                  <div className="flex justify-center items-center">
                  <Link to="/Home"
                    type="submit"
                    className=" justify-center items-center text-center px-2.5 py-4 mt-1.5 w-3/4 text-2xl font-semibold bg-cyan-300 rounded-xl min-h-[65px] max-md:max-w-full"
                  >
                    Submit
                  </Link>
                  </div>
          
              </div>
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/074da58316a5ca172543fd6f4b69d02e77e6657129b4064d0332f730ce6cc40b?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
          alt=""
          className="object-contain self-stretch my-auto aspect-[0.94] min-w-[240px] w-[780px] max-md:max-w-full"
        />
      </div>
    </div>
  );
}

export default OtpVerification;