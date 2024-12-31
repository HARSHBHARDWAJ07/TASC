import * as React from "react";

export function InputField({ type, placeholder, id, icon }) {
  return (
    <div className="flex flex-col w-full text-2xl font-semibold text-neutral-400 max-md:max-w-full mb-4">
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      <div className="flex gap-10 items-center py-4 px-8 w-full rounded-xl border border-black border-solid min-h-[65px] max-md:px-5 max-md:max-w-full">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none"
          aria-label={placeholder}
        />
        {icon && (
          <img
            loading="lazy"
            src={icon}
            alt=""
            className="object-contain shrink-0 self-stretch my-auto w-6 aspect-square"
          />
        )}
      </div>
    </div>
  );
}
