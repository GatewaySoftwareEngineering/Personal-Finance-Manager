import { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment'
import { Grid } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// icon
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined'; //tech
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined'; //salary
import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined'; //loan
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';//gift
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined'; //food
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';//bills
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined'; //sport
import DirectionsRunOutlinedIcon from '@mui/icons-material/DirectionsRunOutlined';//health
import CheckroomOutlinedIcon from '@mui/icons-material/CheckroomOutlined'; //cloth
import Paper from '@mui/material/Paper';

import {openModal} from '../features/modalSlice'
import {changeTime} from '../features/timeSlice'

export default function HomeCard() {

  const dispatch=useDispatch();

  let transactions=useSelector((state)=>state.transactions.transactions);
  let TimeName=useSelector((state)=>state.time.timeName);
  
  const [transactionList,setList]=useState([]);

  const [listTitle,setListTitle]=useState('');



  // this week filter
  let thisWeek=transactions.filter((element) => {
    const from_date = moment().startOf('week').format('L');
    const to_date = moment().endOf('week').format('L');
  return element.createdAt>=from_date && element.createdAt <= to_date
});

  // last month filter
  let lastmonth=transactions.filter((element) => {
    const getMonth = moment(element.createdAt).format("MMMM")
    const lastMonth = moment(new Date()).subtract(1,"month").format("MMMM")
  return getMonth===lastMonth
});

// this year
  let thisYear=transactions.filter((element) => {
    const getYear = moment(element.createdAt).format("YYYY")
    const thisyear = moment(new Date()).format("YYYY")
  return getYear===thisyear
});



// check if this week or not
if(thisWeek.length!=0){
  transactions=thisWeek;
  dispatch(changeTime('This Week'))
}else{
  if(lastmonth.length!=0){
    transactions=lastmonth;
    dispatch(changeTime('Last Month'))
  }else{
    transactions=thisYear;
    dispatch(changeTime('This Year'))
  }
}

// console.log(thisYear.length)

// if(checkTitle==1){
//   setListTitle('This Week')
//   console.log(listTitle)
// }
  
  const filter_trans=transactions.slice(-10);


  // sort bychronological order.
  let sortTransactions=filter_trans.sort((a, b) =>b.id-a.id);
  sortTransactions=sortTransactions.sort((a, b) =>new Date(b.createdAt)- new Date(a.createdAt));
 
  let today = new Date(); 
  today=formatDate(today);

  let yesterday = new Date(Date.now() - 86400000);
  yesterday=formatDate(yesterday);

  function formatDate(date) {
    return [
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
      date.getFullYear()
    ].join('/');
  }


  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }



  let icon=null;

    return(

      <>



<Grid container justifyContent="center" lg={12} xs={12} style={{marginTop: '15px'}}>

<Grid item xs={12} md={10} lg={10} className="containerAddtransaction" style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  
<Typography  variant="h6" >
    {TimeName}
  </Typography>
  <Button onClick={()=>{dispatch(openModal())}}   className="addTransBtn"  variant="contained">Add Transaction</Button>

</Grid>

</Grid>

        <Grid container justifyContent="center"  className="transList"  xs={12} >
    
    
    

    <Grid item xs={12} md={10} lg={10}>
          
        
            {

              sortTransactions.length==0 ? 
              <>
              <Grid container justifyContent="center" style={{marginTop:'40px'}}  xs={12}>
                 <Typography className="nodata" variant="h6"  component="div" >
                 There is no data to show ! please add some data
                 </Typography>
              </Grid>

              <Grid container justifyContent="center" style={{marginTop:'40px'}}  xs={12}>
                  <img src="noData.svg" width="200"/>
              </Grid>
              </>
              :

              sortTransactions.map((trans)=>{
                let sign="";
                if(trans.currency=="USD"){
                   sign="$";
                }else{
                  sign="IQD-"      
                }

                // INCOME

                  if(trans.category=="salary"){icon=<BusinessCenterOutlinedIcon/>}
                  if(trans.category=="loan"){icon=<HandshakeOutlinedIcon/>}
                  if(trans.category=="gift"){icon=<CardGiftcardOutlinedIcon/>}

                                  // EXPENSE
                  if(trans.category=="tech"){icon=<SchoolOutlinedIcon/>}
                  if(trans.category=="food"){icon=<FastfoodOutlinedIcon/>}
                  if(trans.category=="bills"){icon=<DescriptionOutlinedIcon/>}
                  if(trans.category=="sports"){icon=<SportsEsportsOutlinedIcon/>}
                  if(trans.category=="health"){icon=<DirectionsRunOutlinedIcon/>}
                  if(trans.category=="cloths"){icon=<CheckroomOutlinedIcon/>}


                // for date convertion
                let transactionsDate='';
                if(trans.createdAt===today){
                  transactionsDate="Today";
                }else{
                  if(trans.createdAt==yesterday){
                    transactionsDate="Yesterday";
                  }else{
                    transactionsDate=trans.createdAt
                  }
                }

               return(
                <List key={trans.id} className="homeList">
                <ListItem
                  secondaryAction={
                    <Grid container>
                        <Button disabled style={{textTransform: "capitalize"}}>{transactionsDate}</Button>
                        <Button disabled className="listButton" variant="contained">{sign}{trans.amount}</Button>
                    </Grid>
                  }
                >
                  <ListItemAvatar>
                    <Avatar>
                     {icon}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText>{trans.note}</ListItemText>
                </ListItem>
            </List>
               );
              })
            }
        </Grid> 
    
    </Grid>

    </>
    );
    }