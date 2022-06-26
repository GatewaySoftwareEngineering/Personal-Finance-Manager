import { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
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
// pagination
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import usePagination from "./pagination";

export default function TransactionHistoryList(props) {

let data=useSelector((state)=>state.transactions.transactions);





  let categoryListFilter=[]
  const d=props.category.join(',')
  let arr=d.split(',')
  for(var i = 0; i < arr.length; i++){
    categoryListFilter.push(arr[i])
  }

  let datefrom;
  let dateto;
 if(props.dateFrom===null && props.dateTo===null){
  datefrom=''
  dateto=''
 }
 if(props.dateFrom!==null && props.dateTo!==null){
  dateto=formatDate(props.dateTo)
  datefrom=formatDate(props.dateFrom)

  data=data.filter((el)=>{
    return el.createdAt >= datefrom && el.createdAt <= dateto
  })

 }


// filter category
if(categoryListFilter[0]!=''){
  data = data.filter((el) => {
    return categoryListFilter.some((f) => {
      return f === el.category;
    });
  });
}


// filter search
data=data.filter(job => 
  (job.note.toLowerCase().includes(props.search) || job.amount.toString().includes(props.search))
  );

const filter_trans=data.slice();
// sort bychronological order.
let sortTransactions=filter_trans.sort((a, b) =>b.id-a.id);
sortTransactions=sortTransactions.sort((a, b) =>new Date(b.createdAt)- new Date(a.createdAt));

// console.log(sortTransactions)

  let [page, setPage] = useState(1);
  const PER_PAGE = 10;

  const count = Math.ceil(sortTransactions.length / PER_PAGE);
  const _DATA = usePagination(sortTransactions, PER_PAGE);


  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  let transactionList=_DATA.currentData();



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

// console.log(today)
  
  function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
  }
  let icon=null;

    return(
      <>
        <Grid container justifyContent="center" className="transList"  xs={12}>
    <Grid item xs={12} md={10} lg={10} className="historyList">
 
            {

             transactionList.length==0 ? 
             
             <>
             <Grid container justifyContent="center" style={{marginTop:'40px'}}  xs={12}>
                <Typography className="nodata" variant="h6"  component="div" >
                There is no data to found
                </Typography>
             </Grid>

             <Grid container justifyContent="center" style={{marginTop:'40px'}}  xs={12}>
                 <img src="notFound.svg" width="230"/>
             </Grid>
             </>
             
             :

              transactionList.map((trans)=>{
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
                if(trans.createdAt==today){
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
    
    <Stack spacing={2} style={{marginTop:'30px'}}>
      <Pagination 
                count={count}
                size="large"
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChange}
      />
    </Stack>

</>

    );
    }