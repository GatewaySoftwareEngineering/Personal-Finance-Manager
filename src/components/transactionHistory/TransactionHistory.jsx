/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import TransactionCard from "../TransactionCard";
import { AiOutlineSearch } from "react-icons/ai";
import { HiOutlineFilter } from "react-icons/hi";
import { BiCheck } from "react-icons/bi";
import {
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  FilledInput,
  Select,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { expenseCategories, incomeCategories } from "../../shared/constants";
import { useSelector } from "react-redux";
import moment from "moment";
import { currencyRates } from "../../shared/currencyRates";

const categories = [...incomeCategories, ...expenseCategories];
const filterInitial = {
  category: [],
  fromDate: new Date(),
  toDate: new Date(),
};

const calculatePagesCount = (pageSize, totalCount) => {
  return totalCount < pageSize ? 1 : Math.ceil(totalCount / pageSize);
};

const sortTransactions = (transactions = []) => {
  return [...transactions]?.sort((a, b) =>
    a.createdAt < b.createdAt ? 1 : -1
  );
};
const PAGE_SIZE = 10;

const TransactionHistory = () => {
  const { transactions } = useSelector((state) => state.transactions);
  const [updatedTransactions, setUpdatedTransactions] = useState([]);
  const [sortedTransactions, setSortedTransactions] = useState([]);
  const [rates, setRates] = useState();
  const [countPagination, setCountPagination] = useState(0);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(filterInitial);
  const maxDate = moment(new Date());

  useEffect(() => {
    (async () => {
      setCountPagination(calculatePagesCount(PAGE_SIZE, transactions?.length));
      const sortTransactionsArray =
        transactions && sortTransactions(await updatedTransactions);

      setSortedTransactions(sortTransactionsArray);
    })();
  }, [transactions, updatedTransactions]);

  useEffect(() => {
    setRates(currencyRates);
  }, [transactions]);

  useEffect(() => {
    (async () => {
      const updatedTr = await transactions?.map((tr) =>
        tr.currency !== "USD" && rates
          ? {
              ...tr,
              amount: Math.floor(
                (rates["USD"] / rates[tr.currency]) * tr.amount
              ),
              currency: "USD",
            }
          : tr
      );

      setUpdatedTransactions(updatedTr);
    })();
  }, [rates, transactions]);

  const onSearchChangeHandler = (e) => {
    const value = e.target.value;
    setSearch(value);

    const filteredTransactions = updatedTransactions.filter((t) =>
      t.note.toUpperCase().includes(value.toUpperCase())
    );

    setSortedTransactions(sortTransactions(filteredTransactions));
    setCountPagination(calculatePagesCount(PAGE_SIZE, filteredTransactions));
  };

  const onClearSearch = () => {
    setSearch("");

    setSortedTransactions(sortTransactions(updatedTransactions));
    setCountPagination(
      calculatePagesCount(PAGE_SIZE, updatedTransactions?.length)
    );
  };

  const categoryHandleChange = (event) => {
    const {
      target: { value },
    } = event;
    setFilter((prevValue) => ({
      ...prevValue,
      category: typeof value === "string" ? value.split(",") : value,
    }));

    const filteredTransactions = updatedTransactions.filter((t) =>
      value.some((v) => v.toUpperCase() === t.category.toUpperCase())
    );

    setSortedTransactions(sortTransactions(filteredTransactions));
    setCountPagination(calculatePagesCount(PAGE_SIZE, filteredTransactions));
  };

  const fromDateHandleChange = (newValue) => {
    setFilter((prevValue) => ({ ...prevValue, fromDate: newValue._d }));

    const filteredTransactions = updatedTransactions.filter(
      (t) => moment(newValue._d).format("l") <= moment(t.createdAt).format("l")
    );

    setSortedTransactions(sortTransactions(filteredTransactions));
    setCountPagination(calculatePagesCount(PAGE_SIZE, filteredTransactions));
  };

  const toDateHandleChange = (newValue) => {
    setFilter((prevValue) => ({ ...prevValue, toDate: newValue._d }));

    const filteredTransactions = updatedTransactions.filter(
      (t) => moment(newValue._d).format("l") >= moment(t.createdAt).format("l")
    );

    setSortedTransactions(sortTransactions(filteredTransactions));
    setCountPagination(calculatePagesCount(PAGE_SIZE, filteredTransactions));
  };

  const onClearFilter = () => {
    setFilter(filterInitial);
    setSortedTransactions(sortTransactions(updatedTransactions));
    setCountPagination(
      calculatePagesCount(PAGE_SIZE, updatedTransactions?.length)
    );
  };

  const onPageChange = (e) => {
    setPage(e.target.ariaLabel.split(" ")[3] - 1);
  };

  return (
    <div className="transaction_history">
      <div className="transaction_history_container">
        <header>
          <h2 className="page_title">Transaction History</h2>
        </header>
        <main>
          <form className="search_section" onSubmit={(e) => e.preventDefault()}>
            <div className="search_input">
              <AiOutlineSearch className="search_icon" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={onSearchChangeHandler}
              />
            </div>
            <button
              className="search_clear_button"
              type="button"
              onClick={onClearSearch}
            >
              Clear
            </button>
          </form>

          <form className="filter_section">
            <div className="filter_inputs">
              <HiOutlineFilter className="filter_icon" />

              <FormControl sx={{ m: 1, width: 250 }}>
                <InputLabel id="demo-multiple-checkbox-label">
                  Category
                </InputLabel>
                <Select
                  size="small"
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={filter.category}
                  onChange={categoryHandleChange}
                  input={
                    <FilledInput
                      className="category_input"
                      placeholder="Category"
                    />
                  }
                  renderValue={(selected) => selected.join(", ")}
                >
                  {categories.map((category) => (
                    <MenuItem
                      className="menu_item"
                      key={category}
                      value={category}
                    >
                      {filter.category.indexOf(category) > -1 ? (
                        <BiCheck className="check_icon" />
                      ) : null}
                      <ListItemText className="item" primary={category} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="From"
                  value={filter.fromDate}
                  onChange={fromDateHandleChange}
                  renderInput={(params) => (
                    <TextField
                      className="date_picker_input"
                      variant="filled"
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DatePicker
                  label="To"
                  maxDate={maxDate}
                  value={filter.toDate}
                  onChange={toDateHandleChange}
                  renderInput={(params) => (
                    <TextField
                      className="date_picker_input"
                      variant="filled"
                      size="small"
                      {...params}
                    />
                  )}
                />
              </LocalizationProvider>
            </div>

            <button
              className="filter_clear_button"
              type="button"
              onClick={onClearFilter}
            >
              Clear
            </button>
          </form>

          <section className="transactions">
            {sortedTransactions
              ?.slice(page * 10, page * 10 + 10)
              ?.map((transaction) => (
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

          {countPagination > 1 && (
            <Stack className="pagination_stack" spacing={2}>
              <Pagination count={countPagination} onChange={onPageChange} />
            </Stack>
          )}
        </main>
      </div>
    </div>
  );
};

export default TransactionHistory;
