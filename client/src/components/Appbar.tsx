import React from "react";
import { AppBar, Toolbar, IconButton, Badge, Box, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { selectCorbComponents, selectSavedFilters } from "../Redux/baukastenSlice";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";


interface AppbarProps {
  handleDrawerToggle: () => void;
}

function Appbar({ handleDrawerToggle }: AppbarProps) {
  const components = useSelector(selectCorbComponents);
  const savedComponents = useSelector(selectSavedFilters);
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/corb');
  };

  const handleFilterClick = () => {
    navigate('/saved-filter');
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}> {/* Adjust typography variant and styles */}
         Buildlinx
        </Typography>
        <IconButton
          color="inherit"
          onClick={handleCartClick}
          sx={{ ml: 2 }}  // Adjust margin left
        >
          <Badge badgeContent={components.length} color="primary">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          onClick={handleFilterClick}
          sx={{ ml: 2 }}  // Adjust margin left
        >
          <Badge badgeContent={savedComponents.length} color="primary">
            <FilterListIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Appbar;
