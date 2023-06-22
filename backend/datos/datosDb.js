const mongoose = require("mongoose");
const cheerio = require('cheerio');
const axios = require('axios');

const Profile = require("../models/Profile");
const dataProf = require('./profiles');
const profiles = dataProf.data;

const User = require("../models/User");
const dataU = require("./users")
const users = dataU.data;

const Categoria = require("../models/Categorias");
const dataC = require("./categorias");
const categorias = dataC.data;

const Videos = require("../models/Videos");
const dataV = require("./videos");
const videos = dataV.data;

const Episodios = require("../models/Episodios");
const dataE = require("./episodios");
const episodios = dataE.data;

const crearDB = () => {
    console.log("entrando en crearDB");
    mongoose.connection.dropDatabase()
        .then(() => {
            console.log('Todas las colecciones de la base de datos han sido eliminadas.');

            const usuariosArray = users;
            const perfilesArray = profiles;
            const videosArray = videos;
            const categoriasArray = categorias;
            const episodiosArray = episodios;

           

            const insertarUsuariosPerfiles = async () => {
                try {

                    console.log("insertar usuarios perfiles");
                    const usuarios = await User.insertMany(usuariosArray);

                    const perfilesConReferencia = perfilesArray.map(perfil => {
                        const usuarioAsociado = usuarios.find(usuario => usuario.username === perfil.user);
                        return {
                            name: perfil.name,
                            user: usuarioAsociado._id
                        };
                    });

                    const perfiles = await Profile.insertMany(perfilesConReferencia);
                    console.log("Usuarios con sus perfiles añadidos");
                } catch (err) {
                    console.error(err);
                }
            };

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

            function getYouTubeThumbnail(url) {
                const videoId = url.match(/(?:v=|youtu.be\/)(.+)/)[1];
                const thumbnailUrl = 'https://img.youtube.com/vi/' + videoId + '/0.jpg';
                return thumbnailUrl;
            }

            const insertarVideos = async () => {
                try {
                    //añadir los videos
                    const videoInfoPromises = videosArray.map(video => {
                        return getYouTubeVideoInfo(video.videoUrl)
                            .then(videoInfo => {
                                if (videoInfo) {
                                    const titulo = videoInfo.title;
                                    const descripcion = videoInfo.description;

                             
                                    return {
                                        videoUrl: video.videoUrl,
                                        title: titulo,
                                        description: descripcion,
                                        thumbnailUrl: getYouTubeThumbnail(video.videoUrl),
                                        likes: video.likes,
                                        categorie: video.categorie,
                                    };
                                }
                            })
                            .catch(error => {
                                console.error('Error:', error);
                            });
                    });

                    const videosInfoComp = await Promise.all(videoInfoPromises);
                    const videos = await Videos.insertMany(videosInfoComp);
                    console.log("Videos añadidos");

                    //añadimos sus episodios
                    // var videosSinEp = await Videos.find();
                    // var episodios = [];
                    // for (let i = 0; i < videosArray.length; i++) {
                    //     var video = videosSinEp[i];
                    //     var elementoVideos = videosArray[i];

                    //    const episodiosInfoPromises = elementoVideos.serie.map(async (episodio) => {
                    //         return getYouTubeVideoInfo(episodio.videoUrl)
                    //             .then(epInfo => {
                    //                 if (epInfo) {
                    //                     const titulo = epInfo.title;
                    //                     const descripcion = epInfo.description;
                    //                     return {
                    //                         videoUrl: episodio.videoUrl,
                    //                         title: titulo,
                    //                         description: descripcion,
                    //                         thumbnailUrl: getYouTubeThumbnail(episodio.videoUrl),
                    //                         likes: video.likes,
                    //                         categorie: video.categorie,
                    //                         videoPrinc: video
                    //                     };
                    //                 }
                    //             })
                    //             .catch(error => {
                    //                 console.error('Error:', error);
                    //             });
                    //     });
                    //     const episodiosInfoComp = await Promise.all(episodiosInfoPromises);
                    //     const episodios = await Episodios.insertMany(episodiosInfoComp);
                    //     video.serie = episodios;
                    //     videos.save();
                    // }
                } catch (err) {
                    console.error(err);
                }
            };

            const insertarCategorias = async () => {
                try {
                    
                    await insertarVideos();
                    const categoriasConVideos = [];
                    for (const cat of categoriasArray) {
                        const videosCat = await Videos.find({
                            categorie: cat.title
                        });
                        categoriasConVideos.push({
                            title: cat.title,
                            videos: videosCat,
                        });
                    }
                    console.log("Categorias con sus videos"); 
                    const categoriasInsert = await Categoria.insertMany(categoriasConVideos);
                    
                } catch (err) {
                    console.error(err);
                }
            };

            insertarUsuariosPerfiles();
            insertarCategorias();
        })
        .catch((err) => {
            console.error(err);
        });
};

module.exports = crearDB;