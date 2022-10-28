const { where } = require("sequelize");
const db = require("../models");
const Pembelian = db.pembelian;
const Product = db.products;
const Cart = db.cart;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

// Create and Save a new Product
exports.create = (req, res) => {

  // Create a Product
  const pembelian = {
    userId: req.body.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    payment: req.body.payment,
    status: req.body.status,
  };
  const id = req.body.productId;
  const quantity = req.body.quantity;

  // Save Product in the database
  Pembelian.create(pembelian)
    .then(async data => {
      const product = await Product.findOne({ where: { id: id } });
      const stock = product.stock - quantity;
      Product.update({ stock : stock}, { where: { id: id } });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Product."
      });
    });
};

exports.createCart = (req, res) => {

  // Create a Product
  const pembelianCart = {
    userId: req.body.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    payment: req.body.payment,
  };
  const id = req.body.productId;
  const quantity = req.body.quantity;
  const cartId = req.params.cartId;

  // Save Product in the database
  Pembelian.create(pembelianCart)
    .then(async data => {
      const product = await Product.findOne({ where: { id: id } });
      const stock = product.stock - quantity;
      Product.update({ stock : stock}, { where: { id: id } });
      Cart.destroy({ where: { id: cartId } });

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
exports.findAll = (res) => {
  
  sequelize.query(`SELECT a."productName", a.image ,b.quantity, b."totalPrice", b.payment, b.status FROM products a 
  INNER JOIN pembelians b ON a.id = b."productId"
  INNER JOIN users c ON b."userId" = c.id ORDER BY a.id`)
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

  Pembelian.findByPk(id)
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
  Pembelian.update(req.body, {
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

  Pembelian.destroy({
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
  Pembelian.destroy({
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
  Pembelian.findAll({ where: { published: true } })
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