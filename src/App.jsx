import React from "react";
import { Routes, Route } from "react-router-dom";
import Overview from "./components/overview/Overview";
import SideBar from "./components/side-bar/SideBar";
import TopBar from "./components/top-bar/TopBar";
import TransactionHistory from "./components/transaction-history/TransactionHistory";

function App() {
  return (
    <div className="container flex min-h-screen text-2xl">
      <SideBar />
      <TopBar />
      {/* <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/transaction-history" element={<TransactionHistory />} />
      </Routes> */}
    </div>
  );
}

export default App;
