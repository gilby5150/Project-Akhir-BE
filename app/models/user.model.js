module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    username: {
      type: Sequelize.STRING
    },
    fullname: {
      type: Sequelize.STRING
    },
    image: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATEONLY
    },
    gender: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    mobile: {
      type: Sequelize.STRING
    },
    address: {
      type: Sequelize.STRING
    },
    saldo: {
      type: Sequelize.FLOAT
    },
    password: {
      type: Sequelize.STRING
    },
  });

  return User;
};