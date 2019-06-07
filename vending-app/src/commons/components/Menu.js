import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import LayersIcon from '@material-ui/icons/Layers';
import {Link} from 'react-router-dom';

export const menuListItems = (
    <div>
      <ListItem  {...{ to: "/money" }} component={Link} button={true}>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Vending Machine"/>
      </ListItem>
      <ListItem  {...{ to: "/admindashboard" }} component={Link} button={true}>
        <ListItemIcon>
          <LayersIcon />
        </ListItemIcon>
        <ListItemText primary="Admin Dashboard" />
      </ListItem>
    </div>
  );