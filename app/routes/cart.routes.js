module.exports = app => {
    const cart = require("../controllers/cart.controller.js");
  
    var router = require("express").Router();
  
    // Create a new cart
    router.post("/", cart.create);
  
    // Retrieve all cart
    router.get("/", cart.findAll);
  
    // Retrieve a single cart with id
    router.get("/:id", cart.findOne);
  
    // Update a cart with id
    router.put("/:id", cart.update);
  
    // Delete a cart with id
    router.delete("/:id", cart.delete);
  
    // Delete all cart
    router.delete("/", cart.deleteAll);
  
    app.use("/api/cart", router);
  };