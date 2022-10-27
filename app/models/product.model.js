module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
      productName: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.FLOAT
      },
      category:{
        type: Sequelize.STRING
      },
      image:{
        type: Sequelize.STRING
      },
      stock:{
        type: Sequelize.SMALLINT
      },
      description: {
        type: Sequelize.TEXT
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Product;
  };