import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import SideBarLink from '../components/sidebarLink'


// const bull = (
//   <Box
//     component="span"
//     sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//   >
//     •
//   </Box>
// );

const card = (
  <React.Fragment>
    <CardContent style={{padding: '0px'}}>
      <div className="sidebarTitle" style={{fontSize: '24px',textAlign: 'center',color: "#EF2A4C",transform:"translate(-6px,10px)"}}>
      <MonetizationOnOutlinedIcon sx={{color: "#EF2A4C",fontSize:"28px",transform:"translate(0px,7px)"}} /> Finance Manager
      </div>
    </CardContent>
    <CardActions className="sidebar-links">
      <SideBarLink/>
    </CardActions>
  </React.Fragment>
);

export default function OutlinedCard() {
  return (
    <>
      <Card className="cardsidebar" variant="outlined">{card}</Card>
      </>
  );
}
