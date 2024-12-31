import * as React from "react";

export function NewsCard({ image, title, description, showReadMore = true }) {
  return (
    <div className="flex overflow-hidden flex-col justify-between mx-6 px-6 py-4  bg-white rounded-xl border border-solid border-black border-opacity-30 w-fit-content max-md:px-5 max-md:max-w-full">
      <div className="flex  gap-7 justify-center items-center w-full max-md:max-w-full">
        <img
          loading="lazy"
          src={image}
          alt={title}
          className="object-contain self-stretch my-auto rounded-xl aspect-[1.5] min-w-[240px] w-2/5"
        />
        <div className="flex flex-col self-stretch my-auto min-w-[240px] w-[492px] max-md:max-w-full">
          <div className="text-2xl font-semibold text-black max-md:max-w-full">
            {title}
          </div>
          <div className="flex flex-col mt-1 max-w-full text-xl w-[492px]">
            <div className="text-black max-md:max-w-full">{description}</div>
            {showReadMore && (
              <div className="self-end mr-6 text-blue-700 max-md:mr-2.5">
                Read more
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
