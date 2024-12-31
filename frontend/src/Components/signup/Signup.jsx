import * as React from "react";
import InputField from "./InputField";
import SocialButton from "./Socialbutton";
import DividerLine from "./DividerLine";
import { Link } from "react-router-dom";

const formFields = [
  { placeholder: "Set your username", type: "text", id: "username" },
  { placeholder: "Enter email", type: "email", id: "email" },
  { placeholder: "Set your password", type: "password", id: "password", showIcon: true }
];

function SignUpForm() {
  return (
    <div className="max-w-full max-h-full flex overflow-hidden flex-col px-9 text-2xl font-semibold bg-white max-md:pl-5">
      <div className="flex items-center w-full h-[851px] max-md:max-w-full">
        <div className="mx-20 flex gap-2.5 items-center self-stretch my-auto min-w-[240px] w-[432px] max-md:max-w-full">
          <form className="flex flex-col items-start self-stretch my-auto min-w-[240px] w-[432px] max-md:max-w-full">
            <h1 className="text-5xl text-black">Get Started</h1>
            <div className="flex flex-col items-center self-stretch mt-1.5 w-full max-md:max-w-full">
              <SocialButton
                icon="https://cdn.builder.io/api/v1/image/assets/TEMP/3e4c77c37e4bcc296974ef85dfcdbd5f39e631527c8c912875423953dbb8e35b?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
                text="Sign up with Google"
              />
              <DividerLine />
              <div className="flex flex-col mt-6 w-full max-w-[432px] max-md:max-w-full">
                {formFields.map((field) => (
                  <InputField key={field.id} {...field} />
                ))}
                <Link to="/otpverification" 
                  type="submit"
                  className="text-center gap-2.5 self-stretch px-2.5 py-4 mt-6 w-full bg-cyan-300 rounded-xl min-h-[65px] text-stone-800">
                  Create account
                </Link>
              </div>
            </div>
            <div className="flex justify-center items-center mt-1">
              <div className="flex justify-between items-center self-stretch my-auto min-w-[240px] w-[312px]">
                <span className="self-stretch my-auto text-black w-[230px]">
                  Have an account?{" "}
                </span>
                <Link to="/signin" className="self-stretch my-auto text-blue-700 w-[82px]">
                  Sign in
                </Link>
              </div>
            </div>
          </form>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/946e17343a080bc209e9b6a864383cd0fe8baa72386ade5f8c636dcda4c62bc6?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
          alt="Sign up illustration"
          className="object-contain self-stretch my-auto aspect-[0.97] min-w-[240px] w-[880px] max-md:max-w-full"
        />
      </div>
    </div>
  );
}

export default SignUpForm;