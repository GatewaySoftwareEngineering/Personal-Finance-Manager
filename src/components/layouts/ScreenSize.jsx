import { useState, useEffect } from "react";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  let isDesktop = width > 960 ? true : false;
  let tailSize = "";
  if (width > 1538) {
    tailSize = "2xl";
  } else if (width > 1280) {
    tailSize = "xl";
  } else if (width > 1024) {
    tailSize = "lg";
  } else if (width > 768) {
    tailSize = "md";
  } else if (width > 640) {
    tailSize = "sm";
  } else {
    tailSize = "";
  }
  return {
    width,
    height,
    tailSize,
    isDesktop,
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
