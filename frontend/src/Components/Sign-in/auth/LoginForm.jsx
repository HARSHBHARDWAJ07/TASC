import * as React from "react";
import { SocialButton } from "./SocialButton";
import { InputField } from "./InputField";
import { Divider } from "./Divider";
import { Link } from "react-router-dom";

function LoginForm() {
  return (
    <div className="flex overflow-hidden flex-col justify-end px-14 bg-white max-md:pl-5">
      <div className="flex items-center w-full max-md:max-w-full">
        <div className="flex gap-2.5 items-center self-stretch my-auto min-w-[240px] w-[433px] max-md:max-w-full">
          <div className="flex flex-col items-start self-stretch my-auto min-w-[240px] w-[433px] max-md:max-w-full">
            <h1 className="text-5xl font-semibold text-black">
              Welcome back !!
            </h1>
            <div className="flex flex-col self-stretch mt-1.5 w-full max-md:max-w-full">
              <SocialButton
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/45f6bdc3be5e167bfecbad8054345b9f0fae7473c00b9613d08c1cb63de6a687?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
                text="Sign in with Google"
              />
              <Divider />
              <form className="flex flex-col mt-5 w-full max-md:max-w-full">
                <InputField type="email" placeholder="Enter email" id="email" />
                <InputField
                  type="password"
                  placeholder="Enter your password"
                  id="password"
                  icon="https://cdn.builder.io/api/v1/image/assets/TEMP/6bc84463e442cc0e6293148999d085ebd69b9df1b284afa555d1b38fcb984736?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
                />
                <div className="flex gap-8 items-center pl-2.5 mt-2 w-full max-md:max-w-full">
                  <div className="flex gap-2.5 items-center self-stretch my-auto">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only"
                        aria-label="Save login information"
                      />
                      <div className="flex gap-2.5 items-center self-stretch p-px my-auto bg-black rounded h-[21px] min-h-[21px] w-[21px]">
                        <div className="flex self-stretch my-auto bg-white rounded h-[19px] min-h-[19px] w-[19px]" />
                      </div>
                      <span className="ml-2.5 text-xl font-semibold text-black">
                        Save login info
                      </span>
                    </label>
                  </div>
                  <button
                    type="button"
                    className="self-stretch my-auto text-xl font-semibold text-blue-700"
                  >
                    Forgotten password?
                  </button>
                </div>
                <Link to ="/otpverification"
                  type="submit"
                  className="text-center gap-2.5 self-stretch px-2.5 py-4 mt-5 w-full text-2xl font-semibold whitespace-nowrap bg-cyan-300 rounded-xl min-h-[65px] text-stone-800 max-md:max-w-full"
                >
                  Login
                </Link>
              </form>
            </div>
            <div className="flex justify-center items-center mt-1 text-2xl font-semibold">
              <span className="self-stretch my-auto text-black w-[294px]">
                Don't have an account?
              </span>
              <Link to="/" className="self-stretch my-auto text-blue-700 w-[99px]">
                Sign up
              </Link>
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/28f2e746630618a9f04c9e968626a61dca21b457361d09b6117c1eafba5d0b2d?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
          alt="Login illustration"
          className="object-contain self-stretch my-auto aspect-[0.95] min-w-[240px] w-[880px] max-md:max-w-full"
        />
      </div>
    </div>
  );
}

export default LoginForm;
