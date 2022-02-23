const transactionsInStroe = JSON.parse(localStorage.getItem('fm-transactions'))
const mockData = [
  {
    id: "1",
    note: "HyperCloud II Headset",
    category: "Tech",
    date: 'Wed Feb 23 2022 23:59:00 GMT+0300 (Arabian Standard Time)',
    type: "Expense",
    amount: 75,
  },
  {
    id: "2",
    note: "Salary after promotion",
    category: "Salary",
    date: 'Wed Feb 20 2022 23:59:00 GMT+0300 (Arabian Standard Time)',
    type: "Income",
    amount: 5_000_000,
  },
  {
    id: "3",
    note: "Borrowed from Muhammad",
    category: "Loan",
    date: 'Wed Feb 15 2022 23:59:00 GMT+0300 (Arabian Standard Time)',
    type: "Income",
    amount: 100_000,
  },
]; 
export const getTransactions = async () => [...mockData, ...transactionsInStroe];
