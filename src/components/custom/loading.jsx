import React from "react";

export default function Loading() {
  return (
    <div
      className="w-100  d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only"></span>
      </div>
    </div>
  );
}
