module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  const { uploadFile } = require('../middleware/multer')

  // Retrieve all users
  router.get("/", users.getAllUser);

  // Retrieve all published users
  router.get("/published", users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:username", users.findOne);

  // Update a Tutorial with id
  router.post("/:id",uploadFile("image"), users.update);

  // Delete a Tutorial with id
  router.delete("/:id", users.delete);

  // Delete all users
  router.delete("/", users.deleteAll);

  app.use("/api/users", router);
};