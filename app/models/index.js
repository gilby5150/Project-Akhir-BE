const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user_role = require("../models/userRole.model")(sequelize, Sequelize);
db.products = require("../models/product.model.js")(sequelize, Sequelize);
db.pembelian = require("../models/pembelian.model.js")(sequelize, Sequelize);
db.cart = require("../models/cart.model.js")(sequelize, Sequelize);
db.tutorials = require("./tutorial.model.js")(sequelize, Sequelize);

// relasi user dan role untuk auth register
db.role.belongsToMany(db.user, {
  through: db.user_role,
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: db.user_role,
  foreignKey: "userId",
  otherKey: "roleId"
});

// relasi user dan product untuk pemebelian
db.pembelian.hasMany(db.user, { as: "users" });
db.pembelian.belongsTo(db.user, {
  foreignKey: "userId",
  as: "userIdFk",
});

db.pembelian.hasMany(db.products, { as: "products" });
db.pembelian.belongsTo(db.products, {
  foreignKey: "productId",
  as: "productIdFk",
});

db.cart.hasMany(db.user, { as: "users" });
db.cart.belongsTo(db.user, {
  foreignKey: "userId",
  as: "userIdFk",
});

db.cart.hasMany(db.products, { as: "products" });
db.cart.belongsTo(db.products, {
  foreignKey: "productId",
  as: "productIdFk",
});

db.ROLES = ["user", "admin", "superadmin"];

module.exports = db;