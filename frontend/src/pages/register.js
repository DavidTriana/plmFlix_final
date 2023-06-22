import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Alert, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getEndpoint} from './const/const';
const PREFIX = 'login';

const classes = {
  root: `${PREFIX}-root`,
  textField: `${PREFIX}-textField`,
  formContainer: `${PREFIX}-formContainer`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    backgroundImage: 'url(https://fondosmil.com/fondo/57395.jpg)',
    backgroundSize: 'cover',
    backgroundColor: '#fff',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  [`& .${classes.textField}`]: {
    '& .MuiInputBase-input': {
      color: '#fff',
    },
    '& .MuiInputLabel-root': {
      color: '#fff',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#fff',
      },
    },
  },
  [`& .${classes.formContainer}`]: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.88)',
    padding: '2rem',
    borderRadius: '0.5rem',
    boxShadow: '0 0.5rem 1rem rgba(0, 0, 0, 0.9)'
  }
});

export default function Register() {

  const [showError, setshowError] = React.useState(false);

  const navigate = useNavigate();


    
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let payload = {
      user: data.get('username'),
      password: data.get('password'),
    }

    axios.post(getEndpoint('/register'), payload)
    .then((response)=> {
      navigate(`/${payload.user}/profiles`);
      console.log("Éxito al registrar usuario");
    })
    .catch((error)=>{

      setshowError(true);
      console.log("ERROR");
    
    });

  };

  const goToLogin = () => {
    navigate(`/login`);
  };

  return (
    <Root className={classes.root}>
      <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
      {
        showError &&
        <Alert severity="error">El nombre de usuario ya existe</Alert>
      }
        <Box component="form" onSubmit={handleSubmit} noValidate className={classes.formContainer}>
          <Typography variant="h4" frontWeight = 'bold' color='white'>Regístrate en PLMFlix</Typography>
          <TextField label='Nombre de usuario' className={classes.textField} margin="normal" fullWidth id="username" name="username" autoComplete="username" required autoFocus/>
          <TextField label='Contraseña' type="password" className={classes.textField} margin="normal" fullWidth id="password" name="password" required  />
          <Button variant="contained" color="primary" fullWidth type="submit">Registrarse</Button>
          <br></br><br></br>
          <Button variant="contained" color="primary" fullWidth onClick={goToLogin}>Volver a Iniciar sesión</Button>
        </Box>
      </Box>
    </Root>
  );
}