import React from "react";
import { Routes, Route } from "react-router-dom";
import OverView from "./pages/overview";
import Transactions from "./pages/transactions";

function App() {
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
