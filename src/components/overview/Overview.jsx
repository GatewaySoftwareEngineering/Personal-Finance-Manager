import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import TransactionCard from "../global/TransactionCard";
import OverviewCard from "./OverviewCard";
const cards = [
  {
    type: "income",
    value: 1000,
    bg: "from-sky-300 via-sky-200 to-sky-100",
    textColor: "text-sky-600",
    detailBg: "bg-sky-400",
  },
  {
    type: "balance",
    value: 4500,
    bg: "from-zinc-300 via-zinc-200 to-zinc-100",
    textColor: "text-zinc-600",
    detailBg: "bg-zinc-400",
  },
  {
    type: "expense",
    value: 1500,
    bg: "from-rose-300 via-rose-200 to-rose-100",
    textColor: "text-rose-600",
    detailBg: "bg-rose-400",
  },
];
const Overview = () => {
  const dispatch = useDispatch();
  const transactionsState = useSelector((state) => state.transactions);
  const { loading, transactions, error } = transactionsState;
  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);
  return (
    <div className="h-full p-6">
      <div className="flex gap-8">
        {cards.map((card, index) => (
          <OverviewCard
            key={index}
            type={card.type}
            value={card.value}
            bg={card.bg}
            textColor={card.textColor}
            detailBg={card.detailBg}
          />
        ))}
      </div>
      <div className="mt-24">
        <h2 className="font-medium">This Week</h2>
        <div className="mt-5 flex flex-col gap-5">
          {transactions &&
            transactions?.map((element) => (
              <TransactionCard
                key={element.id}
                note={element.note}
                type={element.type}
                amount={element.amount}
                currency={element.currency}
                category={element.category}
                date={element.createdAt}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
