import React from "react";
import { NavLink } from "react-router-dom";

import { ReactComponent as DollarLogo } from "src/assets/images/dollarSign.svg";
export default function NavigationContent(props) {
  const { listPage } = props;
  return (
    <>
      <div className="mt-4 text-center">
        <DollarLogo className="d-d-inline" />
        <h4 className="d-inline ps-2" style={{ color: "#F05454" }}>
          Finance Manager
        </h4>
      </div>
      <div className="text-white mt-5 fs-4">
        {listPage?.length > 0 ? (
          listPage.map((ePage) => {
            return (
              <NavLink
                onClick={props?.onChangeNav}
                to={ePage?.path}
                className="nav-item nav-link"
                style={({ isActive }) => {
                  return {
                    color: isActive ? "white" : "var(--deactiveText)",
                  };
                }}
                key={ePage.path}
              >
                {ePage.name}
              </NavLink>
            );
          })
        ) : (
          <span></span>
        )}
      </div>
    </>
  );
}
