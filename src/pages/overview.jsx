import _ from "lodash";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "src/components/cards/Cards.module.css";
import OverViewTopCard from "src/components/cards/overViewTopCard";
import useWindowDimensions from "src/components/layouts/ScreenSize";
import LastTransactions from "src/components/overview/lastTransactions";

export default function OverView() {
  const { isDesktop } = useWindowDimensions();
  const { transactions } = useSelector((state) => state.transactions);

  useEffect(() => {
    document.title = "Overview";
  }, []);
  const sumIncome = _.sumBy(transactions, (eTrans) => {
    if (eTrans.type.toLowerCase() === "income") {
      return eTrans.amount;
    }
  });
  const sumExpence = _.sumBy(transactions, (eTrans) => {
    if (eTrans.type.toLowerCase() === "expense") {
      return eTrans.amount;
    }
  });

  return (
    <div className={`container px-2 mt-4`}>
      <div
        className={
          "d-flex justify-content-around  align-items-stretch " +
          `${isDesktop ? "flex-row" : "flex-column"}`
        }
      >
        <OverViewTopCard
          background={classes.overViewCardBgOne}
          typeColor="text-prinary"
          detailColor="rgb(120, 220, 255)"
          type="Income"
          isDesktop={isDesktop}
          price={sumIncome ?? 0}
        />
        <OverViewTopCard
          background={classes.overViewCardBgTwo}
          typeColor="text-secondary"
          detailColor="rgb(145, 143, 143)"
          type="Balance"
          isDesktop={isDesktop}
          price={sumIncome && sumExpence ? sumIncome - sumExpence : 0}
        />
        <OverViewTopCard
          background={classes.overViewCardBgThree}
          typeColor="text-danger"
          detailColor="rgb(251, 113, 133)"
          type="Expense"
          isDesktop={isDesktop}
          price={sumExpence ?? 0}
        />
      </div>
      <LastTransactions />
    </div>
  );
}
