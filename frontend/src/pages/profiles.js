import * as React from 'react';
import { styled } from '@mui/material/styles';
import Profile from "../components/profile";
import { createTheme, ThemeProvider  } from '@mui/material/styles';
import {Button, TextField, Typography, Avatar} from '@mui/material';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEndpoint } from "./const/const";
import axios from "axios";
import Header from "../components/header"
import Footer from "../components/footer";


const PREFIX = 'profiles';

const classes = {
  root: `${PREFIX}-root`,
  formContainer: `${PREFIX}-formContainer`,
  title: `${PREFIX}-title`,
  avatarContainer: `${PREFIX}-avatarContainer`
};

const Root = styled('div')({
  [`& .${classes.root}`]: {
    backgroundColor: 'black',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  [`& .${classes.formContainer}`]: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'column',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.9)',
    textAlign: 'center',
  },
  [`& .${classes.title}`]: {
    marginBottom: '1rem',
    color: 'white',
  },
  [`& .${classes.avatarContainer}`]: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2rem',
    gap: '20px' , 
  },
});


export default function Profiles() {


  const { user } = useParams();

  const navigate = useNavigate();
  const [profilesList, setProfilesList] = useState([]);

  const theme = createTheme();
  theme.typography.h3 = {
    color: 'white', 
    marginBottom: "40px",
    fontSize: '1.2rem',
    '@media (min-width:600px)': {
      fontSize: '7.5rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '2.4rem',
    },
  };

  //FUNCIONES

  function click(profile){
    navigate(`/${user}/${profile.name}/home`);
  }

  //CICLO DE VIDA DEL COMPONENTE

  useEffect(() => {

  axios.get(getEndpoint(`/${user}/profiles`))
  .then((response) => {

    //La peticion devuelve el array de perfiles del usuario indicado
    setProfilesList(response.data);   

  });

  }, []);  


  return (
    <Root className={classes.root}>
    <Header />
    
        
        <div className={classes.root}>
        <div className={classes.formContainer}>
            <ThemeProvider theme={theme}>
            <Typography variant="h3" className={classes.title}>
                ¿Que quieres ver? Elige tu perfil
            </Typography>
            </ThemeProvider>
            <div className={classes.avatarContainer}>

            {profilesList.map((profile , index) => (
                <Profile
                    profile={profile}
                    click={click}
                />

            ))}

            </div>
        </div>
        </div>
    <Footer />
    </Root>
  );
}
