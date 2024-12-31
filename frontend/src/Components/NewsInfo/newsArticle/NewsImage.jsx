import * as React from "react";

export function NewsImage({ imageUrl }) {
  return (
    <img
      loading="lazy"
      src={imageUrl}
      alt="News article related stock market visualization"
      className="object-contain mt-2.5 w-full aspect-[2.56] max-md:max-w-full"
    />
  );
}
