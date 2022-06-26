import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardSideBar from './cardsidebar'


export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <Grid  className="box">

      <Grid item xs={2} lg={2}>
        
            <CardSideBar/>
          
        </Grid>

       
      </Grid>
    </Box>
  );
}
