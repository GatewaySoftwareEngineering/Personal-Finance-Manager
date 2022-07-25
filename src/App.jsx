import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchTransactions } from "./features/transactions/transactionsSlice";
const NotFound = React.lazy(() => import("./pages/notfound"));
const OverView = React.lazy(() => import("./pages/overview"));
const Transactions = React.lazy(() => import("./pages/transactions"));

function App() {
  const { transactions } = useSelector((state) => state.transactions);

  const dispatch = useDispatch();
  useEffect(() => {
    if (transactions?.length === 0) {
      dispatch(fetchTransactions());
    }
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<OverView />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
