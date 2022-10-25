module.exports = (sequelize, Sequelize) => {
    const Pembelian = sequelize.define("pembelians", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      userId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      },
      quantity:{
        type: Sequelize.SMALLINT
      },
      totalPrice:{
        type: Sequelize.FLOAT
      },
      payment:{
        type: Sequelize.STRING
      },
    });
  
    return Pembelian;
  };