const { Sequelize } = require("../models");
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;

// Retrieve all users from the database.
exports.getAllUser = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.iLike]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    });
};


// Find a single user with an id
exports.findOne = (req, res) => {
  const username = req.params.username;

  User.findOne({ where: { username: username } })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with username=${username}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with username=" + username
      });
    });
};

// Update a user by the id in the request
exports.update = async(req, res) => {
  const id = req.params.id;
  let image = ""
  // console.log(req.file);
  if (req.file !== undefined) {
    image = req.file.filename
  } else {
    const user = await User.findOne({ where: { id: id } });
    image = user.image;
  }
  User.update({
    fullname: req.body.fullname,
    image: image,
    birthday: req.body.birthday,
    gender: req.body.gender,
    email: req.body.email,
    mobile: req.body.mobile,
    address: req.body.address,}, 
    {where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${id}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + id
      });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete user with id=${id}. Maybe user was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete user with id=" + id
      });
    });
};

// Delete all user from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} user were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all userss."
      });
    });
};

// find all published user
exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving users."
      });
    });
};