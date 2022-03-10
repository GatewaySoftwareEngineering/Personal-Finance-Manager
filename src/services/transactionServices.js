import moment from "moment";
const sortTransactions = (transactionsData, sortType = "asc") => {
  if (transactionsData === undefined) return [];
  if (sortType === "asc") {
    return [...transactionsData]?.sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    );
  }
  if (sortType === "desc") {
    return [...transactionsData]?.sort(
      (first, second) => new Date(first.createdAt) - new Date(second.createdAt)
    );
  }
};

const getLatestTransactions = (transactionsData) => {
  if (transactionsData === undefined) return {};
  const today = moment();
  const sortedTransactions = sortTransactions(transactionsData);
  const filteredData = { title: "", result: [] };

  // this week filter
  const lastWeekTransactions = sortedTransactions.filter((transaction) => {
    const currentTransactionDate = moment(transaction.createdAt);
    return today.diff(currentTransactionDate, "weeks") === 0;
  });
  filteredData.title = "This week";
  filteredData.result = lastWeekTransactions;

  // last month filter
  if (filteredData.result.length === 0) {
    const lastMonthTransactions = sortedTransactions.filter((transaction) => {
      const currentTransactionDate = moment(transaction.createdAt);
      return (
        today.month() === currentTransactionDate.month() &&
        today.year() === currentTransactionDate.year()
      );
    });
    filteredData.title = "Last month";
    filteredData.result = lastMonthTransactions;
  }

  // this year filter
  if (filteredData.result.length <= 0) {
    const thisYearTransactions = sortedTransactions.filter((transaction) => {
      const currentTransactionDate = moment(transaction.createdAt);
      return today.year() === currentTransactionDate.year();
    });
    filteredData.title = "This year";
    filteredData.result = thisYearTransactions;
  }
  if (filteredData.result.length <= 0) {
    filteredData.title = "Last Transactions";
    filteredData.result = sortedTransactions;
  }
  return {
    ...filteredData,
    result: filteredData.result.slice(0, 10),
  };
};

const filterTransactionsService = (options, data) => {
  if (data === undefined) {
    return;
  }
  if (
    !options.category &&
    !options.searchValue &&
    !options.startDate &&
    !options.endDate
  ) {
    return data;
  }

  const result = { value: data };
  const today = moment();
  const startDate = isNaN(moment(options.startDate))
    ? false
    : moment(options.startDate);

  const endDate = isNaN(moment(options.endDate))
    ? false
    : moment(options.endDate).add(1, "day");

  // filter by category
  if (options.category) {
    result.value = result.value?.filter((element) =>
      options.category.includes(element.category)
    );
  }

  // filter by {from} and {to} dates
  if (startDate && endDate) {
    result.value = result.value?.filter((element) => {
      const currentTransactionDate = moment(element.createdAt);
      return (
        currentTransactionDate >= startDate && currentTransactionDate <= endDate
      );
    });
  }

  // filter just by {from date}
  if (startDate && !endDate) {
    result.value = result.value?.filter((element) => {
      const currentTransactionDate = moment(element.createdAt);
      return (
        currentTransactionDate >= startDate && currentTransactionDate <= today
      );
    });
  }

  // filter just by {to} date
  if (endDate && !startDate) {
    result.value = result.value?.filter((element) => {
      const currentTransactionDate = moment(element.createdAt);
      return currentTransactionDate <= endDate;
    });
  }

  if (options.searchValue) {
    // extract numbers in {searchValue}
    const searchAmount = parseInt(options.searchValue?.match(/\d/g)?.join(""));

    // extract letters in {searchValue}
    const searchNote = options.searchValue?.match(/\D/g)?.join("");
    const searchResult = result.value?.filter((element) => {
      const amountInUsd =
        element.currency === "IQD"
          ? Math.round(element.amount / 1480)
          : element.amount;
      return (
        element.note?.toLowerCase().includes(searchNote?.toLowerCase()) ||
        amountInUsd === searchAmount
      );
    });
    result.value = searchResult.length > 0 ? searchResult : result.value;
  }

  return result.value;
};
export { sortTransactions, getLatestTransactions, filterTransactionsService };
