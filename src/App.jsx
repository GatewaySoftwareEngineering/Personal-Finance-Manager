/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import Sidenav from "./components/sidenav/Sidenav";
import { fetchTransactions } from "./features/transactions/transactionsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);

  return (
    <div className="main_container">
      <Sidenav />
      <div className="main_section">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
