import React from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";

export const screen = (props) => {
  return (
    <div>
      <Navbar title={"Overview"} />
      <div style={{ height: "90vh", backgroundColor: "#EEEEEE" }}>
        <section
          style={{
            paddingTop: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <div className="card blue-card">
            <div className="card-body">
              <h5>Income</h5>
              <button className="details-button blue-button">details</button>
            </div>
            <h2>$1000</h2>
          </div>
          <div className="card gray-card">
            <div className="card-body">
              <h5>Balance</h5>
              <button className="details-button gray-button">details</button>
            </div>
            <h2>$25000</h2>
          </div>
          <div className="card red-card">
            <div className="card-body">
              <h5>Income</h5>
              <button className="details-button red-button">details</button>
            </div>
            <h2>$4250</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(screen);
