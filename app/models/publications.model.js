// Ici, c'est mon modèle Sequelize Publication, qui serviva à définir les tables de ma DB
module.exports = (sequelize, Sequelize) => {
    const Publication = sequelize.define("publication", {
   id: {
        type: Sequelize.INTEGER, // On utilise Sequelize (Majuscule) pour accéder aux méthodes DataTypes !
        primaryKey: true,
        autoIncrement: true
    },
    title: {
      type: Sequelize.STRING
    },
    creation_date: {
      type: Sequelize.DATE
    },
    body_text: {
      type: Sequelize.TEXT
    },
    type: {
      type : Sequelize.STRING
    }    
  });
  return Publication;
};