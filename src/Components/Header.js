import React from "react";
import { AppBar, Typography } from "@mui/material";
import companyLogo from "../Images/Vwits Logo.jpeg";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      style={{
        height: "50px",
        color: "white",
        alignItems: "center",
        flexDirection: "row",
        paddingRight: "20px",
        paddingLeft: "30px",
        fontFamily: "-moz-initial",
        backgroundColor: "rgb(103,1,59,255)",
      }}
    >
      <img
        src={companyLogo}
        alt="Company Logo"
        style={{ height: "30px", marginRight: "8px" }}
      />

      <Typography
        variant="h6"
        style={{
          flex: 1,
          color: "white",
          fontFamily: "-moz-initial",
        }}
      >
        <a href="/" style={{ textDecoration: "none", color: "white" }}>
          Acceptance Protocol Form Submission
        </a>
      </Typography>

      <Typography
        variant="h6"
        style={{
          color: "white",
          fontFamily: "-moz-initial",
          textDecoration: "none",
        }}
      >
        Volkswagen Group Technology Solutions India Pvt Ltd.
      </Typography>
    </AppBar>
  );
};
export default Header;
