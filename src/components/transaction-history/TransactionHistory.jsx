import React, { forwardRef, useEffect, useRef, useState, useMemo } from "react";
import { GrSearch } from "react-icons/gr";
import { HiOutlineFilter } from "react-icons/hi";
import Select from "react-select";
import { customCategory } from "../../styles/customSelectStyle";
import { BsCalendar2 } from "react-icons/bs";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { sortTransactions } from "../../services/transactionServices";
import TransactionCard from "../global/TransactionCard";
import {
  fetchTransactions,
  filterTransactions,
} from "../../features/transactions/transactionsSlice";
import CustomOption from "../global/CustomOption";
import ReactPaginate from "react-paginate";
const categoryOptions = [
  { value: "tech", label: "Tech" },
  { value: "cloths", label: "Cloths" },
  { value: "bills", label: "Bills" },
  { value: "sports", label: "Sports" },
  { value: "health", label: "Health" },
  { value: "food", label: "Food" },
  { value: "salary", label: "Salary" },
  { value: "loan", label: "Loan" },
  { value: "gift", label: "Gift" },
];
const CustomDateInputFrom = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="flex w-full items-center justify-between rounded-lg bg-white px-2 py-3 text-base shadow-date-input-inner"
    onClick={onClick}
    ref={ref}
  >
    <span>from</span>
    {value}
    <span>
      <BsCalendar2 />
    </span>
  </button>
));
const CustomDateInputTo = forwardRef(({ value, onClick }, ref) => (
  <button
    type="button"
    className="flex w-full items-center justify-between rounded-lg bg-white px-2 py-3 text-base shadow-date-input-inner"
    onClick={onClick}
    ref={ref}
  >
    <span>to</span>
    {value}
    <span>
      <BsCalendar2 />
    </span>
  </button>
));

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const transactionsState = useSelector((state) => state.transactions);
  const transactions = sortTransactions(transactionsState.transactions);
  const { filteredTransactions } = transactionsState;

  const [filterOptions, setFilterOptions] = useState({
    startDate: null,
    endDate: null,
    category: "",
    searchValue: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const selectRef = useRef();
  const handleCategory = (categories) => {
    const categoryValues = categories.map((category) => category.value);
    const category = categoryValues.join(" ").toUpperCase();
    setFilterOptions({ ...filterOptions, category: category });
  };
  const data = useMemo(
    () =>
      filteredTransactions?.length > 0 ? filteredTransactions : transactions,
    [transactions, filteredTransactions]
  );

  const handlePageChange = (page) => {
    setCurrentPage(page.selected + 1);
  };
  // Effects
  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
  useEffect(() => {
    setCurrentPage(1);
    dispatch(
      filterTransactions({
        filterOptions: filterOptions,
        transactions: transactions,
      })
    );
  }, [filterOptions]);

  const handleFilterReset = () => {
    selectRef.current.clearValue();
    setFilterOptions({
      ...filterOptions,
      startDate: null,
      endDate: null,
      category: "",
    });
    dispatch(fetchTransactions());
    return;
  };

  const handleSearchReset = () => {
    setFilterOptions({
      ...filterOptions,
      searchValue: "",
    });
    dispatch(fetchTransactions());
    return;
  };

  return (
    <div className="flex flex-1 flex-col overflow-auto p-6">
      {/* search div */}
      <div className="flex h-12 w-full items-center rounded-lg bg-white">
        <div className="my-4 ml-3 h-5 w-5">
          <GrSearch className="h-full w-full" />
        </div>
        <input
          onChange={(event) => {
            setFilterOptions({
              ...filterOptions,
              searchValue: event.target.value,
            });
          }}
          value={filterOptions.searchValue}
          type="text"
          className="ml-4 h-full w-full text-lg outline-none"
        />
        <button
          onClick={handleSearchReset}
          type="button"
          className="flex h-full items-center justify-center rounded-r-lg bg-cyan-700 px-5 py-3 text-xl capitalize text-white"
        >
          clear
        </button>

        {/* filter div */}
      </div>
      <div className="my-6 flex h-16  items-center gap-3 rounded-lg bg-slate-50">
        <div className="my-4 mx-3 h-6 w-6">
          <HiOutlineFilter className="h-full w-full" />
        </div>
        <div className="flex w-full gap-6">
          <div className="w-1/3">
            <Select
              ref={selectRef}
              options={categoryOptions}
              isMulti
              components={{ Option: CustomOption }}
              onChange={handleCategory}
              className="w-full"
              styles={customCategory}
              closeMenuOnSelect={false}
              hideSelectedOptions={false}
              placeholder="Select transaction category"
            />
          </div>
          <div className="flex w-1/2 gap-6">
            <DatePicker
              selected={filterOptions.startDate}
              onChange={(date) =>
                setFilterOptions({ ...filterOptions, startDate: date })
              }
              selectsStart
              startDate={filterOptions.startDate}
              endDate={filterOptions.endDate}
              customInput={<CustomDateInputFrom />}
              showMonthDropdown
              showYearDropdown
              maxDate={
                filterOptions.endDate ? filterOptions.endDate : new Date()
              }
              dropdownMode="select"
            />
            <DatePicker
              selected={filterOptions.endDate}
              onChange={(date) =>
                setFilterOptions({ ...filterOptions, endDate: date })
              }
              selectsEnd
              startDate={filterOptions.startDate}
              endDate={filterOptions.endDate}
              customInput={<CustomDateInputTo />}
              showMonthDropdown
              showYearDropdown
              maxDate={new Date()}
              minDate={filterOptions.startDate ?? filterOptions.startDate}
              dropdownMode="select"
            />
          </div>
        </div>
        <button
          type="button"
          onClick={handleFilterReset}
          className="flex h-full items-center justify-center rounded-r-lg bg-cyan-700 px-5 py-3 text-xl capitalize text-white"
        >
          clear
        </button>
      </div>
      {/* transactions div */}
      <div className="flex w-full flex-1 flex-col gap-5 overflow-auto pr-4">
        {data.slice(currentPage * 10 - 10, currentPage * 10).map((element) => (
          <TransactionCard
            key={element.id}
            note={element.note}
            type={element.type}
            amount={element.amount}
            currency={element.currency}
            category={element.category}
            date={element.createdAt}
          />
        ))}
      </div>
      <div className="flex items-end justify-end py-5 text-base font-semibold">
        <ReactPaginate
          previousLabel="<"
          nextLabel=">"
          pageCount={Math.ceil(data.length / 10)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageChange}
          containerClassName={"paginationButton"}
          previousLinkClassName={"previousButton"}
          nextLinkClassName={"nextButton"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          previousClassName={"prevButton"}
          nextClassName={"nextButton"}
          forcePage={currentPage - 1}
          breakLabel=".."
        />
      </div>
    </div>
  );
};

export default TransactionHistory;
