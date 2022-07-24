import _ from "lodash";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import TransactionCard from "../cards/transactionCard";
import AddTransactionsModal from "./addTransactionsModal";
export default function LastTransactions() {
  const { transactions } = useSelector((state) => state.transactions);
  const listTransactionCards =
    transactions?.length > 0 ? (
      _.orderBy(transactions, ["createdAt"], ["desc"])
        ?.slice(0, 10)
        ?.map((eTrans) => {
          return (
            <TransactionCard
              key={eTrans.id}
              amount={eTrans.amount}
              note={eTrans.note}
              type={eTrans.category}
              time={moment(eTrans.createdAt).format().toString()}
            />
          );
        })
    ) : (
      <span>there is no transaction </span>
    );

  return (
    <>
      <div className="mt-5">
        <h4 className="fw-bold">Top Last Transactions</h4>
      </div>
      {listTransactionCards}

      <AddTransactionsModal/>
     
    </>
  );
}
