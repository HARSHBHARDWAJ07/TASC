import * as React from "react";

export function SocialButton({ icon, text }) {
  return (
    <button
      className="flex flex-col justify-center items-center px-2.5 py-1 w-full text-2xl font-semibold text-black border border-black border-solid min-h-[65px] rounded-[50px] max-md:max-w-full"
      type="button"
    >
      <div className="flex gap-8 justify-center items-center">
        <img
          loading="lazy"
          src={icon}
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-square rounded-[50px] w-[59px]"
        />
        <span className="self-stretch my-auto">{text}</span>
      </div>
    </button>
  );
}
