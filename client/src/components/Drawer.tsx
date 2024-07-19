import React from 'react';
import { Drawer, Toolbar, Divider, IconButton, useMediaQuery, useTheme } from '@mui/material';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import HeatPumpIcon from '@mui/icons-material/HeatPump';
import VideogameAssetIcon from '@mui/icons-material/VideogameAsset';
import HvacIcon from '@mui/icons-material/Hvac';
import { useNavigate } from 'react-router-dom';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

interface DrawerProps {
  drawerWidth: number;
  open: boolean;
  handleDrawerToggle: () => void;
}

function DrawerComponent({ drawerWidth, open, handleDrawerToggle }: DrawerProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant={isMobile ? 'temporary' : 'persistent'}
      anchor="left"
      open={open}
      onClose={handleDrawerToggle}
    >
      <Toolbar>
        {(
          <IconButton onClick={handleDrawerToggle}>
            <ChevronLeftIcon />
          </IconButton>
        )}
      </Toolbar>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/pumpen')}>
            <ListItemIcon>
              <HeatPumpIcon />
            </ListItemIcon>
            <ListItemText primary="pumps" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/controller')}>
            <ListItemIcon>
              <VideogameAssetIcon />
            </ListItemIcon>
            <ListItemText primary="controller" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton onClick={() => navigate('/Ventil')}>
            <ListItemIcon>
              <HvacIcon />
            </ListItemIcon>
            <ListItemText primary="Ventil" />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default DrawerComponent;
