// importation du module sequelize
const { Sequelize, DataTypes } = require('sequelize'); // je crée un un objet qui contient Sequelize et Datatypes
const bcrypt = require('bcryptjs');
const dbConfig      = require('../config/db.config');
const userModel     = require('./users.model');
const studentModel  = require('./students.model');
const lessonModel   = require('./lessons.model');

// J'importe mes tableaux d'entité qui me servent à insérer quelques lignes en DB
const listeEtudiants  = require('../config/test/liste.etudiants');
const listeUsers      = require('../config/test/liste.users');
const listeLessons    = require('../config/test/liste.lessons');

const sequelize = new Sequelize(
  dbConfig.DB, 
  dbConfig.USER, 
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: 'mysql',
    //timestamp : false  //supprime les champs createdAt et updatedAt dans chaque table
    logging : false   // pour supprimer les log liés à Sequelize (création de tables, insertions etc)
  }
);

// Si ça fonctionne pas avec DataTypes, remplacer par Sequelize (avec Majuscule)
// On fait appel à chacun de nos modèles d'entité avec les 2 paramètres (l'ordre est important)
const User = userModel(sequelize, DataTypes);  
const Student = studentModel(sequelize, DataTypes);
const Lesson = lessonModel(sequelize, DataTypes);

// création de la relation (One-to-one) entre mes entités User et Student
// Source --> Cible. Student est la source qui vise la cible User. Une clé étrangère se crée au niveau de la cible
Student.hasOne(User); // Student.hasOne(User, {foreignKey: "EtudiantId"}) pour modifier le nom de ma FK
// Je crée une clé étrangère dans la source.
// avec le mot clé belongsTo, la référence de la cible disparaît si la source est supprimée (mais pas la cible)
// Avec ces relations, de nouvelles méthodes sont accessibles ! Comme Student.getUser()
User.belongsTo(Student);

// //création de la relation (One-to-Many) entre mes entités Lessons et Publications
// Lessons.hasMany(Publications);
// Publications.belongsTo(Lessons);

// // table intermédiaire pour les relations Many-to-many
// Student.belongsToMany(Lessons, { through: 'LessonStudents' }); 
// Lessons.belongsToMany(Student, { through: 'LessonStudents' });

// initialisation de ma DB
const initDB = () => {
  // sequelize.sync() retourne une Promise
  // {force : true} est interdit en mode prod, mais pratique en mode dev
  // {force : true} me permet de RESET la DB (DROP IF EXISTS)
  return sequelize.sync({force : true})  //
    .then (_ => {
      console.log("Connection à la DB réussie");
      // Pour reinitialiser ma BD : activer {force : true} dans sync() et activer mes map ci dessous

      listeEtudiants.map(student => {
        Student.create(student);
      });
      listeUsers.map(user => {
        user.password = bcrypt.hashSync(user.password, 5) // MAJ de password en crypté
        User.create(user);
      });
      listeLessons.map(lesson => {
        Lesson.create(lesson);
      });

    })
    .catch (error => {
      console.log("Erreur - connexion échouée DB" + error);
    })
}

module.exports = {
  initDB, Student, User, Lesson
};