import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import { getEndpoint } from "./const/const";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import forms from "../cssComponents/forms.css";
import contactStyle from "../cssComponents/contactStyle.css"

const PREFIX = "configuration";

const classes = {
  root: `${PREFIX}-root`,
  textField: `${PREFIX}-textField`,
  formContainer: `${PREFIX}-formContainer`,
  textoPrincipal: `${PREFIX}-textoPrincipal`,
  perfiles: `${PREFIX}-perfiles`,
  avatar: `${PREFIX}-avatar`,
  botonEliminar: `${PREFIX}-botonEliminar`,
};

const Root = styled("div")({
  [`&.${classes.root}`]: {
    backgroundColor: "#111",
    height: "100vh",
    width: "100vw",
  },
  [`& .${classes.textField}`]: {
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiInputLabel-root": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#fff",
      },
    },
  },
  [`& .${classes.formContainer}`]: {
    backgroundColor: "#111",
  },
  [`& .${classes.textoPrincipal}`]: {
    marginTop: "12px",
    fontFamily: "Verdana",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  [`& .${classes.perfiles}`]: {
    display: "flex",
    alignItems: "center", 
  },

  [`& .${classes.avatar}`]: {
    marginLeft: 0,
    padding: "10px",
  },

  [`& .${classes.botonEliminar}`]: {
    margin: "0 auto",
  },
});

export default function UserContact() {
  const { user, profile } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(getEndpoint(`/contact/${user}/${profile}/forms`))
      .then((response) => {
        const { formulariosResueltos, formulariosNoResueltos } = response.data;

        setResueltosList(formulariosResueltos);
        setNoResueltosList(formulariosNoResueltos);
      });
  }, []);

  const [email, setEmail] = useState("");
  const [asunto, setAsunto] = useState("");
  const [cuerpo, setCuerpo] = useState("");

  const [openDialog, setOpenDialog] = useState(false);
  const [resueltosList, setResueltosList] = useState([]);
  const [noResueltosList, setNoResueltosList] = useState([]);
  const [form, setForm] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleAsuntoChange = (event) => {
    setAsunto(event.target.value);
  };

  const handleCuerpoChange = (event) => {
    setCuerpo(event.target.value);
  };

  const volverHome = () => {
    navigate(`/${user}/${profile}/home`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let payload = {
      email: email,
      asunto: asunto,
      cuerpo: cuerpo,
      resuelto: false,
    };

    axios
      .post(getEndpoint(`/contact/${user}/${profile}`), payload)
      .then((response) => {
        alert("Formulario enviado correctamente");

        const newContact = response.data;

        setNoResueltosList([...noResueltosList, newContact]);

        setEmail("");
        setAsunto("");
        setCuerpo("");
      });
  };

  const handleClick = (elemento) => {
    setForm(elemento);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Root className={classes.root}>
      <div className="boxForm">
        <Box component="form" onSubmit={handleSubmit} className={{border: 'solid', borderColor: 'azure'}} noValidate>
          <div className="titulo">
            <Typography
              variant="h3"
              frontWeight="bold"
              color="white"
              className={classes.textoPrincipal}
            >
              Contacta con nosotros
            </Typography>
          </div>
          <br></br>
          <br></br>

          <Typography
            variant="h5"
            frontWeight="bold"
            style={{ fontFamily: "Palatino" }}
            color="white"
          >
            Escribe un mensaje de contacto
          </Typography>
          <TextField
            label="Email"
            value={email}
            onChange={handleEmailChange}
            className={classes.textField}
            margin="normal"
            fullWidth
            id="email"
            name="email"
          />
          <TextField
            label="Asunto"
            value={asunto}
            onChange={handleAsuntoChange}
            className={classes.textField}
            margin="normal"
            fullWidth
            id="asunto"
            name="asunto"
          />
          <TextField
            label="Cuerpo del mensaje"
            value={cuerpo}
            onChange={handleCuerpoChange}
            multiline
            rows={8}
            type="password"
            className={classes.textField}
            margin="normal"
            fullWidth
            id="cuerpo"
            name="cuerpo"
          />
          <Button variant="contained" color="primary" fullWidth type="submit">
            Enviar mensaje de contacto
          </Button>
        </Box>
      </div>

        <div className="contenedorForms">
          <div className="column">
            <div>
              <div className="divAux">
                <h1>Consultas no resueltas</h1>
                <div className="content">
                  <ul>
                    {noResueltosList.map((elemento, index) => (
                      <Box marginBottom={1}>
                        <Button
                          variant="contained"
                          onClick={() => handleClick(elemento)}
                        >
                          Asunto: {elemento.asunto}
                        </Button>
                      </Box>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="divAux">
              <h1>Consultas resueltas</h1>
              <div className="content">
                <ul>
                  {resueltosList.map((elemento, index) => (
                    <Box marginBottom={1}>
                      <Button
                        variant="contained"
                        onClick={() => handleClick(elemento)}
                      >
                        Asunto: {elemento.asunto}
                      </Button>
                    </Box>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>
              <Typography variant="h4">Formulario de Contacto</Typography>
            </DialogTitle>
            <DialogContent>
              {form && (
                <div>
                  <Typography variant="h6">Email: </Typography>
                  <Typography>{form.email}</Typography>
                  <Typography variant="h6">Asunto: </Typography>
                  <Typography>{form.asunto}</Typography>
                  <Typography variant="h6">Cuerpo: </Typography>
                  <Typography>{form.cuerpo}</Typography>

                  {form.resuelto && (
                    <Box>
                      <Typography variant="h6">
                        Respuesta del administrador:
                      </Typography>
                      <Typography>{form.respuesta}</Typography>
                    </Box>
                  )}
                </div>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cerrar</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div className="divBotonVolver">
            <Button
              variant="contained"
              onClick={volverHome}
              sx={{ marginTop: "50px", marginBottom: "50px" }}
            >
              Volver a Home
            </Button>
        </div>
    </Root>
  );
}
