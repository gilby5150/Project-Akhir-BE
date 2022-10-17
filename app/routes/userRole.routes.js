module.exports = app => {
  const user_roles = require("../controllers/userRole.controller.js");

  var router = require("express").Router();

  // Retrieve all users
  router.get("/", user_roles.getUserRole);

  // Retrieve a single userRole with id
  router.get("/:id", user_roles.getUserId);

  // Update a Tutorial with id
  router.put("/:userId", user_roles.updateUserRole);

  app.use("/api/userRole", router);
};