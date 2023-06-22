const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Video = require("../models/Videos");
const Profile = require("../models/Profile");
const categorias = require("../models/Categorias");
const mongoose = require("mongoose");
const cheerio = require('cheerio');
const axios = require('axios');


router.get("/users", async function (req, res) {
  
    const users = await User.find(); 
    return res.json(users);

});

router.get("/movies", async function (req, res) {
  
    const videos = await Video.find(); 
    return res.json(videos);

});

router.delete("/movies/:movieId", async function (req, res) {
    
    let idPelicula = req.params.movieId;
    const movie = await Video.findByIdAndRemove(idPelicula);

    await categorias.updateMany({}, { $pull: { videos: { $in: [idPelicula] } } });

    await categorias.deleteMany({ videos: { $size: 0 } });

    return res.json(movie);

});

router.delete("/users/:userId", async function (req, res) {
    
    let idUsuario = req.params.userId;
    const user = await User.findByIdAndRemove(idUsuario);

    return res.json(user);

});

router.post("/users", async function (req, res) {
    
    
    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
    });

    await newUser.save()
        .then(() => {
            console.log("SE HA GUARDADO EL USUARIO", newUser.username);
        })
        .catch((err) => {
        console.error(err);
        res.status(500).send('Error al guardar el usuario');
        });

    const userAux = await User.findOne({ username: req.body.username });

    if (!userAux) {
        console.error('Error al buscar el usuario');
        return;
    } else {
    
        const newProfile = new Profile({
            user: userAux._id,
            name: req.body.username,
        });
        
        await newProfile.save();

    }

    return res.json(newUser);

});

function getYouTubeThumbnail(url) {
    const videoId = url.match(/(?:v=|youtu.be\/)(.+)/)[1];
    const thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
    return thumbnailUrl;
}

async function getYouTubeVideoInfo(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const title = $('meta[name="title"]').attr('content');
        const description = $('meta[name="description"]').attr('content');

        return {
            title,
            description
        };
    } catch (error) {
        console.error('Error al obtener la información del video:', error);
        return null;
    }
}

router.post("/movies", async function (req, res) {
    
    const info = await getYouTubeVideoInfo(req.body.videoUrl);

    const miniatura =  getYouTubeThumbnail(req.body.videoUrl);


    
    const newMovie = new Video({
        title: info.title ,
        description: info.description,
        thumbnailUrl: miniatura,
        videoUrl: req.body.videoUrl,
        likes: req.body.likes,
        categorie: req.body.categorie,
    });

    await newMovie.save()
        .then(() => {


            categorias.findOne({ title: newMovie.categorie })
            .then((categoriaEncontrada) => {
                if (categoriaEncontrada) {

                categoriaEncontrada.videos.push(newMovie._id);
                categoriaEncontrada.save()
                    .then(() => {
                    console.log('Video agregado a la categoría correctamente');
                    })
                    .catch((error) => {
                    console.error('Error al guardar la categoría:', error);
                    });
                } else {
                    const nuevaCategoria = new categorias({
                        title: newMovie.categorie,
                        videos: [newMovie._id],
                      });
            
                      nuevaCategoria.save()
                        .then(() => {
                          console.log('Nueva categoría creada y video añadido correctamente');
                        })
                        .catch((error) => {
                          console.error('Error al guardar la nueva categoría:', error);
                        });
                }
      })
     })
        .catch((err) => {
        console.error(err);
        res.status(500).send('Error al guardar la pelicula');
        });

    return res.json(newMovie);

});

module.exports = router;
