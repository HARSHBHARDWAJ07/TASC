import * as React from "react";
import { LeaderboardCard } from "./LeaderboardCard";
import { SectionHeader } from "./SectionHeader";
import { leaderboardData } from "./LeaderboardData";

export function LeaderboardView() {
  return (
    <div className="flex overflow-hidden flex-col justify-end px-16 pt-4 text-3xl font-semibold text-black bg-white max-md:px-5 max-md:pt-24">
      <div className="flex flex-col justify-center w-full max-md:max-w-full">
        <SectionHeader title="Your Rank" />
        <LeaderboardCard rank="69" username="jhonny_sins" points={29130} />
      </div>

      <div className="flex flex-col mt-4 max-md:max-w-full">
        <div className="flex flex-col justify-center w-full max-md:max-w-full">
          <SectionHeader title="Leaderboard" />
          <div className="flex flex-col justify-center mt-2 w-full max-md:max-w-full">
            {leaderboardData.map((item, index) => (
              <div key={index} className={index > 0 ? "mt-5" : ""}>
                <LeaderboardCard
                  rank={item.rank}
                  username={item.username}
                  points={item.points}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
