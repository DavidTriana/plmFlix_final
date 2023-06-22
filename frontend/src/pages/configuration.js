import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Alert, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from "react";
import {getEndpoint} from './const/const';
import { Divider } from '@mui/material';
import Profile from "../components/profile";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PREFIX = 'configuration';

const classes = {
  root: `${PREFIX}-root`,
  textField: `${PREFIX}-textField`,
  formContainer: `${PREFIX}-formContainer`,
  textoPrincipal: `${PREFIX}-textoPrincipal`,
  perfiles:`${PREFIX}-perfiles`,
  avatar:`${PREFIX}-avatar`,
  botonEliminar:`${PREFIX}-botonEliminar`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {

    backgroundColor: '#111',

    height: 'auto',
    width: '100vw',
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

  },
  [`& .${classes.textoPrincipal}`]: {
    marginTop: '10px',
    fontFamily: 'Verdana'
  },
  [`& .${classes.perfiles}`]: { 
    display: 'flex',
    alignItems: 'center' // alinea los componentes hijos en el centro del contendor
  },

  [`& .${classes.avatar}`]: {
    marginLeft: 0, padding: '10px'   
  },

  [`& .${classes.botonEliminar}`]: {
    margin: '0 auto'
  },

});

export default function Configuration() {


  const { user, profile } = useParams();

  const navigate = useNavigate();

  const [showError, setshowError] = React.useState(false);
  const [profilesList, setProfileList] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [contraActual, setContraActual] = useState('')
  const [contraNueva, setContraNueva] = useState('')
  const [nombrePerfil, setNombrePerfil] = useState('')


  useEffect(() => {


    axios.get(getEndpoint(`/${user}/profiles`))
    .then((response) => {
      setProfileList(response.data);
    });

  }, []);


    
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const actualizarNombre = () => {

    if(nuevoNombre != ''){

      const query = {username: nuevoNombre}
      axios.put(getEndpoint(`/${user}/profiles/change`), query)
      .then((response) => {

       navigate(`/${nuevoNombre}/${profile}/configuration`);
      });
    } 

  };

  const actualizarContraseña = () => {

    axios.get(getEndpoint(`/${user}/config`))
    .then((response) => {

      if(response.data.password==contraActual){
        
        const query = {password: contraNueva}
        axios.put(getEndpoint(`/${user}/config`), query)
        .then((response) => {  
          setshowError(false);
          setContraNueva("");
          setContraActual("");
        });
      }else{
        setshowError(true);
      }


    });
  };

  function borrar(perfil){
    //no se pued borrar el perfil si solo queda uno o si se quiere borrar en el que esta ahroa mismo

    if(profilesList.length>1 && perfil.name!==profile){

      axios.delete(getEndpoint(`/${user}/${perfil.name}`))
      .then((response) => {
  
        if(response.status === 200){
  
          setProfileList(profilesList.filter((pCopi) => pCopi._id !== perfil._id));
  
        }else{
          console.log("Fallo al intentar borrar perfil", perfil.name);
        }
      });

    }

  }

  function añadirPerfil(){

    axios.post(getEndpoint(`/${user}/config/${nombrePerfil}`))
    .then((response) => {

      setProfileList([...profilesList, response.data ]);
      setNombrePerfil("");
    });


  }

  const handleChangeNombre = (event) => {
    setNuevoNombre(event.target.value);
  };

  const handleChangePass = (event) => {
    setContraActual(event.target.value);
  }

  const handleChangePassNew = (event) => {
    setContraNueva(event.target.value);
  }


  const handleChangeNombrePerfil = (event) => {
    setNombrePerfil(event.target.value);
  }


  return (
    
    <Root className={classes.root}>


        <Box component="form" onSubmit={handleSubmit} noValidate className={classes.formContainer}>
          
        <Typography variant="h4" frontWeight = 'bold' color='white' style={{ fontFamily: 'Palatino', marginTop: '12px' }} className={classes.textoPrincipal}>Configuración de usuario</Typography>
        <br></br><br></br>

          <br></br>
          {
            showError &&  <Alert severity="error">Las contraseñas no coinciden</Alert>
          }
           <br></br>
          <Typography variant="h5" frontWeight = 'bold' style={{ fontFamily: 'Palatino' }} color='white'>Cambiar contraseña</Typography>
          <TextField label='Contraseña actual' type="password" className={classes.textField} margin="normal" fullWidth id="oldPassword" name="oldPassword" value={contraActual} onChange={handleChangePass}  />
          <TextField label='Nueva contraseña' type="password" className={classes.textField} margin="normal" fullWidth id="newPassword" name="newPassword"  value={contraNueva} onChange={handleChangePassNew} />
          
          <Button variant="contained" color="primary" fullWidth sx={{ width: '250px' }} onClick={() => actualizarContraseña()} type="submit">Cambiar contraseña</Button>

          <br></br><br></br>
          <Divider color="grey" variant="fullWidth" />
          <br></br><br></br>

          <Typography variant="h5" frontWeight = 'bold' style={{ fontFamily: 'Palatino' }} color='white'>Añadir perfil</Typography>

          <div className={classes.perfiles}>

          <TextField label='Nombre' type="text" className={classes.textField} margin="normal" fullWidth id="newProfile" name="newProfile"  value={nombrePerfil} onChange={handleChangeNombrePerfil} />


          <div className={classes.avatar}>
          
          </div>
          <div className={classes.botonEliminar}> 
          <Button variant="contained" color="primary" fullWidth type="submit" onClick={() => añadirPerfil()} > ✓</Button> 
          </div>

          </div>







          <br></br><br></br>
          <Divider color="grey" variant="fullWidth" />
          <br></br><br></br>

          <Typography variant="h5" frontWeight = 'bold' style={{ fontFamily: 'Palatino' }} color='white'>Eliminar perfiles</Typography>

          <br></br><br></br>
          {profilesList.map((perfil, index) => (

                <div className={classes.perfiles}>

                  <div className={classes.avatar}>
                  <Profile profile={perfil} />
                  </div>


                   <div className={classes.botonEliminar}> 
                   <Button variant="contained" color="primary" fullWidth type="submit" onClick={() => borrar(perfil)} >X</Button> 
                   </div>

                </div>



          ))}


        </Box>
    </Root>
  );
}