import * as React from "react";
import { styled } from "@mui/material/styles";
import Header from "../components/header";
import Footer from "../components/footer";
import ReactPlayer from "react-player";


const PREFIX = "viewFilms";

const classes = {
  root: `${PREFIX}-root`,
  container: `${PREFIX}-container`,
};

const Root = styled("div")({
  [`&.${classes.root}`]: {
    backgroundColor: "#111",
    width: "100%",
    height: "100%",
  },

  [`& .${classes.container}`]: {
    margin: "10px 10px 10px 10px",
  },
});

export default function ViewFilms() {
  return (
    <Root className={classes.root}>
      <Header />
      <div className="body">
        <Header />
        <div className="video-back">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=ws00k_lIQ9U"
            controls
            playing
            muted
            width="100%"
            height="100%"
          />
        </div>
        <Footer />
      </div>
      <Footer />
    </Root>
  );
}
