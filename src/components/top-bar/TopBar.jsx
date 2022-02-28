import React from "react";
import { useLocation } from "react-router-dom";
const topBarTitles = [
  {
    path: "/",
    title: "Overview",
  },
  {
    path: "/transaction-history",
    title: "transaction history",
  },
];
const TopBar = () => {
  const { pathname } = useLocation();
  const currentTitle = topBarTitles.find(
    (element) => element.path === pathname
  );
  return (
    <div className="flex h-20 w-full items-center bg-top-bar-light px-6 capitalize shadow-top-bar">
      {currentTitle.title}
    </div>
  );
};

export default TopBar;
