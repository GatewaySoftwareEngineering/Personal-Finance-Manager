import React from "react";
import { Routes, Route } from "react-router-dom";
import Overview from "./components/overview/Overview";
import SideBar from "./components/side-bar/SideBar";
import TopBar from "./components/top-bar/TopBar";
import TransactionHistory from "./components/transaction-history/TransactionHistory";

function App() {
  return (
    <div className="container grid h-screen grid-cols-5 text-2xl">
      <div className="col-span-1">
        <SideBar />
      </div>
      <div className="col-span-4 flex flex-col overflow-auto">
        <TopBar />
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
