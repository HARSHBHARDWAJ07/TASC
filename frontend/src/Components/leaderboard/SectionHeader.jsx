import * as React from "react";

export function SectionHeader({ title }) {
  return (
    <div className="flex gap-4 justify-center items-center self-start">
      <div className="self-stretch my-auto">{title}</div>
      <div className="flex shrink-0 self-stretch my-auto bg-cyan-300 rounded-full h-[19px] w-[19px]" />
    </div>
  );
}
