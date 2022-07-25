const addSuffix = (value) => {
  var suffixes = ["", "k", "m", "b", "t"];
  var suffixNum = Math.ceil(("" + value).length / 3) - 1;
  var shortValue = parseFloat(
    (suffixNum !== 0 ? value / Math.pow(1000, suffixNum) : value).toPrecision(2)
  );
  if (shortValue % 1 !== 0) {
    shortValue = shortValue.toFixed(1);
  }
  return shortValue + suffixes[suffixNum];
};

export default addSuffix;
