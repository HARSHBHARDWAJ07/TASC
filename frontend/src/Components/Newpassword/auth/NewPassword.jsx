import * as React from "react";
import { PasswordInput } from "./PasswordInput";

export function NewPassword() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex overflow-hidden max-h-full  flex-col px-11 text-2xl font-semibold bg-white max-md:pl-5">
      <div className="flex items-center min-h-auto mx-20 max-md:max-w-full">
        <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[484px] max-md:max-w-full">
          <button><img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1584c96b9220830872cc8f06078710943603f764c77b39b6a3b0d76d1c564853?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
            className="object-contain aspect-square w-[52px]"
            alt="Company Logo"
          /></button>
          <div className="flex flex-col mt-20 w-full max-md:mt-10 max-md:max-w-full">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col justify-center items-start w-full max-md:max-w-full"
            >
              <div className="flex flex-col items-start self-stretch w-full text-5xl text-black max-md:max-w-full">
                <div className="max-w-full rounded-none w-[450px] max-md:max-w-full">
                  Enter new password
                </div>
              </div>
              <div className="flex flex-col mt-4 max-w-full text-neutral-400 w-[432px]">
                <PasswordInput label="Set new password" id="newPassword" />
                <PasswordInput
                  label="Confirm new password"
                  id="confirmPassword"
                />
              </div>
              <div className="flex flex-col mt-4 max-w-full whitespace-nowrap text-stone-800 w-[432px]">
                <button
                 onSubmit={``}
                  type="submit"
                  className="gap-2.5 self-stretch px-2.5 py-4 w-full bg-cyan-300 rounded-xl min-h-[65px]"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/363d858e0754e9fc7f75b1728fadfa1a4e889a4ea18daa8d0b12adb09609e783?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
          className="object-contain self-stretch my-auto aspect-[0.94] min-w-[240px] w-[780px] max-md:max-w-full"
          alt="Decorative illustration"
        />
      </div>
    </div>
  );
}
