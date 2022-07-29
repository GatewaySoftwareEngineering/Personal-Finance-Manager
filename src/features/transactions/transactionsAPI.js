import moment from "moment";
export const getTransactions = async () => [
  {
    id: "123456789",
    note: "HyperCloud II Headset",
    category: "ACCESSORIES",
    createdAt: moment().subtract(1, "days").toDate(),
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "987546321",
    note: "Salary after promotion",
    category: "SALARY",
    createdAt: new Date(),
    type: "INCOME",
    amount: 5_000_000,
    currency: "IQD",
  },
  {
    id: "987546325",
    note: "Borrowed from Muhammad",
    category: "LOAN",
    createdAt: moment().subtract(40, "days").toDate(),
    type: "INCOME",
    amount: 100_000,
    currency: "IQD",
  },
];
