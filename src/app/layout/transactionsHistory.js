import React from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";

export const transactions = (props) => {
  return (
    <div>
      <Navbar title={"Transactions"} />
      transactions
      <section style={{ height: "90%" }}></section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(transactions);
