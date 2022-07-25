import React, { useEffect, useState } from "react";
import Card from "./Card";
import TransactionCard from "../TransactionCard";
import AddTransactionDialog from "./AddTransactionDialog";
import moment from "moment";
import { useSelector } from "react-redux";

const Overview = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const [transactionsArray, setTransactionsArray] = useState(transactions);

  const isInLastWeek = transactions?.some((transaction) =>
    moment(new Date(transaction.createdAt)).isSame(new Date(), "week")
  );
  const isInLastMonth = transactions?.some((transaction) =>
    moment(new Date(transaction.createdAt)).isSame(new Date(), "month")
  );

  useEffect(() => {
    setTransactionsArray(
      transactions?.filter((transaction) =>
        isInLastWeek
          ? moment(new Date(transaction.createdAt)).isSame(new Date(), "week")
          : isInLastMonth
          ? moment(new Date(transaction.createdAt)).isSame(new Date(), "month")
          : transaction
      )
    );
  }, [isInLastMonth, isInLastWeek, transactions]);

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
            <Card title="income" amount="1000" />
            <Card title="balance" amount="25000" />
            <Card title="expense" amount="4520" />
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
