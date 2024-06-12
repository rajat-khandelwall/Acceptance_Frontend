import React from "react";
import { Typography } from "@mui/material";
import RecordedImage from "../Images/Calculator.jpg";

const ResponseRecorded = () => {
  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <img
        src={RecordedImage}
        alt="Response Recorded"
        style={{ maxWidth: "100%" }}
      />
      <div
        style={{
          position: "absolute",
          top: "5%",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            padding: "10px",
            border: "2px solid #000",
            borderRadius: "5px",
          }}
        >
          <h2
            style={{ fontFamily: "-moz-initial", margin: "0", padding: "5px" }}
          >
            Thanks, Your Response has been recorded
          </h2>
          <Typography
            style={{
              fontFamily: "-moz-initial",
              fontSize: "20px",
              margin: "0",
              padding: "5px",
            }}
          >
            Back to:{" "}
            <a href="/" style={{ textDecoration: "none", color: "#3f51b5" }}>
              Home Page
            </a>
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ResponseRecorded;
