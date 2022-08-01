import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import Navbar from "./navbar";
import Transactions from "./transactions";
import Select from "react-select";
import moment from "moment";

export const TransactionsHistory = (props) => {
  const ref = useRef(null);
  const category = useRef(null);
  const dateTo = useRef(null);
  const dateFrom = useRef(null);

  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState({
    category: null,
    date: { from: null, to: null },
  });
  const options = [
    {
      value: "Salary",
      label: "Salary",
    },
    {
      value: "Loan",
      label: "Loan",
    },
    {
      value: "Tech",
      label: "Tech",
    },
    {
      value: "Food",
      label: "Food",
    },
    {
      value: "Bills",
      label: "Bills",
    },
    {
      value: "Sports",
      label: "Sports",
    },
    {
      value: "Health",
      label: "Health",
    },
    {
      value: "Clothes",
      label: "Clothes",
    },
  ];

  useEffect(() => {
    console.log("TransactionsHistory", filter);
  }, [filter]);

  const clearSearch = () => {
    setSearch("");
    ref.current.value = "";
  };
  const clearFilters = () => {
    category.current.value = "";
    dateFrom.current.value = "";
    dateTo.current.value = "";
    setFilter({ category: "", date: { from: "", to: "" } });
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
            flexDirection: "column",
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "80%",
              margin: "10px 0",
              backgroundColor: "#F8FAFC",
              borderRadius: "7px",
              height: "50px",
              justifyContent: "space-between",
            }}
          >
            <div styles={{ width: "300px" }}>
              <Select
                value={filter.category}
                options={options}
                isMulti
                closeMenuOnSelect={true}
                isClearable={false}
                hideSelectedOptions={false}
                autosize={false}
                onChange={(e) => {
                  console.log(e);
                  setFilter({ ...filter, category: e });
                }}
                styles={{
                  control: (styles) => ({
                    ...styles,
                    width: "300px",
                    height: "40px",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }),
                  option: (styles, state) => ({
                    ...styles,
                    backgroundColor: state.isSelected ? "#1c658c" : "",
                  }),
                  menu: (styles) => ({ ...styles, width: "300px" }),
                }}
                ref={category}
              />
            </div>

            <input
              type="date"
              placeholder="Date From"
              className="date-input"
              ref={dateFrom}
              max={moment().format("YYYY-MM-DD")}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  date: { ...filter.date, from: e.target.value },
                });
              }}
            />
            <input
              type="date"
              placeholder="Date To"
              className="date-input"
              ref={dateTo}
              max={moment().format("YYYY-MM-DD")}
              onChange={(e) => {
                setFilter({
                  ...filter,
                  date: { ...filter.date, to: e.target.value },
                });
              }}
            />
            <button className="filter-button" onClick={clearFilters}>
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
