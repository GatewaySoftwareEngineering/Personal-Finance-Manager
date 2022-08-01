import React from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";
import Transactions from "./transactions";

export const transactions = (props) => {
  return (
    <div>
      <Navbar title={"Transactions"} />
      transactions
      <section style={{ height: "90%" }}>
        <Transactions page={"history"} />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(transactions);
