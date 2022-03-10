export const getTransactions = () => {
  return new Promise((resolve, reject) => {
    const transactionsData = localStorage.getItem("transactions");
    resolve(transactionsData);
    if (transactionsData === "") {
      reject("Could not fetch data from server try again!");
    }
  });
};

export const addTransaction = (data) => {
  return new Promise((resolve, reject) => {
    if (!data) {
      reject("Could not add empty transaction!");
    }
    const allTransactions = JSON.parse(localStorage.getItem("transactions"));
    allTransactions.unshift(data);
    localStorage.setItem("transactions", JSON.stringify(allTransactions));
    resolve({
      message: "Transaction added successfully!",
      data: allTransactions,
    });
  });
};
