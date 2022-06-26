import {React,useState} from "react";
import {useEffect} from "react"
import {useDispatch,useSelector} from 'react-redux'
import {fetchTransactions} from "./features/transactions/transactionsSlice";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardSideBar from './components/cardsidebar'
import Home from "./pages/overview"
import TransactionHistory from "./pages/transaction_history"
import {Routes,Route} from "react-router-dom";


function App() {

  const dispatch =useDispatch();
  const transactions = useSelector((state) => state.transactions)


  // fetch data async
  useEffect(() => {
    dispatch(fetchTransactions())
    // console.log(transactions)
  },[dispatch]);

  return (
<>
  <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={0} lg={12} sm={12}>

        <Grid item xs={2} md={2} lg={2} sx={{ display: { xs: 'none', lg: 'block', xl: 'none' } }}>
              <CardSideBar/>
        </Grid>

          <Grid item xs={12} md={12} lg={10} style={{background:'#E8E8E8'}} className="grid_container">
          <Routes>
              <Route  path="/" element={<Home />}/>
              <Route path="/transaction_history" element={<TransactionHistory />}/>
          </Routes>
          </Grid>
      
      </Grid>
  </Box>
</>
  );
}

export default App;
