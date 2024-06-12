import React from "react";
import { AppBar, Typography, Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const NavigationBar = () => {
  const [updationsAnchorEl, setUpdationsAnchorEl] = React.useState(null);
  const [createAnchorEl, setCreateAnchorEl] = React.useState(null);

  const handleUpdationsClick = (event) => {
    setUpdationsAnchorEl(event.currentTarget);
  };

  const handleCreateClick = (event) => {
    setCreateAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setUpdationsAnchorEl(null);
    setCreateAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      style={{
        height: "40px",
        color: "white",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        fontFamily: "-moz-initial",
        backgroundColor: "rgb(103,1,59,255)",
      }}
    >
      <Link to="/" style={{ textDecoration: "none", marginRight: "10px" }}>
        <Button style={{ color: "white", fontFamily: "-moz-initial" }}>
          <Typography variant="body1" style={{ fontFamily: "-moz-initial" }}>
            Home
          </Typography>
        </Button>
      </Link>
      <Button
        aria-controls="create-menu"
        aria-haspopup="true"
        onClick={handleCreateClick}
        style={{ color: "white", fontFamily: "-moz-initial" }}
      >
        <Typography variant="body1" style={{ fontFamily: "-moz-initial" }}>
          Create
        </Typography>
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="create-menu"
        anchorEl={createAnchorEl}
        keepMounted
        open={Boolean(createAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/single-location" style={{ textDecoration: "none" }}>
            Single Location Create
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/multi-location" style={{ textDecoration: "none" }}>
            Multiple Location Create
          </Link>
        </MenuItem>
      </Menu>
      <Button
        aria-controls="updations-menu"
        aria-haspopup="true"
        onClick={handleUpdationsClick}
        style={{ color: "white", fontFamily: "-moz-initial" }}
      >
        <Typography variant="body1" style={{ fontFamily: "-moz-initial" }}>
          Updations
        </Typography>
        <ArrowDropDownIcon />
      </Button>
      <Menu
        id="updations-menu"
        anchorEl={updationsAnchorEl}
        keepMounted
        open={Boolean(updationsAnchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>
          <Link to="/single-location-update" style={{ textDecoration: "none" }}>
            Single Location Update
          </Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/multi-location-update" style={{ textDecoration: "none" }}>
            Multiple Location Update
          </Link>
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavigationBar;
