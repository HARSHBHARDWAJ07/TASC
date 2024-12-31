import * as React from "react";

export function Divider() {
  return (
    <div className="flex gap-2 items-center self-center mt-5 text-2xl font-semibold whitespace-nowrap text-neutral-400">
      <div className="shrink-0 self-stretch my-auto h-1 border-4 border-dashed border-neutral-400 w-[179px]" />
      <div className="self-stretch my-auto">Or</div>
      <div className="shrink-0 self-stretch my-auto h-1 border-4 border-dashed border-neutral-400 w-[179px]" />
    </div>
  );
}
