import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";
import Transactions from "./transactions";

export const TransactionsHistory = (props) => {
  const ref = useRef(null);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    category: "",
    date: { from: "", to: "" },
  });

  const clearSearch = () => {
    setSearch("");
    ref.current.value = "";
  };
  return (
    <div>
      <Navbar title={"Transactions"} />
      <section className="container">
        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              margin: "10px 0",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              className="search-input"
              value={search}
              ref={ref}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button className="search-button" onClick={clearSearch}>
              Clear
            </button>
          </div>
        </div>
        <Transactions page={"history"} filter={filter} search={search} />
      </section>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransactionsHistory);
