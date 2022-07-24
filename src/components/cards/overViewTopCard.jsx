import React from "react";
import classes from "./Cards.module.css";
export default function OverViewTopCard({
  type = "income",
  typeColor = "text-primary",
  detailColor = "rgb(120, 220, 255)",
  price = "0.0",
  background = classes.overViewCardBgOne,
  isDesktop
}) {
  return (
    <div
      className={[
        "pt-4 pb-4 rounded mx-2 flex-fill",
        background ?? "",
        classes.overViewCard,
        isDesktop?"":'mt-2'
      ].join(" ")}
    >
      <div className={['d-flex align-items-center justify-content-between  mb-3',classes.cardDetail].join(' ')}>
        <div className="">
          <span className={`p-0 fs-4 ` + typeColor} >
            {type}
          </span>
        </div>
        <div className="">
          <span
            className="col badge  px-4  rounded-pill fs-6 "
            style={{ backgroundColor: detailColor }}
          >
            details
          </span>
        </div>
      </div>
      <div className="text-white fs-2 fw-bold">
        <span>$</span>
        <span>{price ?? ""}</span>
      </div>
    </div>
  );
}
