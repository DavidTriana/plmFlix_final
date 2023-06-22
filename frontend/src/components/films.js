import React from 'react'
import { styled } from '@mui/material/styles';
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

export default function Films({click, film}) {

  /* film.name para el nombre del video */
  /* film.url para el link del video */

  const navigate = useNavigate();
  const { user, profile } = useParams();

  function handleClick(film){
    click(film);  
  }

  return (
    <Card onClick={() => handleClick(film._id)}>
      <CardMedia
        component="img"
        height="140"
        image={film.thumbnailUrl}
        alt="Descripción de la imagen"
      />
    </Card>
  );
}

