module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
   id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    email: {
      type: Sequelize.STRING,
      allowNull: false, // j'oblige mon champ a ne jamais être nul
      unique : {
        msg:  `Cet e-mail est déjà utilisé.`
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false // j'oblige mon champ a ne jamais être nul
    },
  },
  {
    timestamps : false // supprime la gestion automatique de sequelize pour les champs (createdAt, updatedAt)
  });
  return User;
};