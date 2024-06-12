import React from "react";
import wallpaper from "../Images/Skoda.png";

const Home = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={wallpaper}
        alt="Wallpaper"
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
          objectFit: "cover",
          marginBottom: "-4px",
        }}
      />
    </div>
  );
};

export default Home;
