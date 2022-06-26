import {React,useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
import { ThemeProvider, createTheme } from '@mui/material/styles';

import CardSidebar from './cardsidebar';



const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#F7F4F3',
    },
  },
});

export default function EnableColorOnDarkAppBar(props) {

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Stack  sx={{ flexGrow: 1 }}>

<SwipeableDrawer
            anchor={"left"}
            open={openDrawer}
            onClose={()=>setOpenDrawer(false)}
            onOpen={()=>setOpenDrawer(false)}
          >

          <CardSidebar/>
</SwipeableDrawer>


      <ThemeProvider theme={darkTheme}>
        <AppBar className="appbar" position="static" color="primary" enableColorOnDark>
          
        <Toolbar>
        <IconButton onClick={()=>setOpenDrawer(true)} edge="start" color="inherit" aria-label="menu" sx={{ mr: 2,display: { xs: 'block', lg: 'none', xl: 'block' } }}>
      <MenuIcon />
    </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {props.text}
      </Typography>
    </Toolbar>
          
        </AppBar>
      </ThemeProvider>
    </Stack>
  );
}
