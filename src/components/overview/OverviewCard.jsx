import React from "react";

const cards = [
  {
    type: "income",
    bg: "wallet__bg-income",
    textColor: "wallet__text-income",
    detailBg: "wallet__bg-detail-income",
  },
  {
    type: "balance",
    bg: "wallet__bg-balance",
    textColor: "wallet__text-balance",
    detailBg: "wallet__bg-detail-balance",
  },
  {
    type: "expense",
    bg: "wallet__bg-expense",
    textColor: "wallet__text-expense",
    detailBg: "wallet__bg-detail-expense",
  },
];

const OverviewCard = ({ type, value }) => {
  const currentCard = cards.find((card) => card.type === type);
  console.log(currentCard);
  return (
    <div
      className={`h-28 w-72 rounded-lg bg-gradient-to-r ${currentCard.bg} py-5 px-7`}
    >
      <div className="flex items-center justify-between">
        <h4 className={`capitalize ${currentCard.textColor}`}>{type}</h4>
        <button
          className={`text-white ${currentCard.detailBg} h-5 w-16 rounded-xl text-xs hover:underline`}
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
