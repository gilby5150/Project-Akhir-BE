module.exports = app => {
    const products = require("../controllers/product.controller.js");
    var router = require("express").Router();
    
    const { uploadFile } = require('../middleware/multer')
    const { morganMiddleware } = require('../middleware/morgan.middleware')

    // Create a new product
    router.post("/",morganMiddleware,uploadFile("image"), products.create);
  
    // Retrieve all products
    router.get("/",morganMiddleware, products.findAll);
  
    // Retrieve all published products
    router.get("/published",morganMiddleware, products.findAllPublished);
  
    // Retrieve a single product with id
    router.get("/:id",morganMiddleware, products.findOne);
  
    // Update a product with id
    router.put("/:id",morganMiddleware, products.updateStock);
  
    // Delete a product with id
    router.delete("/:id",morganMiddleware, products.delete);
  
    // Delete all products
    router.delete("/",morganMiddleware, products.deleteAll);
  
    app.use("/api/products", router);
  };