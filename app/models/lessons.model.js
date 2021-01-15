// Ici, c'est mon modèle Sequelize, qui serviva à définir les tables de ma DB
module.exports = (sequelize, Sequelize) => {
    const Lesson = sequelize.define("lesson", {
   id: {
      type: Sequelize.INTEGER, // On utilise Sequelize (Majuscule) pour accéder aux méthodes DataTypes !
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    hours: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.TEXT
    },
    file_name: {
      type : Sequelize.STRING
    },
    starting_date: {
      type:Sequelize.DATE
    },
    ending_date: {
      type:Sequelize.DATE
    }
  });
  return Lesson;
};