import {React,useState,useEffect} from 'react'
import moment from 'moment'
// import Sidebar from '../components/sidebar'
import { Grid } from "@mui/material";
import Button from '@mui/material/Button';
import Appbar from '../components/appbar'
import HomeCard from '../components/homeCard'
import TransactionsList from '../components/transactionsList'
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

import {useDispatch,useSelector} from 'react-redux'
import {addTransactions} from '../features/transactions/transactionsSlice.js';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputAdornment from '@mui/material/InputAdornment';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
// date
import {LocalizationProvider} from '@mui/lab'
import AdapterdateFns from '@mui/lab/AdapterDateFns'
import {Stack} from '@mui/material'
import {DatePicker} from '@mui/lab'
// radio
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
// close modal
import {closeModal} from '../features/modalSlice'

// bootstrap dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


function Overview() {
  const dispatch =useDispatch();
  const [category, setCategory] =useState('');
  const [amount, setAmount] =useState('');
  const [type, setType] =useState('');
  const [selectedDateFrom,setSelectedDateFrom]=useState(null);
  const [note,setNote]=useState('');
  const [open, setOpen] =useState(false);
  const transactions=useSelector((state)=>state.transactions.transactions);
  const isOpen=useSelector((state)=>state.modal.isOpen);
 // Create state for form values:
let errors={
  'type':'',
  'category':'',
  'date':'',
  'amount':'',
  'note':'',
}

const [categoryErr,setcategoryErr]=useState(false)
const [typeErr,settypeErr]=useState(false)
const [dateErr,setdateErr]=useState(false)
const [amountErr,setamountErr]=useState(false)
const [noteErr,setnoteErr]=useState(false)
const [err,setErr]= useState(errors)

// type income
  const [changecategory,setchangecategory] =useState([]);

  // by selecting type , category list changed
  const income=['salary','loan','gift'];
  const expense=['tech','food','bills','sports','health','cloths'];

  const [warningCategory,setwarningCategory] =useState(true);
  

// catgory
  const handleChange = (event) => {
    setCategory(event.target.value);
    setErr(prev=>({
      ...prev,
      category:''
    }))
    // console.log(event.target.value)
    // alert("jashdjh")
  };



  // note
  const handleChangeNote = (event) => {
    setNote(event.target.value);
    setErr(prev=>({
      ...prev,
      note:''
    }))
    // console.log(event.target.value)
  };

  // amount
  const handleAmount = (e) => {

    if(isNaN(e.target.value)){
      setAmount(0);
    }else{

    if (Number(e.target.value) <0 || e.target.value=='-') {
      setAmount(0);
    }else{
      setAmount(e.target.value);
      setErr(prev=>({
        ...prev,
        amount:''
      }))
      // console.log(e.target.value)
    }

  }
  };

// type
  const handleType=(e)=>{
    setType(e.target.value)
    if(e.target.value=='income'){
      setchangecategory(income)
      setwarningCategory(false) 
      setErr(prev=>({
        ...prev,
        type:''
      }))
    }
    if(e.target.value=='expense'){
      setchangecategory(expense)
      setwarningCategory(false) 
      setErr(prev=>({
        ...prev,
        type:''
      }))
    }
  }

  // date

  const handleDate=(value)=>{
    setSelectedDateFrom(value)
    // const newDate=formatDate(selectedDateFrom)
    setErr(prev=>({
      ...prev,
      date:''
    }))
  }


  // change date to new date
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
 

  // add transactions button
  const addTransaction=(e) => {
    e.preventDefault();

  // validation check
    if(category=='' && type=='' && selectedDateFrom==null && amount=='' && note==''){
      setErr(prev=>({
        'type':'please select one',
        'category':'please choose one',
        'date':'required',
        'amount':'required',
        'note':'enter your note',
      }))

     err.category=='' ? setcategoryErr(true): setcategoryErr(false); 
     err.type=='' ? settypeErr(true): settypeErr(false); 
     err.selectedDateFrom=='' ? setdateErr(true): setdateErr(false); 
     err.amount=='' ? setamountErr(true): setamountErr(false); 
     err.note=='' ? setnoteErr(true): setnoteErr(false); 
      
    }else{

    if(category=='' || type=='' || selectedDateFrom==null || amount=='' || note==''){
      setErr(prev=>({
        'type':type=='' ? 'please select one' :'',
        'category':category=='' ? 'please choose one' :'',
        'date':selectedDateFrom==null ? 'required' :'',
        'amount':amount=='' ? 'required' : '',
        'note':note=='' ? 'enter your note' :'',
      }))
      err.category=='' ? setcategoryErr(true): setcategoryErr(false); 
      err.type=='' ? settypeErr(true): settypeErr(false); 
      err.selectedDateFrom=='' ? setdateErr(true): setdateErr(false); 
      err.amount=='' ? setamountErr(true): setamountErr(false); 
      err.note=='' ? setnoteErr(true): setnoteErr(false); 
    }else{

      
      let newDate=formatDate(selectedDateFrom);
      let newId=1;

      if(transactions.length!=0){
        let lastId=transactions[transactions.length-1].id;
        newId=lastId+1
      }

      dispatch(addTransactions({
        id:newId,
        note:note,
        category:category,
        createdAt:newDate,
        typeT:type,
        amount:amount,
        currency: "USD"
      }))
  

      // add data to localstorage
      var existing = localStorage.getItem('transactions_list');
      const items = JSON.parse(localStorage.getItem("transactions_list"));
      const data={
        id:newId,
        note:note,
        category:category,
        createdAt:newDate,
        typeT:type,
        amount:amount,
        currency: "USD"
      }
      // If no existing data, create an array
      // Otherwise, convert the localStorage string to an array
      existing = existing ?
      [
        ...items,
           data
      ]
       :[data];
      localStorage.setItem("transactions_list", JSON.stringify(existing));

      dispatch(closeModal())
      setCategory('')
      setAmount('')
      setSelectedDateFrom(null)
      setType('')
      setNote('')
      setchangecategory([])
      setErr([])
    }
  }
  }

    // dismiss button
    const handleClose = () => {
      dispatch(closeModal())
      setCategory('')
      setAmount('')
      setSelectedDateFrom(null)
      setType('')
      setNote('')
      setchangecategory([])
      setErr([])
  
    };


    const onSubmit = async (data) => {
      setNote(data.name);
    };


    const [openDrawer, setOpenDrawer] = useState(false);

  return (
  
  <div>
    <Appbar text="Overview" />
    <div className="appContainer">
      <HomeCard/>
      <TransactionsList open={setOpen}/>
    </div>


  {/* Add transactions Dialog */}
    <BootstrapDialog
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={isOpen}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Add Transaction
        </BootstrapDialogTitle>

    <form noValidate onSubmit={addTransaction}>
        <DialogContent dividers>

              <div style={{display:'flex'}}>
              <FormControl sx={{ minWidth: 220 ,mr: 5}} >
              <InputLabel id="demo-select-small">Category</InputLabel>
              <Select
                name="category"
                labelId="demo-select-small"
                id="demo-select-small"
                value={category}
                label="Category"
                onChange={handleChange}
              
              >
                
                {
                  warningCategory==true ?                 
                  <MenuItem disabled  value="">
                  <em>Please Select Type First</em>
                </MenuItem>
                : 
                changecategory.map((cat)=>{
                  return(
                    
                    <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                  );
                })

                }
              </Select>
              <FormHelperText>{err.category}</FormHelperText>
            </FormControl>


            <LocalizationProvider dateAdapter={AdapterdateFns}>
              <Stack spacing={4} sx={{width:'250px'}}>
                  <DatePicker
            
                  label="date"
                  renderInput={(params)=><TextField helperText={err.date} name="date" {...params} />}
                  value={selectedDateFrom}
                  onChange={handleDate}
                  />
                  <FormHelperText style={{}}></FormHelperText>
              </Stack>
           </LocalizationProvider>

           <TextField 
                        // error={!!errors?.amount}
                        helperText={err.amount}
                     name="amount"
                        onChange={handleAmount}
                        value={amount}
                        label="Amount"
                        sx={{ml:5}}
                       InputProps={{
                        inputProps: { min: "0", max: "10", step: "1" },               
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyOutlinedIcon className="dolarIcon" />
                          </InputAdornment>
                        ),
                      }}
                    id="filled-basic"  variant="outlined" />
                   

              </div>


      <div style={{marginTop:'40px',display:'flex'}}>
      <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">Type</FormLabel>
          <RadioGroup                      
            onChange={handleType}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="type"
          >
            <FormControlLabel value="income" control={<Radio />} label="Income" />
            <FormControlLabel value="expense" control={<Radio />} label="Expense" />
          </RadioGroup>
          <FormHelperText>{err.type}</FormHelperText>
    </FormControl>

            
    <TextField  
    helperText={err.note}   
      name="note"
      label="Note"
      multiline
      onChange={handleChangeNote}
      rows={5}
      rowsMax={15}
      inputProps={{
        maxlength: 350
      }}
      
      sx={{ml:5,width: '68ch'}}
      id="filled-basic"  variant="outlined" 
      />


      </div>

        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Dismiss
          </Button> 
          <Button type="submit" className="addTransBtn" variant="contained">Add Transaction</Button>
        </DialogActions>
  </form>

</BootstrapDialog>
    </div>
  )
}

export default Overview
