import React from "react";
import { connect } from "react-redux";
import Sidebar from "./sidebar";
import Screen from "./screen";
import Transactions from "./transactionsHistory";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
export const layout = (props) => {
  return (
    <Router>
      <div
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
        }}
      >
        <div style={{ width: "15%" }}>
          <Sidebar />
        </div>
        <div style={{ width: "85%" }}>
          <Routes>
            <Route exact path="/transactions" element={<Transactions />} />
            <Route exact path="/" element={<Screen />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(layout);
