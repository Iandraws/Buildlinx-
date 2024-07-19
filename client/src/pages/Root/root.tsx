import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Appbar from '../../components/Appbar';
import DrawerComponent from '../../components/Drawer';
import { Box, CssBaseline, Toolbar, useMediaQuery, useTheme, styled } from '@mui/material';

const drawerWidth = 240;

const MainContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: `-${drawerWidth}px`,
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up('md')]: {
    marginLeft: 0,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function Root() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(!isMobile);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar handleDrawerToggle={handleDrawerToggle} />
      <DrawerComponent drawerWidth={drawerWidth} open={open} handleDrawerToggle={handleDrawerToggle} />
      <MainContent>
        <Toolbar />
        <Outlet />
      </MainContent>
    </Box>
  );
}

export default Root;
