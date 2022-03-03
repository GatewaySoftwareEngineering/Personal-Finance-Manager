import React from "react";
import { HiOutlineChip, HiOutlineBriefcase } from "react-icons/hi";
import { GiReceiveMoney } from "react-icons/gi";
import moment from "moment";
import millify from "millify";

const icons = [
  {
    category: "tech accessories",
    icon: <HiOutlineChip className="h-2/3 w-2/3 text-emerald-500" />,
    bgColor: "bg-emerald-600",
  },
  {
    category: "loan",
    icon: <GiReceiveMoney className="h-2/3 w-2/3 text-sky-600" />,
    bgColor: "bg-sky-600",
  },
  {
    category: "salary",
    icon: <HiOutlineBriefcase className="h-2/3 w-2/3 text-orange-600" />,
    bgColor: "bg-orange-600",
  },
];
const badges = [
  {
    type: "expense",
    classes: "bg-expense-badge bg-opacity-15 text-expense-badge",
  },
  {
    type: "income",
    classes: "bg-income-badge bg-opacity-15 text-income-badge",
  },
];
const TransactionCard = ({ note, amount, type, currency, category, date }) => {
  const currentIcon = icons.find((icon) =>
    icon.category.includes(category.toLowerCase())
  );
  const currentBadge = badges.find((badge) =>
    badge.type.match(type.toLowerCase())
  );
  const constructDate = (dateObject) => {
    const fullDate = moment(dateObject).calendar(null, {
      sameDay: "[Today]",
      nextDay: "[Tomorrow]",
      nextWeek: "dddd",
      lastDay: "[Yesterday]",
      lastWeek: "DD/MM/YYYY",
      sameElse: "DD/MM/YYYY",
    });
    return fullDate;
  };
  const changeCurrency = (currencyArg, amountArg) => {
    if (currencyArg === "IQD") return Math.round(amountArg / 1480);
    return amountArg;
  };

  return (
    <div className="flex h-14 flex-wrap items-center justify-between rounded-lg bg-slate-50 px-4">
      <div className="flex items-center">
        <div
          className={`h-8 w-8 rounded-full ${currentIcon.bgColor} mr-4 flex items-center justify-center bg-opacity-20`}
        >
          {currentIcon.icon}
        </div>
        <p className="text-base">{note}</p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <p className="text-base font-normal">{constructDate(date)}</p>
        <p
          className={`flex h-8 w-20 items-center justify-center rounded-md font-bold ${currentBadge.classes} text-lg`}
        >
          {type.toLowerCase() === "expense" ? "-" : "+"}
          {"$"}
          {millify(changeCurrency(currency, amount))}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
