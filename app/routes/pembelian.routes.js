module.exports = app => {
    const pembelian = require("../controllers/pembelian.controller.js");
  
    var router = require("express").Router();
  
    // Create a new pembelian
    router.post("/", pembelian.create);

    router.post("/cart", pembelian.createCart);
  
    // Retrieve all pembelian
    router.get("/", pembelian.findAll);
  
    // Retrieve all published pembelian
    router.get("/published", pembelian.findAllPublished);
  
    // Retrieve a single pembelian with id
    router.get("/:id", pembelian.findOne);
  
    // Update a pembelian with id
    router.put("/:id", pembelian.update);
  
    // Delete a pembelian with id
    router.delete("/:id", pembelian.delete);
  
    // Delete all pembelian
    router.delete("/", pembelian.deleteAll);
  
    app.use("/api/pembelian", router);
  };