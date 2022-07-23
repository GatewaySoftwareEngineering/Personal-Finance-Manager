import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import NavigationContent from "./navigationContent";
import { ReactComponent as CloseBtn } from "src/assets/images/close-svgrepo-com.svg";

import classes from "./Layout.module.css";
function Drawer(props) {
  const { listPage } = props;
  const { showDrawer, setShowDrawer } = props;

  const handleClose = () => setShowDrawer(false);

  return (
    <>
      <Offcanvas
        show={showDrawer}
        onHide={handleClose}
        style={{ backgroundColor: "var(--sidebarColor)" }}
        className={"ps-3"}
      >
        <NavigationContent listPage={listPage} onChangeNav={handleClose} />

        <CloseBtn
          className={`bg-white rounded mt-2 ` + classes.closeBtn}
          onClick={handleClose}
        />
      </Offcanvas>
    </>
  );
}

export default Drawer;
