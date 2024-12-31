import * as React from "react";

export function PicksCard({ preTitle, image, title }) {
  return (
    <div className="flex overflow-hidden flex-col justify-center items-center px-4 py-6 w-full bg-white rounded-xl border border-solid border-black border-opacity-30 max-w-[271px]">
      <div className="flex flex-wrap gap-1 items-start w-full">
        <div className="grow shrink w-[89px]">{preTitle}</div>
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="object-contain shrink-0 rounded-xl aspect-[0.93] w-[111px]"
        />
        <div className="grow shrink w-[209px]">{title}</div>
      </div>
    </div>
  );
}
