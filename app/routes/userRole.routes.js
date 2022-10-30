module.exports = app => {
  const user_roles = require("../controllers/userRole.controller.js");

  var router = require("express").Router();

  const { morganMiddleware } = require('../middleware/morgan.middleware')

  // Retrieve all users
  router.get("/",morganMiddleware, user_roles.getUserRole);

  // Retrieve a single userRole with id
  router.get("/:id",morganMiddleware, user_roles.getUserId);

  // Update a Tutorial with id
  router.put("/:userId",morganMiddleware, user_roles.updateUserRole);

  app.use("/api/userRole", router);
};