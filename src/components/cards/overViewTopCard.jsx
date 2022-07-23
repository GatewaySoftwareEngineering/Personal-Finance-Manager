import React from "react";
import classes from "./Cards.module.css";
export default function OverViewTopCard({ children, background }) {
  return (
    <div
      className={[
        "col col-3 pt-4 pb-4",
        background ?? "",
        classes.overViewCard,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
