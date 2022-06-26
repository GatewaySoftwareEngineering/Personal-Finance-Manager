import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from "react-router-dom";

export default function BasicList() {
 


  return (
    <Box>
      <nav aria-label="secondary mailbox folders">
        <List>
        <NavLink          
        className={({ isActive }) =>
        isActive ? 'activeStyle' : 'navlink'}
        to="/"
         >
          <ListItem className="listItem" disablePadding>
            <ListItemButton>
              <ListItemText primary="Overview" />
            </ListItemButton>
          </ListItem>
          </NavLink>

          <NavLink 
          className={({ isActive }) =>
          isActive ? 'activeStyle' : 'navlink'}
          to="/transaction_history"
          >
          <ListItem disablePadding>
            <ListItemButton component="a">
              <ListItemText primary="Transaction History" />
            </ListItemButton>
          </ListItem>
          </NavLink>
        </List>
      </nav>
    </Box>
  );
}
