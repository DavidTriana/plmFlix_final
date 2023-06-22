import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography, Alert, Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import '../cssComponents/adminStyle.css';
import { getEndpoint } from '../pages/const/const';
import { Dialog, DialogTitle, DialogContent, DialogActions, Grid } from '@mui/material';


export default function UserList() {

    const [users, setUsers] = useState([]);

    const handleDeleteUser = (userId) => {

      axios.delete(getEndpoint(`/administrador/users/${userId}`))
        .then((response) => {
          console.log('Usuario eliminado:', response.data);
          setUsers(users.filter((user) => user._id !== userId));
        })
        .catch((error) => {
          console.error('Error al eliminar el usuario:', error);
        });
    };

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const [open, setOpen] = useState(false);

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleOpenDialog = () => {
        setOpen(true);
    };
    
      const handleCloseDialog = () => {
        setOpen(false);
    };


    const handleCreateUser = () => {
        let payload = {
            username: username,
            password: password,
        };


    axios.post(getEndpoint('/administrador/users'), payload)
    .then((response)=> {
      console.log("Éxito al registrar usuario");

      setUsers([...users, response.data]);
    })
    .catch((error)=>{

      console.log("ERROR AL REGISTRAR USUARIO");
    
    });

        handleCloseDialog();
    }
      
    useEffect(() => {
      axios.get(getEndpoint('/administrador/users'))
      .then((response)=>{
      setUsers(response.data);
     });
        }, []);
      
        return (
          <div>
              <Typography variant="h5" frontWeight = 'bold' style={{ fontFamily: 'Palatino' }} color='white'>Eliminar usuario de la aplicacion</Typography>
            
            {users.map((user) => (
              <Box key={user._id} marginBottom={1}>
                <Button variant="outlined" onClick={() => handleDeleteUser(user._id)} >
                  {user.username}
                </Button>
              </Box>
            ))}

          <div>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>Crear nuevo usuario</Button>

            <Dialog open={open} onClose={handleCloseDialog}>

                <DialogTitle>Crear nuevo usuario</DialogTitle>

                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField label="Username" fullWidth value={username} onChange={handleUsernameChange} />
                        </Grid>

                        <Grid item xs={12}>
                        <TextField label="Password" fullWidth type="password" value={password} onChange={handlePasswordChange} />
                        </Grid>

                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button onClick={handleCloseDialog}>Cancelar</Button>
                    <Button onClick={handleCreateUser} color="primary">Continuar</Button>
                </DialogActions>

            </Dialog>
           </div>
           
          </div>
        );

}