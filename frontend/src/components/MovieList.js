import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Alert, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../cssComponents/adminStyle.css';
import { getEndpoint } from '../pages/const/const';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';



export default function MovieList() {

    const [movies, setMovies] = useState([]);

    const handleDeleteMovie = (movieId) => {

      axios.delete(getEndpoint(`/administrador/movies/${movieId}`))
        .then((response) => {

          setMovies(movies.filter((movie) => movie._id !== movieId));
        })
        .catch((error) => {
          console.error('Error al eliminar la película:', error);
        });
    };
      
        useEffect(() => {
          axios.get(getEndpoint('/administrador/movies'))
          .then((response)=>{
            setMovies(response.data);
          });

          console.log("problemas");
        }, []);

        const [videoUrl, setVideoUrl] = useState('');
        const [likes, setLikes] = useState('');
        const [categorie, setCategorie] = useState('');
    
        const [open, setOpen] = useState(false);
        const handleVideoUrlChange = (event) => {
          setVideoUrl(event.target.value);
      };
  
      const handleLikesChange = (event) => {
          const value = event.target.value;
          if (!isNaN(value)) {
              setLikes(value);
          } else {
              setLikes(0);
          }
      };
      
      const handleCategorieChange = (event) => {
          setCategorie(event.target.value);
      };
  
      const handleOpenDialog = () => {
          setOpen(true);
      };
      
        const handleCloseDialog = () => {
          setOpen(false);
      };
  
      const handleCreateMovie = () => {
  
          let payload = {
  
              videoUrl: videoUrl,
              likes: likes,
              categorie: categorie,
          };
  
          axios.post(getEndpoint('/administrador/movies'), payload)
          .then((response)=> {
            console.log("Éxito al crear pelicula");

            setMovies([...movies, response.data]);
          })
          .catch((error)=>{
       
            console.log("ERROR AL REGISTRAR PELICULA");
          
          });
          handleCloseDialog();
      };
      
        return (
          <div>
              <Typography variant="h5" frontWeight = 'bold' style={{ fontFamily: 'Palatino' }} color='white'>Eliminar pelicula de la aplicacion</Typography>
            
            {movies.map((movie) => (
              <Box key={movie._id} marginBottom={1}>
                <Button variant="outlined" onClick={() => handleDeleteMovie(movie._id)} >
                  {movie.title}
                </Button>
              </Box>
            ))}

          <div>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>Crear nueva pelicula</Button>

            <Dialog open={open} onClose={handleCloseDialog}>

                <DialogTitle>Crear nueva pelicula</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>

                        <Grid item xs={12}>
                        <TextField label="URL del video" fullWidth value={videoUrl} onChange={handleVideoUrlChange} />
                        </Grid>

                        <Grid item xs={12}>
                        <TextField label="Likes" fullWidth value={likes} type="number" onChange={handleLikesChange} />
                        </Grid>

                        <Grid item xs={12}>
                        <TextField label="Categoría" fullWidth value={categorie} onChange={handleCategorieChange} />
                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleCreateMovie} color="primary">Continuar</Button>
                </DialogActions>

            </Dialog>
          </div>
           
          </div>
        );

}