
import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Toolbar, AppBar, Avatar} from '@mui/material';
import { Link } from 'react-router-dom';
import ReactPlayer from 'react-player';
import '../cssComponents/banner.css'
import { useState,useEffect } from 'react';
import axios from "axios";
import { getEndpoint } from "../pages/const/const";
import ViewFilms from './viewVideoDialog';
import Slide from '@mui/material/Slide';
import {Dialog} from '@mui/material';
import VideoPop from './videoPop';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PREFIX = 'banner';


const classes = {
  root: `${PREFIX}-root`,
  buttons: `${PREFIX}-buttons`,
  content: `${PREFIX}-content`
};

const Root = styled('div')({
    [`& .${classes.root}`]: {
      position: 'relative',
      width: '100%',
      height: '440px',
      objectFit: 'contain',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },

    [`& .${classes.buttons}`]: {
      "& button": {
        left: '75px',
        top: '300px',
        cursor: 'pointer',
        color: '#fff',
        fontWeight: 700,
        borderRadius: '5px', 
        padding: 'spacing(1,4,1,4)',
        marginRight: '1rem',
        backGroundColor: 'rgba(51,51,51,0.5)',
      } ,
      "& button:hover": {
        color: '#000',
        backGroundColor: '#e6e6e6',
      }, 
    },

    [`& .${classes.content}`]: {
      position: 'relative',
      left: '50px',
      top: '10px',
    },

    videoBack: {
      height: '440px',
      with: '100%',
      objectFit: 'cover',
    }

});

export default function Banner({categoriesList, user, perfil, reproducir}){
  const [videoUrl, setVideoUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [openV, setOpenV] = React.useState(false);
    /* funcion para poner video del banner*/

    function generateRandomNumber(List) {
      const randomNumber = Math.floor(Math.random() * Math.min(categoriesList.length, Number.MAX_SAFE_INTEGER));
      return randomNumber;
    }
  const randomIndex = generateRandomNumber(categoriesList);

    useEffect(() => {
      if (categoriesList.length > 0) {
        setVideoUrl(categoriesList[randomIndex].videos[0].videoUrl);
        setVideoId(categoriesList[randomIndex].videos[0]._id)
      }
    }, [categoriesList]);


     const clickReproducir = () => {
      reproducir(videoId);
    };
  
    const handleCloseV = () => {
      setOpenV(false);
    };

  return (
    <Root className="video-background"> 
    <div className={classes.videoBack}>
    <ReactPlayer
            url= {videoUrl} 
            playing
            muted
            width="100%"
            height="440px"
          />
    </div>
      <div className="video-overlay">
        <div className={classes.buttons}>
          <Button onClick={clickReproducir}>Play</Button>
        </div>
      </div>

      <div>
      <Dialog
        fullScreen
        open={openV}
        onClose={handleCloseV}
        TransitionComponent={Transition}
      >

        < ViewFilms user= {user} profiles={perfil} videoURL={videoUrl} setOpen={handleCloseV} />
      </Dialog>
      </div>
      
    </Root>
  );
}
