import React from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import Screen from "./screen";
export const layout = (props) => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <div style={{ width: "20%" }}>
        <Sidebar />
      </div>
      <div style={{ width: "80%" }}>
        <Navbar />
        <Screen />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(layout);
