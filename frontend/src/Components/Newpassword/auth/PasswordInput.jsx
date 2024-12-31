import * as React from "react";

export const PasswordInput = ({ label, id }) => {
  return (
    <div className="flex flex-col pb-5 w-full rounded-none max-w-[432px] max-md:max-w-full">
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        type="password"
        id={id}
        className="gap-2.5 self-stretch px-8 py-4 rounded-xl border border-black border-solid min-h-[65px] max-md:px-5"
        placeholder={label}
        aria-label={label}
      />
    </div>
  );
};
