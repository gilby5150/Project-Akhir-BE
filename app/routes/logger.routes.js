module.exports = app => {
    const logs = require("../controllers/logger.controller.js");
    var router = require("express").Router();
    
    const { morganMiddleware } = require("../middleware/morgan.middleware")

    // Retrieve all logger
    router.get("/",morganMiddleware, logs.getLog);

    app.use("/api/log", router);
  };