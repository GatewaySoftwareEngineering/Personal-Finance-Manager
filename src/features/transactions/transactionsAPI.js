export const getTransactions = () => {
  return new Promise((resolve) => {
    const transactionsData = localStorage.getItem("transactions");
    resolve(transactionsData);
  });
};

// [
//   {
//     id: "123456789",
//     note: "HyperCloud II Headset",
//     category: "ACCESSORIES",
//     createdAt: new Date().toISOString(),
//     type: "EXPENSE",
//     amount: 75,
//     currency: "USD",
//   },
//   {
//     id: "987546321",
//     note: "Salary after promotion",
//     category: "SALARY",
//     createdAt: new Date().toISOString(),
//     type: "INCOME",
//     amount: 5_000_000,
//     currency: "IQD",
//   },
//   {
//     id: "458761239",
//     note: "Borrowed from Muhammad",
//     category: "LOAN",
//     createdAt: new Date().toISOString(),
//     type: "INCOME",
//     amount: 100_000,
//     currency: "IQD",
//   },
// ];
