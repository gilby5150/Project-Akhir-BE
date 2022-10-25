const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Product
exports.create = (req, res) => {
  // Validate request
  if (!req.body.productName) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Product
  const product = {
    productName: req.body.productName,
    image: req.file.filename,
    price: req.body.price,
    quantity: req.body.quantity,
    category: req.body.category,
    stock: req.body.stock,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Product in the database
  Product.create(product)
  
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

// Retrieve all Products from the database.
exports.findAll = (req, res) => {
  const category = req.query.category;
  var condition = category ? { category: { [Op.iLike]: `%${category}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving product."
      });
    });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Product.findByPk(id,
    // {include: [
    //   {
    //     model: User,
    //     as:'users',
    //     // atributes: {
    //     //   exclude: ['username','fullname','image','birthday','gender','email','mobile','address','password','createdAt', 'updatedAt',]
    //     // },
    //   }
    // ]}
    )
  // sequelize.query(`SELECT a.*, b."productId", c.saldo FROM products a 
  // INNER JOIN pembelians b ON a.id = b."userId"`)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Product with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Product with id=" + id
      });
    });
};

// Update a Product by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id)
  Product.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Product with id=${id}. Maybe Product was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Product with id=" + id
      });
    });
};

// Delete a Product with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Product.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Product was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Product with id=${id}. Maybe Product was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Product with id=" + id
      });
    });
};

// Delete all Product from the database.
exports.deleteAll = (req, res) => {
  Product.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Product were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Productss."
      });
    });
};

// find all published Product
exports.findAllPublished = (req, res) => {
  Product.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Products."
      });
    });
};