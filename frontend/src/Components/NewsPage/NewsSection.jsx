import * as React from "react";
import { NewsCard } from "./NewsCard";
import { PicksCard } from "./PicksCard";

const newsData = [
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7a4c57ddc2d3cbb264d742ef4821144f0ba783e7b5ee21b7caaf66866a5d3ec4?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title:
      "HDFC Bank to Senco Gold— Religare Broking suggests THESE six stocks to 'accumulate' for long-term",
    description:
      "Stock Market News Today Live Updates: In an ever-evolving financial world, staying informed about stock market trends is crucial. Our Stock Market News provides real-time........",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/7a4c57ddc2d3cbb264d742ef4821144f0ba783e7b5ee21b7caaf66866a5d3ec4?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title:
      "HDFC Bank to Senco Gold— Religare Broking suggests THESE six stocks to 'accumulate' for long-term",
    description:
      "Stock Market News Today Live Updates: In an ever-evolving financial world, staying informed about stock market trends is crucial. Our Stock Market News provides real-time........",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/36497d53cc60194528a06cc7feb0d3a1d4f7a06d0482dd5302abb3dd40585ed7?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title:
      "HDFC Bank to Senco Gold— Religare Broking suggests THESE six stocks to 'accumulate' for long-term",
    description:
      "Stock Market News Today Live Updates: In an ever-evolving financial world, staying informed about stock market trends is crucial. Our Stock Market News provides real-time........",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title:
      "HDFC Bank to Senco Gold— Religare Broking suggests THESE six stocks to 'accumulate' for long-term",
    description: "",
  },
  {
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ca046a62429c37a5d23bb1958ac42ad182f0ee37fd489e5948612e413e1fc012?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title:
      "HDFC Bank to Senco Gold— Religare Broking suggests THESE six stocks to 'accumulate' for long-term",
    description: "",
  },
];

const picksData = [
  {
    preTitle: "Stock market holidays 2025: ",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/88c88fc73fefb84d36254f5e39785f86e750d808b5237c6bb9d224d7923a9eb8?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title: "NSE, BSE to remain closed on THESE days next year",
  },
  {
    preTitle: "Stock market holidays 2025: ",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/88c88fc73fefb84d36254f5e39785f86e750d808b5237c6bb9d224d7923a9eb8?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title: "NSE, BSE to remain closed on THESE days next year",
  },
  {
    preTitle: "Stock market holidays 2025: ",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/88c88fc73fefb84d36254f5e39785f86e750d808b5237c6bb9d224d7923a9eb8?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    title: "NSE, BSE to remain closed on THESE days next year",
  },
];

export function NewsSection() {
  return (
    <div className="flex justify-between w-full items-start pt-6">
      <div className="flex  gap-6 items-start min-w-[240px] w-full max-md:max-w-full">
        <div className="flex flex-col min-w-[240px] px-20px w-3/4 max-md:max-w-full">
          {newsData.map((news, index) => (
            <div key={index} className={index > 0 ? "mt-4" : ""}>
              <NewsCard
                image={news.image}
                title={news.title}
                description={news.description}
                showReadMore={!!news.description}
              />
            </div>
          ))}
        </div>
        <div className="flex flex-col text-xl text-black min-h-[840px]  w-1/4">
            <div className="text-3xl font-semibold text-cyan-300">
              Picks for you
            </div>
            {picksData.map((pick, index) => (
              <div key={index} className="flex flex-col mt-2 w-full">
                <PicksCard
                  preTitle={pick.preTitle}
                  image={pick.image}
                  title={pick.title}
                />
              </div>
            ))}
          
        </div>
      </div>
    </div>
  );
}
