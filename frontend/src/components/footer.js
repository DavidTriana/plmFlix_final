import * as React from "react";
import { styled } from '@mui/material/styles';
import { BottomNavigation } from "@mui/material";
import logoNetflix from "../images/logo.png";
import { Link } from "react-router-dom";

const PREFIX = 'footer';

const classes = {
  root: `${PREFIX}-root`,
  logo: `${PREFIX}-logo`,
  row: `${PREFIX}-row`,
  item: `${PREFIX}-item`
};

const Root = styled('div')({
  [`&.${classes.root}`]: {
    backgroundColor: "#000",
    width: "100%",
    height: "130px",
    position: "relative",
    bottom: 0,
    left: 0,
    right: 0,
    display: "grid",
    gridTemplateRows: "repeat(3,1fr)",
    gridGap: "5px",
  },

  [`& .${classes.logo}`]: {
    width: "100px",
    height: "auto",
    cursor: "pointer",
    marginTop: '30px',
  },

  [`& .${classes.row}`]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  [`& .${classes.item}`]: {
    marginLeft: '2rem',
    color: 'red',
  },
});

export default function Footer() {

  return (
    <Root className={classes.root}>
      <div className={classes.row}>
        <Link to="/login">
          <img src={logoNetflix} alt="logo Netflix" className={classes.logo} />
        </Link>
      </div>
      <div className={classes.row}>
        <Link to="/login" className={classes.item}>Términos y Aviso de privacidad</Link>
        <Link to="/login" className={classes.item}>Ayuda</Link>
        <Link to="/login" className={classes.item}>Acerca de nosotros</Link>
      </div>

      <div className={classes.row}>
        <p style={{color: 'grey'}}>©2022-2023, PLMIndustries.com,Inc. o sus filiales</p>
      </div>
    </Root>
  );
}
