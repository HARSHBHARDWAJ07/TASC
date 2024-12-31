import * as React from "react";
import { Link } from "react-router-dom";

const navigationLinks = [
  { id: 1, title: "News" },
  { id: 2, title: "Solve Quiz" },
  { id: 3, title: "Rankings" },
  { id: 4, title: "Community" }
];

export default function NavigationItem() {
  return (
    <div className="flex flex-row  gap-16 items-center  justify-between my-auto text-3xl font-semibold min-w-[240px] max-md:max-w-full">
    <Link to="/Home" className="gap-2.5 self-stretch p-2.5 my-auto whitespace-nowrap bg-white rounded-xl">

      News

    </Link>
    <Link to="" className="gap-2.5 self-stretch p-2.5 my-auto whitespace-nowrap bg-white rounded-xl">

      Solve Quiz

    </Link>
    <Link to="ranking" className="gap-2.5 self-stretch p-2.5 my-auto whitespace-nowrap bg-white rounded-xl">

      Ranking

    </Link>
    <Link to="community" className="gap-2.5 self-stretch p-2.5 my-auto whitespace-nowrap bg-white rounded-xl">

      Community

    </Link>
    </div>
  );
}

