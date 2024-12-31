import * as React from "react";

function SocialButton({ icon, text }) {
  return (
    <div className="flex flex-col items-center self-stretch w-full text-black max-md:max-w-full">
      <button 
        type="button"
        className="flex flex-col justify-center items-center px-2.5 py-1 w-full border border-black border-solid min-h-[65px] rounded-[50px] max-md:max-w-full">
        <div className="flex flex-col max-w-full w-[332px]">
          <div className="flex gap-8 justify-center items-center">
            <div className="flex gap-8 self-stretch my-auto min-w-[240px] rounded-[50px] w-[332px]">
              <img
                loading="lazy"
                src={icon}
                alt=""
                className="object-contain shrink-0 aspect-square rounded-[50px] w-[59px]"
              />
              <span className="grow shrink my-auto w-[230px]">{text}</span>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default SocialButton;