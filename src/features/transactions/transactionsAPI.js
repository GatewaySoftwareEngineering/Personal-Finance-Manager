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
];
