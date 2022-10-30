module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();
  
    const { morganMiddleware } = require('../middleware/morgan.middleware')

    // Create a new cart
    router.post("/",morganMiddleware, cart.create);
  
    // Retrieve all cart
    router.get("/",morganMiddleware, cart.findAll);
  
    // Retrieve a single cart with id
    router.get("/:id",morganMiddleware, cart.findOne);
  
    // Update a cart with id
    router.put("/:id",morganMiddleware, cart.update);
  
    // Delete a cart with id
    router.delete("/:id",morganMiddleware, cart.delete);
  
    // Delete all cart
    router.delete("/",morganMiddleware, cart.deleteAll);
  
    app.use("/api/cart", router);
  };