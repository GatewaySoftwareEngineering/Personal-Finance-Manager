const customCategory = {
  container: (provided) => {
    return {
      ...provided,
      fontSize: "16px",
    };
  },
  indicatorSeparator: (provided) => {
    return {
      ...provided,
      display: "none",
    };
  },

  valueContainer: (provided) => {
    return {
      ...provided,
      maxHeight: "48px",
      overflow: "auto",
    };
  },
};

export { customCategory };
