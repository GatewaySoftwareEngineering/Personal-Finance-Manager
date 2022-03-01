import React from "react";

const OverviewCard = ({ type, value, bg, textColor, detailBg }) => {
  return (
    <div className={`h-28 w-72 rounded-lg bg-gradient-to-r ${bg} py-5 px-7`}>
      <div className="flex items-center justify-between">
        <h4 className={`capitalize ${textColor}`}>{type}</h4>
        <button
          className={`text-white ${detailBg} h-5 w-16 rounded-xl bg-opacity-75 text-xs hover:underline`}
        >
          details
        </button>
      </div>
      <p className="mt-3 text-3xl text-white">
        {"$"}
        {value}
      </p>
    </div>
  );
};

export default OverviewCard;
