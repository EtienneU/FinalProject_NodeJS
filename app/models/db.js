// importation du module sequelize
const { Sequelize, DataTypes } = require('sequelize'); // je crée un un objet qui contient Sequelize et Datatypes
const dbConfig      = require('../config/db.config');
const userModel     = require('./users.model');
const studentModel  = require('./students.model');
const lessonModel   = require('./lessons.model');

// J'importe mes tableaux d'entité qui me servent à insérer quelques lignes en DB
const listeEtudiants  = require('../config/test/liste.etudiants');
const listeUsers      = require('../config/test/liste.users');

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: 'mysql'
    // logging : false   // pour supprimer les log liés à Sequelize (création de tables etc)
  }
);

// Si ça fonctionne pas avec DataTypes, remplacer par Sequelize (avec Majuscule)
const User = userModel(sequelize, DataTypes);  
const Student = studentModel(sequelize, DataTypes);
const Lesson = lessonModel(sequelize, DataTypes);

// initialisation de ma DB
const initDB = () => {
  // sequelize.sync() retourne une Promise
  // {force : true} est interdit en mode prod, mais pratique en mode dev
  // {force : true} me permet de RESET la DB (DROP IF EXISTS)
  return sequelize.sync(/*{force : true}*/) 
    .then (_ => {
      console.log("Connection à la DB réussie");
      // Pour reinitialiser ma BD : activer {force : true} dans sync() et activer mes map ci dessous
      // Ajout d'étudiants dans la table student : je parcours mon tableau d'étudiants à insérer dans ma BD
      // listeEtudiants.map(student => {
      //   Student.create(student);
      // });
      // listeUsers.map(user => {
      //   User.create(user);
      // });
    })
    .catch (error => {
      console.log("Erreur - connexion échouée DB" + error);
    })
}

// On fait appel à chacun de nos modèles d'entité avec les 2 sequelize passés en paramètre (l'ordre est important)
// db.students = require("./students.model")(db.sequelize, Sequelize);
// db.lessons = require("./lessons.model")(db.sequelize, db.Sequelize);
// db.users = require("./users.model")(db.sequelize, db.Sequelize);
// db.publications = require('./publications.model')(db.sequelize, db.Sequelize);

//création de la relation (One-to-one) entre mes entités Users et Students
// db.students.hasOne(db.users);
// db.users.belongsTo(db.students);

// //création de la relation (One-to-Many) entre mes entités Lessons et Publications
// db.lessons.hasMany(db.publications);
// db.publications.belongsTo(db.lessons);

// // table intermédiaire pour les relations Many-to-many
// db.students.belongsToMany(db.lessons, { through: 'LessonStudents' }); 
// db.lessons.belongsToMany(db.students, { through: 'LessonStudents' });

module.exports = {
  initDB, Student, User, Lesson
};