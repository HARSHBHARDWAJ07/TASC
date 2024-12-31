import * as React from "react";
function InputField({ placeholder, type, id, showIcon }) {
  return (
    <div className="flex flex-col w-full text-neutral-400">
      <div className="flex gap-10 items-center py-4 pr-7 pl-8 mt-4 w-full rounded-xl border border-black border-solid min-h-[65px] max-md:px-5">
        <label htmlFor={id} className="sr-only">{placeholder}</label>
        <input 
          type={type}
          id={id}
          placeholder={placeholder}
          className="self-stretch  my-auto w-full bg-transparent text-black outline-none"
          aria-label={placeholder}
        />
        {showIcon && (
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/ffedcd73e2e2e6c6b98f1a5ace68052e33632ea8b28dfedc5cccc7a8fa36555f?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
            alt=""
            className="object-contain flex-shrink-0 self-stretch my-auto w-auto aspect-square"
          />
        )}
      </div>
    </div>
  );
}

export default InputField;