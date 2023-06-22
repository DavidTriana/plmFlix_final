const express = require("express");
const cors = require('cors');
const connectDB = require ("./db");
const crearDB = require ("./datos/datosDb");
const path = require('path');

var app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  console.log("entrando en production");
  app.use(express.static ("../frontend/build"));
  app.get("/", (req , res) => {
    res.sendFile(path.resolve(__dirname , "../frontend", "build", "index.html")
);
 });
}

connectDB()

//crear db

 crearDB();

app.use("/api/login", require("./routes/login"));
app.use("/api", require("./routes/profiles"));
app.use("/api", require("./routes/home"));
app.use("/api/register", require("./routes/register"));
app.use("/api/administrador", require("./routes/administrador"));
app.use("/api/", require("./routes/configuration"));
app.use("/api/contact", require("./routes/userContact"));



  app.listen(5000, function () {
    console.log("Servidor arrancado en el puerto 5000!");
  });
