import React from "react";
import classes from "./Layout.module.css";
import NavigationContent from "./navigationContent";

export default function SideBar(props) {
  const { isDesktop, listPage } = props;
  return (
    <div
      className={[
        `col col-auto position-sticky top-0 ${!isDesktop ? "d-none" : ""}`,
        classes.sidebar,
      ].join(" ")}
    >
      <NavigationContent listPage={listPage} />
    </div>
  );
}
