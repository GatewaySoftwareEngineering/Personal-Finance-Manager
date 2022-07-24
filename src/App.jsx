import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { fetchTransactions } from "./features/transactions/transactionsSlice";
import OverView from "./pages/overview";
import Transactions from "./pages/transactions";

function App() {
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchTransactions());
  })
  return (
    <div>
      <Routes>
        <Route path="/" element={<OverView />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route
          path="*"
          element={<p style={{ padding: "1rem" }}>404 not found!</p>}
        />
      </Routes>
    </div>
  );
}

export default App;
