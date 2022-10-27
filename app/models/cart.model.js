module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define("cart", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.INTEGER,
      ref: "user"
    },
    productId: {
      type: Sequelize.INTEGER,
      ref: "product"
    },
    quantity:{
      type: Sequelize.SMALLINT
    },
    totalPrice:{
      type: Sequelize.FLOAT
    },
  });

  return Cart;
};