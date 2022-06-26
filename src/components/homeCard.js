import { Grid } from "@mui/material";
// import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import moment from 'moment'

import { useState,useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";


export default function HomeCard() {
    const transactions=useSelector((state)=>state.transactions.transactions);

    let income=0;
    let expense=0;
    let sign="$";



    // income this month 
    let thisMonth=transactions.filter((element) => {
     const getMonth= moment(element.createdAt).format("MMMM");
     const thismonth = moment(new Date()).format("MMMM");
      return thismonth==getMonth
    });
   
// income and expense of this month 
   thisMonth.map((trans)=>{
      if(trans.typeT=="income"){
        income+=parseInt(trans.amount)
      }  
      if(trans.typeT=="expense"){
        expense+=parseInt(trans.amount)
      }  
    })


    let balance=income-expense;

    return(
        <Grid container style={{textAlign:'-webkit-center',marginTop:'15px'}} xs={12} lg={12}>
    
        <Grid item xs={12} lg={4} md={4}>
            <Card elevation={3} sx={{ maxWidth: 230}} className="homecard homecard1">
            <CardHeader
                style={{textAlignLast:'left'}}
                action={
                    <Chip label="details" />
                }
                title="Income"
                subheader={`${sign}${income}`}
            />
            </Card>
        </Grid>


        <Grid item xs={12} lg={4} md={4}>
            <Card elevation={3} sx={{ maxWidth: 230}} className="homecard homecard2">
            <CardHeader
             style={{textAlignLast:'left'}}
                action={
                    <Chip label="details" />
                }
                title="Balance"
                subheader={`${sign}${balance}`}
            />
            </Card>
        </Grid>


        <Grid item xs={12} lg={4} md={4}>
            <Card elevation={3} sx={{ maxWidth: 230}} className="homecard homecard3">
            <CardHeader
             style={{textAlignLast:'left'}}
                action={
                    <Chip label="details" />
                }
                title="Expense"
                subheader={`${sign}${expense}`}
            />
            </Card>
        </Grid>


        
    
    </Grid>
    );
    
    
    }