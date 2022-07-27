import React from "react";
import { connect } from "react-redux";

export const navbar = (props) => {
  const { title } = props;
  return (
    <div
      style={{ height: "10vh", display: "flex", alignItems: "center" }}
      className="navbar"
    >
      <h4
        style={{
          marginLeft: 8,
          fontSize: "22px",
          color: "#374151",
          fontWeight: "500",
        }}
      >
        {title}
      </h4>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(navbar);
