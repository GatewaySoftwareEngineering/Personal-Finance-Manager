import React from "react";
import { connect } from "react-redux";

export const navbar = (props) => {
  return (
    <div
      style={{ height: "8%", display: "flex", alignItems: "center" }}
      className="navbar"
    >
      <h4 style={{ marginLeft: 8, fontSize: "22px" }}>Screen Selected Name</h4>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
