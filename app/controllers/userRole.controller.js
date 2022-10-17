const db = require("../models");
const UserRole = db.user_role 
const User = db.user;
const sequelize = db.sequelize;

exports.getUserRole = (req, res) => {
  // const userId = +req.params.userId;
  sequelize.query(`SELECT a.username, a.id, b."roleId", c.name FROM users a 
  INNER JOIN user_roles b ON a.id = b."userId" 
  INNER JOIN roles c ON b."roleId" = c.id  ORDER BY a.id`)
    .then(data => {
      res.json(data[0]);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      });
    })
};

// Find a single user with an id
exports.getUserId = (req, res) => {
  const id = +req.params.id;

  UserRole.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find user with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving user with id=" + id
      });
    });
};


// Update a user by the id in the request
exports.updateUserRole = (req, res) => {
  const userId = req.params.userId;

  UserRole.update(req.body, {
    where: { userId: userId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "user was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update user with id=${userId}. Maybe user was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating user with id=" + userId
      });
    });
};
