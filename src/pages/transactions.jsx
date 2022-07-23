import React, { useEffect } from "react";

export default function Transactions() {
  useEffect(() => {
    document.title = "Transaction History";
  }, []);
  return <div>Transactions</div>;
}
