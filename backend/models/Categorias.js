const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let categorias = new Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },

    videos: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
    }]

});

module.exports = mongoose.model("Categorias", categorias);