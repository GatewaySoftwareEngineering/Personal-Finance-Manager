import React from "react"; 
import AuthGuard from './components/AuthGuard'
// import { useSelector, useDispatch } from "react-redux";
// import { fetchTransactions } from './features/transactions/transactionsSlice';

function App() {
  // const { transactions }  = useSelector((state) => state.transactions)
  // const dispatch = useDispatch();

  return (
    // <div className="app">
    //   <h1 className="app__title">Money Manager</h1>
    //   <p className="app__message">Start Editing Me, let's get this done!</p>
    //   <button onClick={() => dispatch(fetchTransactions())}>fetch data</button>

    //   <ul>
    //     {transactions ? transactions.map((val) => (
    //       <li key={val.id}>{val.id}</li>
    //     )): <li>no data</li>}
    //   </ul>
    // </div>

    <AuthGuard />
  );
}

export default App;
