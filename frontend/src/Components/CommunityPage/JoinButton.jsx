import * as React from "react";

export function JoinButton() {
  return (
    <button
      className="flex gap-0.5 justify-center items-center self-center px-10 py-2.5 mt-9 max-w-full bg-cyan-300 rounded-[50px] w-[340px] max-md:px-5"
      onClick={() => (window.location.href = "/join")}
      aria-label="Join Server"
    >
      <span className="self-stretch my-auto">Join Server</span>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d6dc764bf904240d313cbbb3ff03e7e6b2ea69c2f1796db97053938a533e28b?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1"
        alt=""
        className="object-contain shrink-0 self-stretch my-auto aspect-square w-[52px]"
      />
    </button>
  );
}
