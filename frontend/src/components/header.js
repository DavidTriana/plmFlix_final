import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Toolbar, AppBar, Avatar} from '@mui/material';
import logoNetflix from "../images/logo.png"
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuItem, Menu } from '@mui/material'; 
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import Profile from './profile';


const PREFIX = 'header';

const classes = {
  root: `${PREFIX}-root`,
  logo: `${PREFIX}-logo`,
  transparent: `${PREFIX}-transparent`,
  avatar: `${PREFIX}-avatar`,
  toolbar: `${PREFIX}-toolbar`,
  item: `${PREFIX}-item`
};

const Root = styled('div')({
  
  [`& .${classes.root}`]: {
    backgroundColor: '#000',
    height: "50px",
    position: 'sticky',
    top: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
  },

  [`& .${classes.logo}`]: {
    width: '100px',
    cursor: 'pointer',
  },
  [`& .${classes.transparent}`]: {
    backgroundColor: 'transparent',
  },
  [`& .${classes.avatar}`]: {
    cursor:'pointer',
    marginRight: '5%',
    height: "55px",
    width: '55px',
  },
  [`& .${classes.toolbar}`]: {
    width: '100%',
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: '0px 15px 0px',
  },
  [`& .${classes.item}`]: {
    color: 'white',
  }
});


export default function Header(){

  const [show, setShow] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const { user,profile } = useParams();


  const abrirMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const opcion1Menu = () => {
    setAnchorEl(null);

    navigate(`/${user}/${profile}/configuration`);
  };

  const opcion2Menu = () => {
    setAnchorEl(null);

    navigate(`/login`);
  };

  const opcion3Menu = () => {
    setAnchorEl(null);

    navigate(`/${user}/${profile}/contact`);
  };

  const cerrarMenu = () => {
    setAnchorEl(null);
  };

  
  const hideHeader = () =>{
    if(window.scrollY < 15){
      setShow(false);
    }else{
      setShow(true);
    }
  }


  useEffect(() => {
    window.addEventListener("scroll", hideHeader);
    return () => window.removeEventListener("scroll", hideHeader);
  },[])


  return (
    <Root className={`${classes.root} ${!show && classes.transparent}`} elevation={0}>
      <div className={classes.toolbar}>
        <Link to="/login">
          <img src={logoNetflix} alt="logo Netflix" className={classes.logo} />
        </Link>

        <Avatar className={classes.avatar} onClick={abrirMenu}></Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={cerrarMenu}
          anchorOrigin={{ 
            vertical: 'top',
            horizontal: 'right', }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right', }} >
        <MenuItem onClick={opcion1Menu}>Configuración</MenuItem>
        <MenuItem onClick={opcion3Menu}>Contáctanos</MenuItem>
        <MenuItem onClick={opcion2Menu}>Cerrar sesión</MenuItem>
      </Menu>
      </div>
    </Root>
  );
}



