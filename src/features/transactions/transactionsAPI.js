const today = new Date()
export const getTransactions = async () => [
  {
    id: "123456789",
    note: "HyperCloud II Headset",
    category: "ACCESSORIES",
    createdAt: today.toString(),
    type: "EXPENSE",
    amount: 75,
    currency: "USD",
  },
  {
    id: "987546321",
    note: "Salary after promotion",
    category: "SALARY",
    createdAt: today.toString(),
    type: "INCOME",
    amount: 5_000_000,
    currency: "IQD",
  },
  {
    id: "987546344",
    note: "Borrowed from Muhammad",
    category: "LOAN",
    createdAt: today.toString(),
    type: "INCOME",
    amount: 100_000,
    currency: "IQD",
  },
];
