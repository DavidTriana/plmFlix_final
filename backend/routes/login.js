const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/", async function (req, res) {
  

  const user = req.body.user;
  const password = req.body.password;
  
  const logedUser = await User.findOne({username: user});


  if(logedUser==null) {
    return res.status(400).send("No existe usuario");
  }

  if(logedUser.password != password){
    return res.status(400).send("Contraseña incorrecta");
  }

  return res.json(logedUser);

});

module.exports = router;
