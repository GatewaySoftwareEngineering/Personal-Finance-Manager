import React from "react";
import { useEffect } from "react";
import classes from "src/components/cards/Cards.module.css";
import OverViewTopCard from "src/components/cards/overViewTopCard";
import useWindowDimensions from "src/components/layouts/ScreenSize";
import LastTransactions from "src/components/overview/lastTransactions";

export default function OverView() {
  const { isDesktop } = useWindowDimensions();
  useEffect(() => {
    document.title = "Overview";
  }, []);
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
        />
        <OverViewTopCard
          background={classes.overViewCardBgTwo}
          typeColor="text-secondary"
          detailColor="rgb(145, 143, 143)"
          type="Balance"
          isDesktop={isDesktop}
        />
        <OverViewTopCard
          background={classes.overViewCardBgThree}
          typeColor="text-danger"
          detailColor="rgb(251, 113, 133)"
          type="Balance"
          isDesktop={isDesktop}
        />
      </div>
     <LastTransactions/>
    </div>
  );
}
