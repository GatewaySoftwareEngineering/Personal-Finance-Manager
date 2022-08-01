import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import moment from "moment";
import { fetchTransactions } from "../../features/transactions/transactionsSlice";
import * as _ from "lodash";
import MoneyIcon from "../images/Icon.png";
import ReactPaginate from "react-paginate";

export const Transactions = (props) => {
  const { fetchTransactions, page, search, filter, transactions } = props;
  const [transactionsList, setTransactionsList] = useState([]);
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);

  const [itemOffset, setItemOffset] = useState(0);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * 5) % transactionsList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  useEffect(() => {
    const orderedTransactions = _.orderBy(transactions, "createdAt", "desc");
    setTransactionsList(orderedTransactions);
  }, [transactions]);

  useEffect(() => {
    // Fetch items from another resources.
    console.log("transactionsList", transactionsList);
    const endOffset = itemOffset + 5;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    console.log(
      "transactionsList.slice(itemOffset, endOffset)",
      transactionsList.slice(itemOffset, endOffset)
    );
    setCurrentItems(transactionsList.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(transactionsList.length / 5));
  }, [itemOffset, transactionsList]);

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
          {_.map(currentItems, (transaction, index) => {
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
          <div
            style={{
              width: "30%",
              float: "right",
            }}
          >
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
            />
          </div>
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
