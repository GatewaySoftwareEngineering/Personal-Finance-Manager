import moment from "moment";
export const getTransactions = async () => [
  {
    id: "1",
    note: "HyperCloud II Headset",
    category: "ACCESSORIES",
    createdAt: moment().subtract(1, "days").startOf("day").toDate(),
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "2",
    note: "Salary after promotion",
    category: "SALARY",
    createdAt: moment().startOf("day").toDate(),
    type: "INCOME",
    amount: 5_000_000,
    currency: "IQD",
  },
  {
    id: "3",
    note: "Borrowed from Muhammad",
    category: "LOAN",
    createdAt: moment().subtract(40, "days").startOf("day").toDate(),
    type: "INCOME",
    amount: 100_000,
    currency: "IQD",
  },
  {
    id: "4",
    note: "Airpods",
    category: "ACCESSORIES",
    createdAt: moment().subtract(5, "days").startOf("day").toDate(),
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "5",
    note: "Money from parents",
    category: "SALARY",
    createdAt: moment().startOf("day").toDate(),
    type: "INCOME",
    amount: 5_000_000,
    currency: "IQD",
  },
  {
    id: "6",
    note: "Icecream",
    category: "LOAN",
    createdAt: moment().subtract(20, "days").startOf("day").toDate(),
    type: "INCOME",
    amount: 100_000,
    currency: "IQD",
  },
  {
    id: "7",
    note: "Cleaning bill",
    category: "ACCESSORIES",
    createdAt: moment().subtract(7, "days").startOf("day").toDate(),
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "8",
    note: "Perfume",
    category: "SALARY",
    createdAt: moment().startOf("day").toDate(),
    type: "INCOME",
    amount: 5_000_000,
    currency: "IQD",
  },
  {
    id: "11",
    note: "Food",
    category: "LOAN",
    createdAt: moment().subtract(11, "days").startOf("day").toDate(),
    type: "INCOME",
    amount: 100_000,
    currency: "IQD",
  },
  {
    id: "12",
    note: "Coffee",
    category: "ACCESSORIES",
    createdAt: moment().subtract(15, "days").startOf("day").toDate(),
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "9",
    note: "Salary",
    category: "SALARY",
    createdAt: moment().startOf("day").toDate(),
    type: "INCOME",
    amount: 5_000_000,
    currency: "IQD",
  },
  {
    id: "10",
    note: "Borrowed from Yara",
    category: "LOAN",
    createdAt: moment().subtract(40, "days").startOf("day").toDate(),
    type: "INCOME",
    amount: 100_000,
    currency: "IQD",
  },
];
