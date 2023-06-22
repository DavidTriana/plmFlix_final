const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Profile = require("../models/Profile");
const Categories = require("../models/Categorias");
const Videos = require("../models/Videos");

//obtener las categorias con sus videos(id, thumnail, url)
router.get("/:user/:profile/home", async function (req, res) {
    let user = req.params.user;
    let profile = req.params.profile;

    const usuario = await User.findOne({
        username: req.params.user
    }, "_id");
    const perfile = await Profile.findOne({
        name: profile,
        user: usuario._id
    });

    const categorias = await Categories.find({
        title: {
            $ne: "ep"
        }
    });

    let categoriasVideoIdThumnail = [];
    for (let i = 0; i < categorias.length; i++) {
        const cat = categorias[i];
        let videos = [];

        for (let j = 0; j < cat.videos.length; j++) {
            let video = cat.videos[j];
            let videoIn = await Videos.findOne(video);

            if(videoIn) {
                videos.push({
                    _id: videoIn._id,
                    videoUrl: videoIn.videoUrl,
                    thumbnailUrl: videoIn.thumbnailUrl
                });
            }
        }

        categoriasVideoIdThumnail.push({
            _id: cat._id,
            title: cat.title,
            videos: videos
        });
    }
    let like = [];

    for (let j = 0; j < perfile.likeList.length; j++) {
        let video = perfile.likeList[j];
        let videoIn = await Videos.findOne(video);

        if(videoIn){
            like.push({
                _id: videoIn._id,
                videoUrl: videoIn.videoUrl,
                thumbnailUrl: videoIn.thumbnailUrl
            });
        }   
    }
    let pen = [];

    for (let j = 0; j < perfile.pendienteList.length; j++) {
        let video = perfile.pendienteList[j];
        let videoIn = await Videos.findOne(video);

        if(videoIn){
            pen.push({
                _id: videoIn._id,
                videoUrl: videoIn.videoUrl,
                thumbnailUrl: videoIn.thumbnailUrl
            });
        }
    }
    let vis = [];

    for (let j = 0; j < perfile.vistoList.length; j++) {
        let video = perfile.vistoList[j].video;
        let videoIn = await Videos.findOne(video);

        if (videoIn) {

            vis.push({
                _id: videoIn._id,
                videoUrl: videoIn.videoUrl,
                thumbnailUrl: videoIn.thumbnailUrl
            });
        }
        
    }

    let respuesta = {
        perfile: perfile,
        categories: categoriasVideoIdThumnail,
        likeList: like,
        pendienteList: pen,
        vistoList: vis
    }

    if (!perfile)
        return res.status(400)
    return res.json(respuesta);
});

//al clickar en el thumnail del video
router.get("/:video", async function (req, res) {
    try {
        let videoId = req.params.video;

        const videoData = await Videos.findById(videoId);

        if (!videoData) {
            return res.status(404).json({
                error: "Video not found"
            });
        }

        return res.json(videoData);
    } catch (error) {
        console.error("Error retrieving video:", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

//Lista de me gusta
router.put("/:user/:profile/megusta_add", async function (req, res) {
    try {
        let perfil = req.params.profile;
        let user = req.params.user;
        const videoId = req.body.videoId;

        const userM = await User.findOne({
            username: user
        });
        const perfilM = await Profile.findOne({
            user: userM,
            name: perfil
        });

        if (!perfilM.likeList.includes(videoId)) {
            perfilM.likeList.push(videoId);
            await perfilM.save();

            res.status(200).json({
                message: 'Video añadido a la lista de "likeList"'
            });
        } else {
            res.status(200).json({
                message: 'Video ya esta en la lista de "likeList"'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error al añadir el video a la lista de "likeList"'
        });
    }
});

router.delete("/:user/:profile/megusta_dlt", async function (req, res) {
    try {
        const perfil = req.params.profile;
        const user = req.params.user;
        const videoId = req.body.videoId;

        const userM = await User.findOne({
            username: user
        });

        const perfilM = await Profile.findOne({
            user: userM._id,
            name: perfil
        });

        const video = await Videos.findById(videoId);


        const videoObjectId = video._id.toString();
        if (!perfilM.likeList.map(element => element.toString()).includes(videoObjectId)) {
            return res.status(200).json({
                message: 'El video no está en la lista de "Me gusta"'
            });
        }

        perfilM.likeList = perfilM.likeList.filter(element => element.toString() !== videoObjectId);
        await perfilM.save();

        res.status(200).json({
            message: 'Video eliminado de la lista de "Me gusta"'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el video de la lista de "Me gusta"'
        });
    }
});


//lista de pendientes de ver
////Lo mismo que me gusta pero cambiando la lista
router.put("/:user/:profile/pendientes_add", async function (req, res) {
    try {
        let perfil = req.params.profile;
        let user = req.params.user;
        const videoId = req.body.videoId;

        const userM = await User.findOne({
            username: user
        });
        const perfilM = await Profile.findOne({
            user: userM,
            name: perfil
        });

        if (!perfilM.pendienteList.includes(videoId)) {
            perfilM.pendienteList.push(videoId);
            await perfilM.save();

            res.status(200).json({
                message: 'Video añadido a la lista de "pendienteList"'
            });
        } else {
            res.status(200).json({
                message: 'Video ya esta en la lista de "pendienteList"'
            });
        }

    } catch (error) {
        res.status(500).json({
            message: 'Error al añadir el video a la lista de "pendienteList"'
        });
    }
});

router.delete("/:user/:profile/pendientes_dlt", async function (req, res) {
    try {
        const perfil = req.params.profile;
        const user = req.params.user;
        const videoId = req.body.videoId;

        const userM = await User.findOne({
            username: user
        });

        const perfilM = await Profile.findOne({
            user: userM._id,
            name: perfil
        });

        const video = await Videos.findById(videoId);


        const videoObjectId = video._id.toString();
        if (!perfilM.pendienteList.map(element => element.toString()).includes(videoObjectId)) {
            return res.status(200).json({
                message: 'El video no está en la lista de "pendienteList"'
            });
        }

        perfilM.pendienteList = perfilM.pendienteList.filter(element => element.toString() !== videoObjectId);
        await perfilM.save();

        res.status(200).json({
            message: 'Video eliminado de la lista de "Me gusta"'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error al eliminar el video de la lista de "Me gusta"'
        });
    }
});

//Lista de vistos
///al clickar en el boton de reproducirñ
router.put("/:user/:profile/visto", async function (req, res) {
    const perfil = req.params.profile;
    const user = req.params.user;
    const videoId = req.body.videoId;
    const time = req.body.tiempo;
  
    try {
      const userDoc = await User.findOne({ username: user });
  
      if (!userDoc) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      let profile = await Profile.findOne({ name: perfil, user: userDoc._id });
  
      if (!profile) {
        return res.status(404).json({ message: "Perfil no encontrado" });
      }
  
      const existingItemIndex = profile.vistoList.findIndex((item) => item.video === videoId);
  
      if (existingItemIndex !== -1) {
        profile.vistoList.splice(existingItemIndex, 1);
      }
  
      profile.vistoList.unshift({ video: videoId, currentTime: time });
      await profile.save();
  
      res.status(200).json({ message: "Elemento actualizado en 'vistoList'" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  });
  
  
  


//al clickar en un video de la lista de seguir viendo
router.get("/:user/:profile/visto", async function (req, res) {
    try {
        let videoId = req.params.video;

        const videoData = await Videos.findById(videoId);

        if (!videoData) {
            return res.status(404).json({
                error: "Video not found"
            });
        }

        return res.json(videoData);
    } catch (error) {
        console.error("Error retrieving video:", error);
        return res.status(500).json({
            error: "Internal Server Error"
        });
    }
});

module.exports = router;