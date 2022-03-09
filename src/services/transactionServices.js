import moment from "moment";
const sortTransactions = (transactionsData, sortType = "asc") => {
  if (transactionsData === undefined) return [];
  if (sortType === "asc") {
    return [...transactionsData]?.sort(
      (first, second) => new Date(first.createdAt) - new Date(second.createdAt)
    );
  }
  if (sortType === "desc") {
    return [...transactionsData]?.sort(
      (first, second) => new Date(second.createdAt) - new Date(first.createdAt)
    );
  }
};

const getLatestTransactions = (transactionsData) => {
  if (transactionsData === undefined) return {};
  const today = moment();
  const sortedTransactions = sortTransactions(transactionsData, "desc");
  const filteredData = { title: "", filteredTransactions: [] };

  // this week filter
  const lastWeekTransactions = sortedTransactions.filter((transaction) => {
    const currentTransactionDate = moment(transaction.createdAt);
    return today.diff(currentTransactionDate, "weeks") === 0;
  });
  filteredData.title = "This week";
  filteredData.filteredTransactions = lastWeekTransactions;

  // last month filter
  if (filteredData.filteredTransactions.length === 0) {
    const lastMonthTransactions = sortedTransactions.filter((transaction) => {
      const currentTransactionDate = moment(transaction.createdAt);
      return (
        today.month() === currentTransactionDate.month() &&
        today.year() === currentTransactionDate.year()
      );
    });
    filteredData.title = "Last month";
    filteredData.filteredTransactions = lastMonthTransactions;
  }

  // this year filter
  if (filteredData.filteredTransactions.length <= 0) {
    const thisYearTransactions = sortedTransactions.filter((transaction) => {
      const currentTransactionDate = moment(transaction.createdAt);
      return today.year() === currentTransactionDate.year();
    });
    filteredData.title = "This year";
    filteredData.filteredTransactions = thisYearTransactions;
  }
  if (filteredData.filteredTransactions.length <= 0) {
    filteredData.title = "Last Transactions";
    filteredData.filteredTransactions = sortedTransactions;
  }
  return {
    ...filteredData,
    transactions: filteredData.filteredTransactions.slice(0, 10),
  };
};

export { sortTransactions, getLatestTransactions };
