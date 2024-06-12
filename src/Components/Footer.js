import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        paddingTop: "10px",
        paddingBottom: "5px",
        backgroundColor: "rgb(103,1,59,255)",
        color: "white",
        fontFamily: "-moz-initial",
        textAlign: "center",
      }}
    >
      © {new Date().getFullYear()} VWITS. All rights reserved.
    </footer>
  );
};

export default Footer;
