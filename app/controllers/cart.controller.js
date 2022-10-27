const { where } = require("sequelize");
const db = require("../models");
const Cart = db.cart;
const Product = db.products;
const Op = db.Sequelize.Op;

// Create and Save a new Cart
exports.create = async (req, res) => {
  // Create a Cart
  const cart = {
    userId: req.body.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
  };

  const existCart = await Cart.findOne({ where: { productId: req.body.productId, userId: req.body.userId } });

  if (existCart !== null) {
    const quantity = existCart.quantity + req.body.quantity;
    const totalPrice = existCart.totalPrice + req.body.totalPrice;
    Cart.update({ quantity: quantity, totalPrice: totalPrice }, {
      where: { id: existCart.id }
    })
      .then(data => {
        res.send({ message: "Data successfully add to cart" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while updating the Cart."
        });
      });
  } else {
    Cart.create(cart)
      .then(data => {
        res.send({ message: "Data successfully add to cart" });
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Cart."
        });
      });
  }
};

// Retrieve all Carts from the database.
exports.findAll = (req, res) => {
  
  Cart.findAll({
  //   include: [
  //   {
  //     model: Product,
  //     as: 'products',
  //     attributes: { 
  //       exclude:["createdAt,updatedAt"],
  //     },
  //   },
    
  // ],
  attributes: {
    exclude:["createdAt,updatedAt"]
  }
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cart."
      });
    });
};

// Find a single Cart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Cart.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Cart with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Cart with id=" + id
      });
    });
};

// Update a Cart by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(id);
  Cart.update({ quantity: req.body.quantity, totalPrice: req.body.totalPrice }, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cart with id=${id}. Maybe Cart was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cart with id=" + id
      });
    });
};

// Delete a Cart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Cart.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cart was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cart with id=${id}. Maybe Cart was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cart with id=" + id
      });
    });
};

// Delete all Cart from the database.
exports.deleteAll = (req, res) => {
  Cart.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Cart were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Cartss."
      });
    });
};