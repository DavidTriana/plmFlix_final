const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");

router.post("/", async function (req, res) {
        
    const newUser = new User({
        username: req.body.user,
        password: req.body.password,
    });

    const userAux =  await User.findOne({ username: req.body.user });

    if (!userAux){

        await newUser.save();
 

        const user = await User.findOne({ username: req.body.user });

            if (!user) {
                console.error('Error al buscar el usuario');
                return;
            } else {
                const newProfile = new Profile({
                    user: user._id,
                    name: req.body.user,
                });
            
                newProfile.save();

            return res.status(200).json({ message: 'Usuario registrado correctamente' });

            }
    } else {

        return res.status(500).send('Error al guardar el usuario');
    }

});

module.exports = router;
