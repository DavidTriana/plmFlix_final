const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const episodio = new Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    thumbnailUrl: {
        type: String
    },
    videoUrl: {
        type: String,
        required: true
    },
    videoPrinc:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    },
    likes: {
        type: Number
    },
    categorie: {
        type: String,
    },
});

module.exports = mongoose.model('Ep', episodio);