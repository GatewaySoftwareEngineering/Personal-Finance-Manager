import React from "react";

export default function InvalidField({ isRequaired, text }) {
  return isRequaired === "required" ? (
    <span className="text-danger">{text ?? "this field is requarid!"} </span>
  ) : (
    <></>
  );
}
