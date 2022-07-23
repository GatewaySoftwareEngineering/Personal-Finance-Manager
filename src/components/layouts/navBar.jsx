import React, { lazy, useState } from "react";
import classes from "./Layout.module.css";
import { useLocation } from "react-router-dom";
import _ from "lodash";
import { Sling as Hamburger } from "hamburger-react";
const Drawer = lazy(() => import("./drawer.jsx"));

export default function NavBar(props) {
  const [showDrawer, setShowDrawer] = useState(false);

  const { listPage, isDesktop } = props;
  let location = useLocation();
  const namePage = _.find(listPage, function (ePage) {
    if (ePage.path == location.pathname) {
      return ePage;
    }
  });

  //TODO
  return (
    <nav className={["navbar shadow ", classes.navBox].join(" ")}>
      <div className="container-fluid">
        <span className="navbar-brand">{namePage?.name}</span>
        <span className={`float-end ` + `${isDesktop ? "d-none" : ""}`}>
          <Hamburger
            toggled={showDrawer}
            onToggle={() => {
              setShowDrawer(true);
            }}
          />
        </span>
      </div>
      {showDrawer ? (
        <Drawer
          listPage={listPage}
          showDrawer={showDrawer}
          setShowDrawer={setShowDrawer}
        />
      ) : (
        <></>
      )}
    </nav>
  );
}
