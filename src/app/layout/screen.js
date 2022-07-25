import React from "react";
import { connect } from "react-redux";

export const screen = (props) => {
  return <div style={{ height: "90%" }}>screen</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(screen);
