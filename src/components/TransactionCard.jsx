import moment from "moment";
import React from "react";
import {
  HiAcademicCap,
  HiOutlineBriefcase,
  HiOutlineChip,
} from "react-icons/hi";
import addSuffix from "../shared/addSuffix";
// import {BiChip} from 'react-icons/bi'

const TransactionCard = ({ label, category, type, date, currency, amount }) => {
  let amountMoney = addSuffix(amount);
  let icon;

  switch (category) {
    case "SALARY":
      icon = <HiOutlineBriefcase className="icon bg_green" />;
      break;
    case "ACCESSORIES":
      icon = <HiOutlineChip className="icon bg_green " />;
      break;
    default:
      icon = <HiAcademicCap className="icon bg_blue" />;
      break;
  }

  return (
    <div className="transaction_card">
      <div className="icon_label">
        {icon}

        <p className="label">{label}</p>
      </div>

      <div className="date_amount">
        <p className="date">
          {moment(new Date(date)).calendar().split(" at")[0]}
        </p>
        <p className={`amount ${type === "INCOME" ? "income" : "expense"}`}>
          {type === "INCOME" ? "+" : "-"}
          {currency === "USD" ? "$" : "IQD"}
          {amountMoney}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
