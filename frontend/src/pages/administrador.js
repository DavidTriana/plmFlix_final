import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, Typography, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
import '../cssComponents/adminStyle.css';
import UserList from "../components/UserList";
import MovieList from "../components/MovieList";
import Slide from '@mui/material/Slide';
import { useParams } from "react-router-dom";


const PREFIX = 'administrador';

const classes = {
  root: `${PREFIX}-root`,
  textField: `${PREFIX}-textField`,
  formContainer: `${PREFIX}-formContainer`,
  textoPrincipal: `${PREFIX}-textoPrincipal`,
  fullHeight: `${PREFIX}-fullHeight`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    //backgroundImage: 'url(https://www.ribescasals.com/media/catalog/product/cache/ac95d467f39086acf44821b87fe7ae41/t/e/tela-loneta-negra.jpg)',
    backgroundSize: 'cover',
    backgroundColor: '#111',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  [`&.${classes.textField}`]: {
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
    },
    '&.MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
    },
  },
  [`& .${classes.formContainer}`]: {
    

  },
  [`& .${classes.textoPrincipal}`]: {
    
    marginTop: '10px',
    fontFamily: 'Verdana',
  },
  [`& .${classes.fullHeight}`]: {
    
    height: '100%',
    color: '#111',
  }
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Administrador() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate(`/login`);
  };

  const goToFormContacto = () => {
    navigate(`/administrador/forms`);
  };

  return (

    <Root className={classes.root}>

        

      <Box component="form" noValidate className={classes.formContainer}>
        <div>
        <Typography variant="h4" color='white' style={{ fontFamily: 'Palatino', marginTop: '20px'}} className={classes.textoPrincipal}>Página del administrador</Typography>
        <br></br><br></br>
          <Divider color="grey" variant="fullWidth" />

          <UserList />
          
          <br></br><br></br>
          <Divider color="grey" variant="fullWidth" />

          <MovieList />
         

        </div>
        <br></br><br></br><br></br>
        <Button variant="contained" color="primary" className={classes.botonVolver} fullWidth sx={{ width: '100px', marginBottom: '10%' }} onClick={goToLogin}>Volver</Button>
        <Button variant="contained" color="primary" className={classes.botonFormContacto} sx={{ marginBottom: '10%', marginLeft: '5%' }} onClick={goToFormContacto}>Ver formularios de contacto</Button>
      </Box>
    </Root>
  );
}


