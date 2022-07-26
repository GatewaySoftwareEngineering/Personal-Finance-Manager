import React, { useEffect, useState } from "react";
import Card from "./Card";
import TransactionCard from "../TransactionCard";
import AddTransactionDialog from "./AddTransactionDialog";
import moment from "moment";
import { useSelector } from "react-redux";
import axios from "axios";

const Overview = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const [updatedTransactions, setUpdatedTransactions] = useState([]);
  const [transactionsArray, setTransactionsArray] = useState(transactions);
  const [rates, setRates] = useState();
  const [total, setTotal] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const isInLastWeek = transactions?.some((transaction) =>
    moment(new Date(transaction.createdAt)).isSame(new Date(), "week")
  );
  const isInLastMonth = transactions?.some((transaction) =>
    moment(new Date(transaction.createdAt)).isSame(new Date(), "month")
  );

  useEffect(() => {
    axios
      .get("/latest", {
        headers: {
          apikey: "ZD0QxNaaRNeGpXO8VwmeXQIO2lq53Svm",
        },
      })
      .then((res) => setRates(res.data.rates))
      .catch((error) => console.log("error", error));
  }, [transactions]);

  useEffect(() => {
    (async () => {
      const updatedTr = await transactions?.map((tr) =>
        tr.currency !== "USD" && rates
          ? {
              ...tr,
              amount: Math.floor(
                (rates["USD"] / rates[tr.currency]) * tr.amount
              ),
              currency: "USD",
            }
          : tr
      );

      setUpdatedTransactions(updatedTr);
    })();
  }, [rates, transactions]);

  useEffect(() => {
    (async () => {
      setTransactionsArray(
        updatedTransactions?.filter((transaction) =>
          isInLastWeek
            ? moment(new Date(transaction.createdAt)).isSame(new Date(), "week")
            : isInLastMonth
            ? moment(new Date(transaction.createdAt)).isSame(
                new Date(),
                "month"
              )
            : transaction
        )
      );
    })();
  }, [isInLastMonth, isInLastWeek, updatedTransactions]);

  useEffect(() => {
    (async () => {
      const totalIncome = await transactionsArray
        ?.filter((tr) => tr.type === "INCOME" && tr)
        ?.reduce((a, b) => a + b.amount, 0);
      const totalexpense = await transactionsArray
        ?.filter((tr) => tr.type === "EXPENSE" && tr)
        ?.reduce((a, b) => a + b.amount, 0);
      const totalBalance = (await totalIncome) - (await totalexpense);

      setTotal({
        income: totalIncome,
        expense: totalexpense,
        balance: totalBalance,
      });
    })();
  }, [transactionsArray]);

  const [openDialog, setOpenDialog] = React.useState(false);

  const onOpenDialog = () => {
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="overview">
      <div className="overview_container">
        <header>
          <h2 className="page_title">Overview</h2>
        </header>
        <main>
          <section className="card_section">
            <Card title="income" amount={total.income} />
            <Card title="balance" amount={total.balance} />
            <Card title="expense" amount={total.expense} />
          </section>

          <section className="latest_transactions">
            <h3 className="latest_transactions_title">
              {isInLastWeek
                ? "This Week"
                : isInLastMonth
                ? "Last Month"
                : "Last Year"}
            </h3>
            {transactionsArray?.slice(0, 10)?.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                label={transaction.note}
                category={transaction.category}
                amount={transaction.amount}
                currency={transaction.currency}
                date={transaction.createdAt}
                type={transaction.type}
              />
            ))}
          </section>

          <section className="add_transaction">
            <button onClick={onOpenDialog}>Add Transaction</button>

            <AddTransactionDialog
              openDialog={openDialog}
              onCloseDialog={onCloseDialog}
              setTransactionsArray={setTransactionsArray}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Overview;
