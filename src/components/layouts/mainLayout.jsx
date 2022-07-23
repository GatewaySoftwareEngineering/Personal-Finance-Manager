import React from "react";
import useWindowDimensions from "./ScreenSize";
import classes from "./Layout.module.css";
import NavBar from "./navBar";
import SideBar from "./sideBar";
import Drawer from "./drawer";
export default function MainLayout({ children }) {
  const { isDesktop } = useWindowDimensions();
  const listPage = [
    {
      path: "/",
      name: "Overview",
    },
    {
      path: "/transactions",
      name: "Transactions History",
    },
  ];
  return (
    <div className={"container-fluid"}>
      <div className="row">
        {/* sidebar */}
        <SideBar isDesktop={isDesktop} listPage={listPage} />
        {/* main */}
        <div className="col p-0">
          {/* navbar */}
          <NavBar listPage={listPage} isDesktop={isDesktop} />
          {/* content */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );
}
