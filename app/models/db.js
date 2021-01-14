//importation du module sequelize
const Sequelize = require('sequelize');
const dbConfig = require("../config/db.config");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.DIALECT,
  // logging : false
});

// open the MySQL connection
const db = {};

db.Sequelize = Sequelize; // Sequelize est notre import du module Sequelize
db.sequelize = sequelize; // sequelize (minuscule) est notre objet Sequelize

// On fait appel à chacun de nos modèles d'entité avec les 2 sequelize passés en paramètre (l'ordre est important)
db.students = require("./students.model")(db.sequelize, Sequelize);
db.lessons = require("./lessons.model")(db.sequelize, db.Sequelize);
db.users = require("./users.model")(db.sequelize, db.Sequelize);
db.publications = require('./publications.model')(db.sequelize, db.Sequelize);

//création de la relation (One-to-one) entre mes entités Users et Students
db.students.hasOne(db.users);
db.users.belongsTo(db.students);

//création de la relation (One-to-Many) entre mes entités Lessons et Publications
db.lessons.hasMany(db.publications);
db.publications.belongsTo(db.lessons);

// table intermédiaire pour les relations Many-to-many
db.students.belongsToMany(db.lessons, { through: 'LessonStudents' }); 
db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

module.exports = db;