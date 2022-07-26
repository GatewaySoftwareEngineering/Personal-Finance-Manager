import _ from "lodash";
import moment from "moment";
import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { filterPerDate } from "src/helper/calulateLastTransactions";
import TransactionCard from "../cards/transactionCard";
import AddTransactionsModal from "./addTransactionsModal";
export default function LastTransactions() {
  moment.locale("en", {
    week: {
      dow: 6,
    },
  });
  const { transactions } = useSelector((state) => state.transactions);
  let transactionsType = "Transactions";
  let listTransactionCards = [];
  const getTransactions = () => {
    const lastWeek = moment().subtract(1, "w").format();
    if (transactions?.length > 0) {
      let listFilter = [];
      const resultLastWeek = filterPerDate(transactions, "week");
      //if list week is not empty
      if (resultLastWeek.length > 0) {
        listFilter = resultLastWeek;
        transactionsType = "Week";
      } else {
        const lastMonth = moment().subtract(1, "m").format();

        const resultLastMonth = filterPerDate(transactions, "month");
        //if list month is not empty
        if (resultLastMonth.length > 0) {
          listFilter = resultLastMonth;
          transactionsType = "Month";
        } else {
          const lastYears = moment().subtract(1, "y").format();
          const resultLastYears = filterPerDate(transactions, "year");
          //if list years is not empty
          if (resultLastYears.length > 0) {
            listFilter = resultLastYears;
            transactionsType = "Years";
          } else {
            //and default
            listFilter = _.orderBy(
              transactions,
              ["createdAt"],
              ["desc"]
            )?.slice(0, 10);
          }
        }
      }

      listTransactionCards = listFilter.map((eTrans) => {
        return (
          <TransactionCard
            key={eTrans.id}
            amount={eTrans.amount}
            note={eTrans.note}
            type={eTrans.category}
            time={moment(eTrans.createdAt).format().toString()}
          />
        );
      });
    }
  };
  getTransactions();

  return (
    <>
      <div className="mt-5">
        <h4 className="fw-bold">Top Last {transactionsType}</h4>
      </div>
      {listTransactionCards?.length == 0 ? (
        <span>there is no transaction</span>
      ) : (
        listTransactionCards
      )}

      <AddTransactionsModal />
    </>
  );
}
