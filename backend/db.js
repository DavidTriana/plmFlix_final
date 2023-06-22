const mongoose = require("mongoose");
const config = require("config");

const db = process.env.MONGO_URI; // mongodb://127.0.0.1:27017/PLM-FLIX";

const connectDB = async () => {
   console.log("intentando conectar");
   return mongoose.connect(db, {
   useNewUrlParser: true ,
   useUnifiedTopology: true ,
   });
   
};

 module.exports = connectDB;