import React from "react";
import { HiOutlineChip, HiOutlineBriefcase } from "react-icons/hi";
import { GiReceiveMoney, GiPoloShirt } from "react-icons/gi";
import { AiOutlineGift } from "react-icons/ai";
import { MdFastfood, MdOutlineSportsHandball } from "react-icons/md";
import { BiHealth } from "react-icons/bi";
import { FaMoneyBillAlt } from "react-icons/fa";
import moment from "moment";
import millify from "millify";

const icons = [
  {
    category: "tech",
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
  {
    category: "gift",
    icon: <AiOutlineGift className="h-2/3 w-2/3 text-fuchsia-600" />,
    bgColor: "bg-fuchsia-600",
  },
  {
    category: "food",
    icon: <MdFastfood className="h-2/3 w-2/3 text-yellow-600" />,
    bgColor: "bg-yellow-600",
  },
  {
    category: "health",
    icon: <BiHealth className="h-2/3 w-2/3 text-red-600" />,
    bgColor: "bg-red-600",
  },
  {
    category: "sports",
    icon: <MdOutlineSportsHandball className="h-2/3 w-2/3 text-stone-600" />,
    bgColor: "bg-stone-600",
  },
  {
    category: "bills",
    icon: <FaMoneyBillAlt className="h-2/3 w-2/3 text-slate-600" />,
    bgColor: "bg-slate-600",
  },
  {
    category: "cloths",
    icon: <GiPoloShirt className="h-2/3 w-2/3 text-violet-600" />,
    bgColor: "bg-violet-600",
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

// functions
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

const TransactionCard = ({ note, amount, type, currency, category, date }) => {
  const currentIcon = icons.find((icon) =>
    icon.category.includes(category.toLowerCase())
  );
  const currentBadge = badges.find((badge) =>
    badge.type.match(type.toLowerCase())
  );

  return (
    <div className="flex flex-wrap items-center justify-between rounded-lg bg-slate-50 py-3 px-4">
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
          className={`flex h-8 w-24 items-center justify-center rounded-md font-bold ${currentBadge.classes} text-lg`}
        >
          {type.toLowerCase() === "expense" ? "-" : "+"}
          {"$"}
          {millify(changeCurrency(currency, amount), { precision: 2 })}
        </p>
      </div>
    </div>
  );
};

export default TransactionCard;
