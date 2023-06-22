import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, TextField, Typography, Alert, Box, Grid } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import forms from "../cssComponents/forms.css";
import { useState } from "react";
import { getEndpoint } from "./const/const";


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
    backgroundColor: "#000",
    height: "80vh",
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function Forms() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resueltosList, setResueltosList] = useState([]);
  const [noResueltosList, setNoResueltosList] = useState([]);
  const [form, setForm] = useState("");

  const [respuestaAdmin, setRespuestaAdmin] = useState("");

  const navigate = useNavigate();

  const handleRespuestaAdminChange = (event) => {
    setRespuestaAdmin(event.target.value);
  };

  useEffect(() => {
    axios.get(getEndpoint(`/contact/forms/administrador`)).then((response) => {
      setResueltosList(response.data.formulariosResueltos);
      setNoResueltosList(response.data.formulariosNoResueltos);

    });
  }, []);

  const handleClick = (elemento) => {
    setForm(elemento);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRespuestaAdmin("");
  };

  const volverAdmin = () => {
    navigate(`/administrador`);
  };

  const handleResolverConsulta = (idForm) => {
    setOpenDialog(false);

    let payload = {
      respuesta: respuestaAdmin,
    };

    axios.put(getEndpoint(`/contact/forms/administrador/${idForm}`), payload)
      .then((response) => {
        const updatedNoResueltosList = noResueltosList.filter(
          (elemento) => elemento._id !== idForm
        );

        const formActualizado = {
          ...form,
          respuesta: respuestaAdmin,
          resuelto: true,
        };

        setResueltosList([...resueltosList, formActualizado]);

        setNoResueltosList(updatedNoResueltosList);
        setForm(formActualizado);

        setRespuestaAdmin("");
      });

    setRespuestaAdmin("");
  };

  return (
    <Root className={classes.root}>
        <div className="divTitulo">
          <Typography variant="h3" style={{ color: "#fff", margin: "auto" }}>
            FORMULARIOS DE CONTACTO
          </Typography>
        </div>
        <div className="container">
          <div className="column">
            <div className="divAux">
              <h1>Consultas no resueltas</h1>
            </div>
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

        <div className="column">
          <div className="divAux">
            <h1>Consultas resueltas</h1>
            </div>
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

                {!form.resuelto && (
                  <Box>
                    <Typography variant="h6">
                      Respuesta del administrador:
                    </Typography>
                    <TextField
                      label="Respuesta del Administrador"
                      value={respuestaAdmin}
                      multiline
                      maxRows={8}
                      onChange={handleRespuestaAdminChange}
                      className={classes.textField}
                      margin="normal"
                      fullWidth
                      id="respuestaAdmin"
                      name="respuestaAdmin"
                    />
                  </Box>
                )}
              </div>
            )}
          </DialogContent>
          <DialogActions>
            {!form.resuelto && (
              <Box>
                <Button onClick={() => handleResolverConsulta(form._id)}>
                  Resolver consulta
                </Button>
              </Box>
            )}
            <Button onClick={handleCloseDialog}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="boton">
        <Button variant="contained" color="primary" onClick={volverAdmin} sx={{ marginBottom: "50px" }}>
          Volver a Administrador
        </Button>
      </div>
    </Root>
  );
}
