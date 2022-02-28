import React from "react";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { NavLink } from "react-router-dom";
const SideBar = () => {
  return (
    <div className="h-full w-full bg-gradient-to-b from-sidebar-dark to-sidebar-dark-alt py-6">
      <h2 className="flex items-center justify-center gap-4 text-center text-2xl font-semibold capitalize text-sidebar-red">
        <AiOutlineDollarCircle className="text-3xl" />
        Finance Manager
      </h2>
      <div className="mt-24 flex flex-col gap-4 px-6 font-light text-white">
        <NavLink
          to={{
            pathname: "/",
            state: "overview",
          }}
          className={({ isActive }) =>
            isActive ? "font-medium capitalize" : "capitalize text-zinc-300"
          }
        >
          overview
        </NavLink>
        <NavLink
          to={{
            pathname: "/transaction-history",
            state: "transaction history",
          }}
          className={({ isActive }) =>
            isActive ? "font-medium capitalize" : "capitalize text-zinc-300"
          }
        >
          transaction history
        </NavLink>
      </div>
    </div>
  );
};

export default SideBar;
