// import des modules express, body-parser et nos exports locaux
const express = require('express');
const bodyParser = require('body-parser');
const users = require('./app/routers/users.router');
const students = require('./app/routers/students.router.js');
const lessons = require('./app/routers/lessons.router');
// ici je ne require qu'une partie de l'objet exporté par db.js
const { initDB } = require("./app/models/db");

// créer une application express
const app = express();

// ajout de bodyParser comme middleware
app.use(bodyParser.json())

// Lancement de ma synchronisation avec ma DB
initDB();

// app.use(function (req, res, next) {
//     res.header(
//         "Acess-Control-Allow-Headers",
//         "x-acess-token,Origin, Content-type, Accept"
//     );
//     next();
// })

// Terminer par l'appel de mes routers
app.use('/', users);
app.use('/students', students);
app.use('/lessons', lessons);


//lancer le serveur sur le port 3000
app.listen(3000, () => {
    console.log(`---> serveur lancé ! =) `);
});