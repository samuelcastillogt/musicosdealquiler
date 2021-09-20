const mongoose = require("mongoose")
const Schema = mongoose.Schema
const musicoSchema = new Schema({
    nombre: String,
    descripcion: String
})
const musicosAlquiler = mongoose.model("musicosAlquiler", musicoSchema)
module.exports = musicosAlquiler