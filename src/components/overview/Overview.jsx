import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import { fetchWalletData } from "../../features/wallet/walletSlice";
import AddTransactionModal from "../global/AddTransactionModal";
import TransactionCard from "../global/TransactionCard";
import OverviewCard from "./OverviewCard";
import { getLatestTransactions } from "../../services/transactionServices";

const Overview = () => {
  const dispatch = useDispatch();
  const transactionsState = useSelector((state) => state.transactions);
  const walletState = useSelector((state) => state.wallet);
  const { transactions } = transactionsState;
  const { wallet } = walletState;
  const [showModal, setShowModal] = useState(false);
  const latestTransactions = getLatestTransactions(transactions);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchWalletData());
  }, [dispatch]);

  return (
    <>
      <AddTransactionModal setShowModal={setShowModal} showModal={showModal} />

      <div className="p-6">
        <div className="flex gap-8">
          {wallet?.map((element) => (
            <OverviewCard
              key={element.id}
              type={element.type}
              value={element.value}
            />
          ))}
        </div>
        <div className="mt-24 w-10/12">
          <h2 className="font-medium">{latestTransactions.title}</h2>
          <div className="mt-5 flex flex-col gap-5">
            {latestTransactions?.filteredTransactions?.map((element) => (
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
          <div className="mt-[90px] flex justify-end">
            <button
              onClick={() => setShowModal(true)}
              className="rounded-full bg-blue-dark bg-opacity-15 px-4 py-2 text-xl font-semibold capitalize text-blue-dark"
            >
              add transaction
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Overview;
