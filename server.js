
// importer body-parser et express
var express = require('express');
var bodyParser = require('body-parser');
var students = require('./app/routers/students.router.js');
var lessons = require('./app/routers/lessons.router');
var users = require('./app/routers/users.router');
const db = require("./app/models/db");

//créer une application express
let app = express();
//ajouter bodyParser comme middleware
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.header(
        "Acess-Control-Allow-Headers",
        "x-acess-token,Origin, Content-type, Accept"
    );
    next();
})

app.use('/students', students);
app.use('/lessons', lessons);
app.use('/auth', users);

db.sequelize.sync();

//lancer le serveur sur le port 3000
app.listen(3000);