import React from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineCurrencyDollar } from "react-icons/hi";

const Sidenav = () => {
  return (
    <nav className="sidenav">
      <h3 className="app_logo">
        <HiOutlineCurrencyDollar className="dollar_icon" /> Financial Manager
      </h3>

      <ul>
        <li>
          <NavLink
            to="/"
            style={({ isActive }) =>
              isActive ? { color: "#ffffff" } : undefined
            }
          >
            Overview
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transaction-history"
            style={({ isActive }) =>
              isActive ? { color: "#ffffff" } : undefined
            }
          >
            Transaction History
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidenav;
