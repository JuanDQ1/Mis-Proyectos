const express = require('express');
const {urlencoded, json} = require('express');
const router = require('./routes/rutas.js');
const cors = require('cors');
const mongoose = require('mongoose');
require("dotenv").config();

const app = express();

app.use(urlencoded({extended: true}))
app.use(json())

app.use(cors())
app.use('/tiquetes', router);

//mongodb connection
mongoose.connect(process.env.MONGODB_URL)
.then(() => console.log('Conexion de base de datos'))
.catch((error) => console.error(error));


app.listen(3000, ()=>{
    console.log('listening at port 3000');
})