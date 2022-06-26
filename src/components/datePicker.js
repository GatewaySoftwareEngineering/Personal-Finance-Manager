import {React,useState} from 'react'
import {LocalizationProvider} from '@mui/lab'
import AdapterdateFns from '@mui/lab/AdapterDateFns'
import {Stack,TextField} from '@mui/material'
import {DatePicker} from '@mui/lab'


function MuiDatePicker() {
    const [selectedDate,setSelectedDate]=useState(null);
    console.log(selectedDate)
  return (
    <LocalizationProvider dateAdapter={AdapterdateFns}>
        <Stack spacing={4} sx={{width:'250px'}}>
            <DatePicker
            label="date picker"
            renderInput={(params)=><TextField {...params} />}
            value={selectedDate}
            onChange={(newValue)=>{setSelectedDate(newValue)}}
            />
        </Stack>
    </LocalizationProvider>
  )
}

export default MuiDatePicker
