import * as React from "react";

function DividerLine() {
  return (
    <div className="flex gap-2 items-center mt-6 whitespace-nowrap text-neutral-400">
      <div className="flex gap-2 items-center self-stretch my-auto min-w-[240px]">
        <div className="shrink-0 self-stretch my-auto h-1 border-4 border-dashed border-neutral-400 w-[179px]" />
        <div className="self-stretch my-auto">Or</div>
        <div className="shrink-0 self-stretch my-auto h-1 border-4 border-dashed border-neutral-400 w-[179px]" />
      </div>
    </div>
  );
}

export default DividerLine;