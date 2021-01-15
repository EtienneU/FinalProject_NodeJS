module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
   id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    email: {
      type: Sequelize.STRING,
      allowNull: false // j'oblige mon champ a ne jamais être nul
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false // j'oblige mon champ a ne jamais être nul
    },
  });
  return User;
};