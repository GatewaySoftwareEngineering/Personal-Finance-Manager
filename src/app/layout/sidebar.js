import React from "react";
import { connect } from "react-redux";
import MoneyIcon from "../images/Icon.png";
export const sidebar = (props) => {
  return (
    <div className="sidebar">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={MoneyIcon} alt="Money Icon" width="30" height="30" />
        <h4 style={{ marginLeft: 5, color: "#F05454", fontSize: "22px" }}>
          Finance Manager
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(sidebar);
