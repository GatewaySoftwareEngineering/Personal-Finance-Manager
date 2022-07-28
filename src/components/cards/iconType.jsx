import React from "react";
import { typeExpence, typeIncome } from "src/configs/constants";
import { ReactComponent as Bills } from "src/assets/images/bills-money.svg";
import { ReactComponent as Food } from "src/assets/images/fast-food.svg";
import { ReactComponent as Gifts } from "src/assets/images/gift.svg";
import { ReactComponent as Loan } from "src/assets/images/loan.svg";
import { ReactComponent as Salary } from "src/assets/images/salary.svg";
import { ReactComponent as Sport } from "src/assets/images/sports.svg";
import { ReactComponent as Tech } from "src/assets/images/tech.svg";
import { ReactComponent as Health } from "src/assets/images/health.svg";
import { ReactComponent as Clothes } from "src/assets/images/clothes.svg";

export default function IconType({ type }) {
  const styleIcon = {
    width: "35px",
    height: "35px",
    padding: "4px",
    backgroundColor: "#2c3e5126",
    borderRadius: "40px",
    borderWidth: "1px",
  };
  switch (type) {
    case typeIncome.GIFT:
      return <Gifts style={styleIcon} />;
    case typeIncome.LOAN:
      return <Loan style={styleIcon} />;
    case typeIncome.SALARY:
      return <Salary style={styleIcon} />;
    case typeExpence.BILLS:
      return <Bills style={styleIcon} />;
    case typeExpence.FOOD:
      return <Food style={styleIcon} />;
    case typeExpence.HEALTH:
      return <Health style={styleIcon} />;
    case typeExpence.SPORTS:
      return <Sport style={styleIcon} />;
    case typeExpence.TECH:
      return <Tech style={styleIcon} />;
    case typeExpence.CLOTHS:
      return <Clothes style={styleIcon} />;
    default:
      return <div>I</div>;
  }
}
