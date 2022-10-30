module.exports = app => {
    const pembelian = require("../controllers/pembelian.controller.js");
  
    var router = require("express").Router();
  
    const { morganMiddleware } = require('../middleware/morgan.middleware')

    // Create a new pembelian
    router.post("/",morganMiddleware, pembelian.create);

    router.post("/cart",morganMiddleware, pembelian.createCart);
  
    // Retrieve all pembelian
    router.get("/",morganMiddleware, pembelian.findAll);
  
    // Retrieve all published pembelian
    router.get("/published",morganMiddleware, pembelian.findAllPublished);
  
    // Retrieve a single pembelian with id
    router.get("/:id",morganMiddleware, pembelian.findOne);
  
    // Update a pembelian with id
    router.put("/:id",morganMiddleware, pembelian.update);
  
    // Delete a pembelian with id
    router.delete("/:id",morganMiddleware, pembelian.delete);
  
    // Delete all pembelian
    router.delete("/",morganMiddleware, pembelian.deleteAll);
  
    app.use("/api/pembelian", router);
  };