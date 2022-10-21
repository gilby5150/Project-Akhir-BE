module.exports = (sequelize, Sequelize) => {
    const Pembelian = sequelize.define("pembelian", {
      userId: {
        type: Sequelize.INTEGER
      },
      productId: {
        type: Sequelize.INTEGER
      }
    });
  
    return Pembelian;
  };