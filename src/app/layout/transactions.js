import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import * as _ from "lodash";
import MoneyIcon from "../images/Icon.png";

export const Transactions = (props) => {
  console.log("Transactions props: ", props);
  const { fetchTransactions, transactions } = props;
  // i will have three props
  // 1. a header for the week and stuff
  // 2. one for the pagination
  // 3. one for filters

  useEffect(() => {
    fetchTransactions();
  }, []);

  const lastTransaction = transactions && _.maxBy(transactions, "createdAt");
  const lastTransactions = transactions && transactions.slice(0, 10);
  const lastTransactionSorted =
    lastTransactions && _.orderBy(lastTransactions, "createdAt", "desc");

  return (
    <div>
      <section className="transactions-container">
        <h3>
          {lastTransaction &&
          moment(lastTransaction.createdAt).isSame(new Date(), "week")
            ? "This week"
            : lastTransaction &&
              moment(lastTransaction.createdAt).isSame(new Date(), "month")
            ? "This month"
            : "Last transactions"}
        </h3>
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
                      ? moment(transaction.createdAt).format("dddd DD/MM/YYYY")
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
