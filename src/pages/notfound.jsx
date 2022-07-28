import React from "react";
import PageNotFound from "src/assets/images/pageNotFound.png";
import useWindowDimensions from "src/components/layouts/ScreenSize";
export default function Notfound() {
  const { isDesktop } = useWindowDimensions();
  return (
    <div
      className="w-100  d-flex justify-content-center align-items-center"
      style={{ height: "90vh" }}
    >
      <img
        src={PageNotFound}
        alt="page not found"
        width={isDesktop ? "40%" : "60%"}
      />
    </div>
  );
}
