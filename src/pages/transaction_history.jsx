import {React,useState} from 'react'
import { useDispatch, useSelector } from "react-redux";
import Appbar from '../components/appbar'
import { Grid } from "@mui/material";
import FilledInput from '@mui/material/FilledInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';

// date
import {LocalizationProvider} from '@mui/lab'
import AdapterdateFns from '@mui/lab/AdapterDateFns'
import {Stack} from '@mui/material'
import {DatePicker} from '@mui/lab'

// filter category
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {filterTransaction} from '../features/transactions/transactionsSlice.js';
import TransactionsList from '../components/transactionHitoryList'


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const category = [
    "salary",
    "loan",
    "gift",
    "tech",
    "food",
    "bills",
    "sports",
    "health",
    "cloths"

];

function getStyles(name, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}


function Transaction_history() {
  const transactions=useSelector((state)=>state.transactions.transactions);
  const dispatch =useDispatch();
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setcategoryName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );


   
    let arr=[];
    arr.push(event.target.value);

    setListCategory(arr)

  };

 

  const [categoryName, setcategoryName] =useState([]);
  const [listCategory, setListCategory] =useState([
    
  ]);
  const [selectedDateFrom,setSelectedDateFrom]=useState(null);
  const [selectedDateTo,setSelectedDateTo]=useState(null);

  const [searchInput, setSearchInput] = useState('');
 
const handleSearch=(e)=>{
  let searchText=e.target.value
  setSearchInput(searchText)

}
// console.log(categoryName)

  return (
    <div>
       <Appbar text="Transaction History" />

        <div className="appContainer">

    <Grid container justifyContent="center" className="Searchbox" sm={12} lg={12} xs={12}>

    <Grid item md={10} lg={8} xs={11}  className="searchcont">

      <TextField 
                        value={searchInput}
                        onChange={handleSearch}
                       InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon className="searchIcon" />
                          </InputAdornment>
                        ),
                      }}
                      className="searchInput"
       id="filled-basic" fullWidth variant="filled" />
      <Button variant="contained" onClick={()=>{setSearchInput('')}} className="clearBtn">Clear</Button>
    </Grid>    
        </Grid>



  <Grid container justifyContent="center"  className="filterbox"  xs={12}>
          <Grid item  md={10} lg={10} xs={12} className="filterBg">

              

        <FilterAltOutlinedIcon style={{fontSize:'35px',color:'grey'}}  	sx={{ display: { xs: 'none', lg: 'block', md: 'block' } }}/>
      {/* category filter */}

      <FormControl sx={{ m: 1, width: 200 }} className="filterItem" >
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={categoryName}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={MenuProps}
        >
          {category.map((name) => (
            <MenuItem
              key={name}
              value={name}
              style={getStyles(name, categoryName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>


            
{/* from */}
     <LocalizationProvider dateAdapter={AdapterdateFns}>
        <Stack spacing={4} sx={{width:'250px'}} className="filterItem">
            <DatePicker
            label="From"
            renderInput={(params)=><TextField {...params} />}
            value={selectedDateFrom}
            onChange={(newValue)=>{setSelectedDateFrom(newValue)}}
            disableFuture
            />
        </Stack>
    </LocalizationProvider>

{/* to */}

<LocalizationProvider dateAdapter={AdapterdateFns}>
        <Stack spacing={4} sx={{width:'250px',marginLeft:'15px'}} className="filterItem">
            <DatePicker
            label="To"
            renderInput={(params)=><TextField {...params} />}
            value={selectedDateTo}
            maxDate={new Date()}
            onChange={(newValue)=>{setSelectedDateTo(newValue) 
              
            }}
            />
        </Stack>
    </LocalizationProvider>
    <Button 
          onClick={
            ()=>{
              setSelectedDateFrom(null);
              setSelectedDateTo(null);
              setcategoryName([])
              setListCategory([])
              // state as default
            }
          } 
          variant="contained" className="clearBtn   "
          >
            Clear
          </Button>


          </Grid>

        </Grid>


        <div>

          <TransactionsList  search={searchInput} category={listCategory} dateFrom={selectedDateFrom} dateTo={selectedDateTo} />

        </div>



        </div>
    </div>
  )
}

export default Transaction_history
