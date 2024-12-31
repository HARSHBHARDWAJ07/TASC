import React from "react";
import { GoogleSignInButton } from "./components/GoogleSignInButton";
import { DividerLine } from "./components/DividerLine";
import { LoginForm } from "./components/LoginForm";
import { LoginOptions } from "./components/LoginOptions";
import { LoginActions } from "./components/LoginActions";

export function LoginPage() {
  return (
    <div className="flex overflow-hidden flex-col justify-end px-8 bg-white max-md:pl-5">
      <div className="flex items-center w-full h-[864px] max-md:max-w-full">
        <div className="flex gap-2.5 items-center self-stretch my-auto min-w-[240px] w-[432px] max-md:max-w-full">
          <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[432px]">
            <h1 className="self-start text-5xl font-semibold text-black">
              Welcome back !!
            </h1>
            <div className="flex flex-col mt-1.5 max-md:max-w-full">
              <div className="flex flex-col w-full text-2xl font-semibold text-black max-md:max-w-full">
                <GoogleSignInButton />
              </div>
              <DividerLine />
              <LoginForm />
              <LoginOptions />
              <LoginActions />
            </div>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/63ce6584985a966e81972e1678d46df8137a79ec856ea6c444e9982e461da094?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
          alt="Login page illustration"
          className="object-contain self-stretch my-auto aspect-[0.98] min-w-[240px] w-[880px] max-md:max-w-full"
        />
      </div>
    </div>
  );
}
