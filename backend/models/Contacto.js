const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let contacto = new Schema({

    email: {
        type: String,
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },    

    asunto: {
        type: String,
        required: true,
    },

    cuerpo: {
        type: String,
        required: true,
    },

    respuesta: {
        type: String,
    },

    resuelto: {
        type: Boolean,
    },

});

module.exports = mongoose.model("Contacto", contacto);