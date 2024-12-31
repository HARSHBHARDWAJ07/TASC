import * as React from "react";
import { NewsHeadline } from "./NewsHeadline";
import { NewsImage } from "./NewsImage";
import { NewsContent } from "./NewsContent";
import { PicksCard } from "../../NewsPage/PicksCard";

function NewsArticle() {
  const articleData = {
    headline:
      "HDFC Bank to Senco Gold— Religare Broking suggests THESE six stocks to 'accumulate' for long-term",
    imageUrl:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/ee524c64f7a0a62082c7e6cfc3eaf1c445cfe606bed058d74216d8ddd7dd1d41?placeholderIfAbsent=true&apiKey=5fd980f3be9141b1b823767a6d39fbe1",
    content:
      "Stock Market News Today Live Updates: In an ever-evolving financial world, staying informed about stock market trends is crucial. Our Stock Market News provides real-time updates, insightful analysis, and in-depth coverage of the global financial landscape. From major index movements and corporate earnings to economic indicators and geopolitical events, we deliver the latest information impacting your investments and the broader economy. Our goal is to empower you with a clear understanding of market dynamics, investor sentiment, and potential opportunities, keeping you connected to the essential developments shaping the world of finance. Stay ahead with timely updates and expert perspectives on stock market trends.",
  };

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

  return (
    <div className="flex  gap-6 items-start min-w-[240px] w-full max-md:max-w-full">
    <div className="flex flex-col px-8 pt-8 text-3xl text-black w-3/4 max-w-3/4">
      <NewsHeadline headline={articleData.headline} />
      <NewsImage imageUrl={articleData.imageUrl} />
      <NewsContent content={articleData.content} />
    </div>
    <div>
     <div className="flex flex-col text-xl text-black min-h-[840px]  ">
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

export default NewsArticle;
