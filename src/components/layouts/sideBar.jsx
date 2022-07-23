import React from "react";
import classes from "./Layout.module.css";
import NavigationContent from "./navigationContent";

export default function SideBar(props) {
  const { isDesktop, listPage } = props;
  return (
    <div
      className={[
        `col col-auto  ${!isDesktop ? "d-none" : ""}`,
        classes.sidebar,
      ].join(" ")}
    >
      <NavigationContent listPage={listPage} />
    </div>
  );
}
