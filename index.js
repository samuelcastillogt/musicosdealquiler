const express = require("express")
const app = express()
const path = require("path")
const admin = require('firebase-admin');
app.set("view engine", "ejs")
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')))
const key = require('./path/serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(key)
});
const db = admin.firestore();
const musicosList = db.collection('mariachi')
const ofertasList = db.collection('ofertas')
app.get("/", async(req, res)=>{
       const {docs}= await musicosList.get()
       const datos = docs.map(doc=>({id: doc.id, data: doc.data()}))
        res.render("index.ejs", { datos })
        
})
app.get("/musican/:id", async(req, res)=>{
  const { id } = req.params
  const perfil = await musicosList.doc(id).get()
  const { docs } = await ofertasList.where("autor", "==", id).get()
  const publicaciones = docs.map(doc=>({id: doc.id, data: doc.data()}))
  const info = {
    perfil: perfil.data(),
    publicaciones: publicaciones
  }
  res.render("perfil.ejs", info)
})
///////api///////
app.get("/api/create", (req, res)=>{
  musicosList.doc().set({
    pueba: "exito"
  })
})
app.get("/api/create/ofertas", (req, res)=>{
  ofertasList.doc().set({
    titulo: "El mejor precio por serenata",
    autor: "dvjT9vODxzqnbzI2dQLf",
    imagen: "https://1.bp.blogspot.com/-4wmeM3oaCoM/XS0DvLQbxmI/AAAAAAAAA8k/iTxrRqvJO4kT1OFNLa7YQTG5c2cbKXJfQCPcBGAYYCw/w480/mariachis%2Ben%2Bguatemala%2Btikal.png",
    descripcion: "Tenemos el mejor precio por serenata del mercado llamenos y lo descibrira"
  })
})
app.get("/api/perfil/:id", async(req, res)=>{
  const { id } = req.params
  const perfil = await musicosList.doc(id).get()
  const { docs } = await ofertasList.where("autor", "==", id).get()
  const publicaciones = docs.map(doc=>({id: doc.id, data: doc.data()}))
  let data = {
    id: perfil.id,
    datos: perfil.data(),
    publicaciones
  }
  res.send(data)
})
///////api///////
app.listen(3000, ()=>{
    console.log("ya esta")
})