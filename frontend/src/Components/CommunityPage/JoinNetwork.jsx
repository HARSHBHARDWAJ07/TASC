import * as React from "react";
import { JoinButton } from "./JoinButton";

export function JoinNetwork() {
  return (
    <div className="flex flex-col justify-center items-center px-20 py-80 text-4xl font-semibold text-center text-black bg-white max-md:px-5 max-md:py-24">
      <div className="flex flex-col justify-center max-w-full w-[753px]">
        <div className="max-md:max-w-full">
          Join the network which will enhance your
          <br />
          financial knowledge
        </div>
        <JoinButton />
      </div>
    </div>
  );
}
