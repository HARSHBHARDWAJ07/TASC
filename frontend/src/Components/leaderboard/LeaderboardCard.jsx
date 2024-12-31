import * as React from "react";

export function LeaderboardCard({ rank, username, points }) {
  return (
    <div className="flex overflow-hidden flex-col justify-center px-9 py-6 w-full bg-white rounded-xl border border-cyan-300 border-solid max-md:px-5 max-md:max-w-full">
      <div className="flex flex-wrap gap-10 justify-between items-center w-full max-md:max-w-full">
        <div className="flex gap-5 items-center self-stretch my-auto whitespace-nowrap min-w-[240px]">
          <div className="self-stretch my-auto">{rank}</div>
          <div className="self-stretch my-auto">{username}</div>
        </div>
        <div className="self-stretch my-auto">Points: {points}</div>
      </div>
    </div>
  );
}
