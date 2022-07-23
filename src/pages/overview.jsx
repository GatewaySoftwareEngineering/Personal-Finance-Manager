import React from "react";
import { useEffect } from "react";
import classes from "src/components/cards/Cards.module.css";
import OverViewTopCard from "src/components/cards/overViewTopCard";

export default function OverView() {
  useEffect(() => {
    document.title = "Overview";
  }, []);
  return (
    <div className="container mt-4">
      <div className="row">
        <OverViewTopCard background={classes.overViewCardBgOne}>
          Part 1
        </OverViewTopCard>
        <div className="col col-4">part 1</div>
        <div className="col col-4">part 1</div>
      </div>
    </div>
  );
}
