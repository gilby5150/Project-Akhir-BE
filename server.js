const express = require("express");
const cors = require("cors");

const app = express();

// var corsOptions = {
//   origin: "http://localhost:8081"
// };

app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


// db.sequelize.sync();
// force: true will drop the table if it already exists
const db = require("./app/models");
const Role = db.role;

// db.sequelize.sync = () => {
//   initial();
// };

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Gilby application." });
});

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/userRole.routes')(app);
require('./app/routes/tutorial.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/pembelian.routes')(app);
require('./app/routes/cart.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// Add endpoint grouping and router
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.create({
    id: 1,
    name: "user"
  });
 
  Role.create({
    id: 2,
    name: "superadmin"
  });
 
  Role.create({
    id: 3,
    name: "admin"
  });
}
