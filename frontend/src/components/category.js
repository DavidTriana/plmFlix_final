import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { Container } from "@mui/system";
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import {Grid} from "@mui/material";
import NavigationIcon from '@mui/icons-material/Navigation';
import Films from "../components/films";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import axios from "axios";





const PREFIX = 'category';

const classes = {
    root: `${PREFIX}-root`,
    container: `${PREFIX}-container`,
    titulo: `${PREFIX}-titulo`,
    pelis: `${PREFIX}-pelis`
};

const Root = styled('div')({
    [`&.${classes.root}`]: {
        width: '100%',
        height: 'auto',
    },

    [`& .${classes.container}`]: {
      display: 'flex',
      maxHeight: '100%',
      maxWidth: '100vw',
      overflowX: 'auto',
      "& container::-webkit-scrollbar":{
        width: '0',
        margin: "10px",
    }
    },
    [`& .${classes.titulo}`]: {
        color: 'white',
        fontSize: '25px',
    },

    [`& .${classes.pelis}`]: {
        minWidth:'370px',
        height: '200px',
        lineHeight: '200px',
        marginRight: '15px',
    }
  });



export default function Categoria({click, nombrecategoria, listaPelis}) {

    function handleClick(film){
        click(film);  
      }

    return (
        <Root className={classes.root}>
            <div className={classes.titulo}>
                {nombrecategoria}
            </div>
            <div className={classes.container}>
            {listaPelis.map((peli , index) => (
                
                 <div className={classes.pelis}><Films click={handleClick} film={peli}  />
                 </div>
            ))}
            </div>
        </Root>
    );
}