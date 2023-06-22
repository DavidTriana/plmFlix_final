import * as React from 'react';
import { styled } from '@mui/material/styles';
import {Button, TextField, Typography} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {getEndPoint} from './const/const';
const PREFIX = 'principal';

const classes = {
  root: `${PREFIX}-root`,
  textfield: `${PREFIX}-textfield`,
  formContainer: `${PREFIX}-formContainer`
};

const Root = styled('p')({
  [`& .${classes.root}`]: {
    backgroundImage: 'url(https://assets.nflxext.com/ffe/siteui/vlv3/efb4855d-e702-43e5-9997-bba0154152e0/1844f11c-1c2c-453b-80d4-2287d580c455/ES-es-20230417-popsignuptwoweeks-perspective_alpha_website_medium.jpg)',
    backgroundSize: 'cover',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  [`& .${classes.textfield}`]: {
    '& .MuiInputBase-input':{
      color: 'white',
    },
    '& .MuiOutLinedInput-root .MuiOutlinedInput-notchedOutline': {
      borderColor: 'white',
    },
    '& .MuiOutLinedInput-root:hover .MuiOutlinedInput-notchedOutline':{
      borderColor: 'white',
    },
    '& .MuiOutLinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':{
      borderColor: 'white',
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

export default function Principal() {

  const [showError, setshowError] = React.useState(false);

  const navigate = useNavigate();


    


  return <Root>olaaaaaa</Root>;
}