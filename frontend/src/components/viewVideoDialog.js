import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ReactPlayer from "react-player";
import { Button } from "@mui/material";
import icon from "../images/flecha-correcta.png";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const PREFIX = "viewFilms";

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
  videoBack: `${PREFIX}-video-back`,
};

const Root = styled("div")({
  [`&.${classes.root}`]: {
    backgroundColor: "#111",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  [`& .${classes.container}`]: {
    margin: "10px",
  },

  [`& .${classes.videoBack}`]: {
    position: "relative",
    width: "100vw",
    height: "100vh",
    //paddingTop: "56.25%", // 16:9 aspect ratio (divided by width)
  },

  button: {
    height: '75px',
    width: '75px',
    left: '50px',
    top: '-670px',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 700,
    borderRadius: '50%', 
    backGroundColor: 'rgba(51,51,51,0.5)',
    display: 'block',
    transform: 'rotate(90deg)',
    opacity: 1,
    transition: "opacity 0.3s ease-in-out", 
  },

  [`& .${classes.button}:hover`]: {
    backgroundColor: "blue",
  },
});

export default function ViewFilms({user, profiles, videoURL, videoID, handleCloseV}) {
  const [showButton, setShowButton] = React.useState(true);
  const timerRef = React.useRef(null);


    const handleClosePage = () =>{
      handleCloseV();
    }

    const handleMouseMove = () => {
      setShowButton(true);
      clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        setShowButton(false);
      }, 3000)
    };
  return (
    <Root className={classes.root} onMouseMove={handleMouseMove}>
      <div className="body">
        <div className={classes.videoBack}>
          <ReactPlayer
            url={videoURL}
            playing
            controls
            width="100%"
            height="100%"
            style={{ position: 'absolute', top: 0, left: 0,}}
          />
        </div>
          {showButton && (
        <>
        <div className={classes.button} onClick={handleClosePage}>
            <Button>
              <img  src={icon} alt="Icon" height="50px" width="50px"/>
            </Button>
          </div>
        </>
        )}  
      </div>
    </Root>
  );
}
