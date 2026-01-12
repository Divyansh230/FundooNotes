import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import RefreshIcon from "@mui/icons-material/Refresh";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import "./Header.css";

const Header = () => {
  return (
    <AppBar position="static" elevation={1} className="bg-white">
      <Toolbar className="d-flex align-items-center">

        {/* LEFT */}
        <Box className="d-flex align-items-center gap-2">
          <IconButton>
            <MenuIcon />
          </IconButton>

          <img
            src="https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png"
            alt="keep"
            className="keep-logo"
          />

          <h5 className="m-0 text-secondary fw-normal">Keep</h5>
        </Box>

        {/* CENTER SEARCH */}
        <Box className="search-container mx-auto d-flex align-items-center">
          <SearchIcon className="text-secondary" />
          <InputBase
            placeholder="Search"
            className="ms-2 w-100"
          />
        </Box>

        {/* RIGHT */}
        <Box className="d-flex align-items-center gap-3">
          <IconButton>
            <RefreshIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
          <IconButton>
            <AccountCircleIcon />
          </IconButton>
        </Box>

      </Toolbar>
    </AppBar>
  );
};

export default Header;
