import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import * as _ from "lodash";
import MoneyIcon from "../images/Icon.png";

export const Transactions = (props) => {
  const { fetchTransactions, page, search, filter, transactions } = props;
  const [transactionsList, setTransactionsList] = useState([]);
  // i will have four props
  // 1. transactions search term ✅
  // 2. one for the pagination
  // 3. one for filters ✅
  // 4. one for the transactions slicing ✅

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    setTransactionsList(transactions);
  }, [transactions]);

  useEffect(() => {
    let filteredTransactions = transactions;
    const dateBasedFilteredTransactions = [];
    const catgoryBasedFilteredTransactions = [];
    const filtersArray = [];

    filter &&
      Object.keys(filter).forEach((key) => {
        if (
          filter[key] !== undefined &&
          filter[key] !== null &&
          filter[key] !== ""
        )
          filtersArray.push(key);
      });

    if (filtersArray.length > 0 || search !== "") {
      if (search !== "") {
        filteredTransactions = _.filter(transactions, (transaction) => {
          const { note, amount } = transaction;
          const searchTerm = search && search.toLowerCase().toString();
          const amountString = amount.toString();
          return (
            note.toLowerCase().indexOf(searchTerm) > -1 ||
            amountString.toLowerCase().indexOf(searchTerm) > -1
          );
        });
      }
      if (filtersArray.length > 0) {
        filteredTransactions = _.filter(filteredTransactions, (transaction) => {
          const catgs = [];
          _.forEach(filter.category, (category) => {
            catgs.push(category.value.toLowerCase());
          });

          if (
            !_.isNull(filter.dateFrom)
              ? moment(transaction.createdAt).isBetween(
                  filter.dateFrom,
                  filter.dateTo || moment().endOf("day").toDate()
                )
              : false
          ) {
            dateBasedFilteredTransactions.push(transaction);
          }
          if (catgs.includes(transaction.category.toLowerCase())) {
            catgoryBasedFilteredTransactions.push(transaction);
          }
        });
      }
      filteredTransactions = [
        ...new Set(
          filteredTransactions.concat(
            dateBasedFilteredTransactions,
            catgoryBasedFilteredTransactions
          )
        ),
      ];

      setTransactionsList(filteredTransactions);
    } else {
      setTransactionsList(transactions);
    }
  }, [search, filter]);

  const lastTransaction =
    transactionsList && _.maxBy(transactionsList, "createdAt");
  const lastTransactions =
    page !== "history" && transactionsList
      ? transactionsList.slice(0, 10)
      : transactionsList;
  const lastTransactionSorted =
    lastTransactions && _.orderBy(lastTransactions, "createdAt", "desc");

  return (
    <div>
      <section className="transactions-container">
        {page !== "history" ? (
          <h3>
            {lastTransaction &&
            moment(lastTransaction.createdAt).isSame(new Date(), "week")
              ? "This week"
              : lastTransaction &&
                moment(lastTransaction.createdAt).isSame(new Date(), "month")
              ? "This month"
              : "Last transactions"}
          </h3>
        ) : (
          ""
        )}
        <div>
          {_.map(lastTransactionSorted, (transaction, index) => {
            return (
              <div
                key={index}
                style={{
                  background: "#F8FAFC",
                  width: "80%",
                  display: "flex",
                  borderRadius: "7px",
                  justifyContent: "space-between",
                  padding: "0 10px",
                  margin: "10px 0",
                }}
              >
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={MoneyIcon}
                    alt="Money Icon"
                    width="30"
                    height="30"
                  />
                  <p
                    style={{
                      color: "#334155",
                      fontWeight: "400",
                      margin: "0 6px",
                    }}
                  >
                    {transaction && transaction.note}
                  </p>
                </div>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                  }}
                >
                  <p
                    style={{
                      color: "#334155",
                      fontWeight: "400",
                      margin: "0 8px",
                    }}
                  >
                    {transaction &&
                    moment(transaction.createdAt).isSame(moment(), "day")
                      ? "Today"
                      : transaction &&
                        moment(transaction.createdAt).isSame(
                          moment().subtract(1, "days"),
                          "day"
                        )
                      ? "Yesterday"
                      : transaction
                      ? moment(transaction.createdAt).format("ddd DD/MM/YYYY")
                      : "No Date Found"}
                  </p>
                  <p
                    className={
                      transaction && transaction.type == "INCOME"
                        ? "income-text"
                        : "expense-text"
                    }
                  >
                    {transaction && transaction.type == "INCOME" ? "+ " : "- "}
                    {transaction && Math.abs(transaction.amount) > 999
                      ? Math.sign(transaction.amount) *
                          (Math.abs(transaction.amount) / 1000).toFixed(1) +
                        "k"
                      : Math.sign(transaction.amount) *
                        Math.abs(transaction.amount)}

                    {transaction && transaction.currency === "IQD"
                      ? " IQD"
                      : "$"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({
  transactions: state.transactions.transactions,
});

const mapDispatchToProps = {
  fetchTransactions,
};

export default connect(mapStateToProps, mapDispatchToProps)(Transactions);
