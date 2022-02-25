import { lazy } from "react";

const options = [
  {
    key: Math.random(),
    path: "/",
    component: lazy(() => import("../overview/List")), 
    exact: true,
  },
  {
    key: Math.random(),
    path: "/transaction-history",
    component: lazy(() => import("../transaction-history/List")), 
    exact: true,
  },
];
export default options;