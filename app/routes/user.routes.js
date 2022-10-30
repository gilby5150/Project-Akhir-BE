module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  const { morganMiddleware } = require('../middleware/morgan.middleware')
  const { uploadFile } = require('../middleware/multer')

  // Retrieve all users
  router.get("/",morganMiddleware, users.getAllUser);

  // Retrieve all published users
  router.get("/published",morganMiddleware, users.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:username",morganMiddleware, users.findOne);

  // Update a Tutorial with id
  router.post("/:id",morganMiddleware,uploadFile("image"), users.update);

  // Delete a Tutorial with id
  router.delete("/:id",morganMiddleware, users.delete);

  // Delete all users
  router.delete("/",morganMiddleware, users.deleteAll);

  app.use("/api/users", router);
};