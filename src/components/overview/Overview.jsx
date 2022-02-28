import React from "react";
import OverviewCard from "./OverviewCard";
const cards = [
  {
    title: "income",
    value: 1000,
    bg: "from-sky-300 via-sky-200 to-sky-100",
    textColor: "text-sky-600",
    detailBg: "bg-sky-400",
  },
  {
    title: "balance",
    value: 4500,
    bg: "from-zinc-300 via-zinc-200 to-zinc-100",
    textColor: "text-zinc-600",
    detailBg: "bg-zinc-400",
  },
  {
    title: "expense",
    value: 1500,
    bg: "from-rose-300 via-rose-200 to-rose-100",
    textColor: "text-rose-600",
    detailBg: "bg-rose-400",
  },
];
const Overview = () => {
  return (
    <div className="h-full p-6">
      <div className="flex gap-8">
        {cards.map((card, index) => (
          <OverviewCard
            key={index}
            title={card.title}
            value={card.value}
            bg={card.bg}
            textColor={card.textColor}
            detailBg={card.detailBg}
          />
        ))}
      </div>
    </div>
  );
};

export default Overview;
