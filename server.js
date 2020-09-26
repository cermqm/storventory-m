// Requiring necessary npm packages
const express = require("express");
const session = require("express-session");
// Requiring passport as we've configured it
const passport = require("./config/passport");
const exphbs = require("express-handlebars");
// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 8080;
const db = require("./models");

// added for shopping list
const helpers = require("handlebars-helpers");
const math = helpers.math();

console.log(math);

// Creating express app and configuring middleware needed for authentication
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

app.engine("handlebars", exphbs({ defaultLayout: "template" }));
app.set("view engine", "handlebars");

// Requiring our routes
require("./controllers/loginController.js")(app);
require("./controllers/restaurantsController.js")(app);
require("./controllers/inventoryController.js")(app);
require("./controllers/shopController.js")(app);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => {
    seed();
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

function seed() {
  db.User.create({ email: "johndoe@somewhere.com", password: "hello" });
  db.User.create({ email: "mmink@michaelamink.com", password: "mminkmmink" });
  db.User.create({ email: "cermqm@gmail.com", password: "cermqmcermqm" });
  db.User.create({ email: "dmink@gmail.com", password: "dminkdmink" });
  db.User.create({ email: "jenni@michaelamink.com", password: "jennijenni" });
  db.Restaurant.create({
    name: "Tacos everywhere",
    location: "Overbrook, KS",
    userid: 1
  });
  db.Restaurant.create({
    name: "Doves Nest",
    location: "Effingham, Kansas",
    userid: 1
  });
  db.Restaurant.create({
    name: "Doves Nest",
    location: "Lake Perry, Kansas",
    userid: 1
  });
  db.Restaurant.create({
    name: "Brass Rail",
    location: "Kansas City, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "El Maguey Mexican Restaurant",
    location: "Kansas City, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Jason's Deli",
    location: "Kansas City, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Stroud's",
    location: "Kansas City, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Yard House",
    location: "Kansas City, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Corner Cafe",
    location: "Liberty, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Corner Cafe",
    location: "RiverSide, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Stone Canyon Pizza",
    location: "Gladstone, Missouri",
    userid: 1
  });
  db.Restaurant.create({
    name: "Winstead's Steakburgers",
    location: "Kansas City, Missouri",
    userid: 1
  });
  db.InventoryItem.create({
    name: "Laura's 96% Lean Ground Beef",
    quantity: 10,
    stockAmount: 15,
    stockNumber: "0061266931706",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Simple Truth Organic™ Free Range Chicken Breast Tenders",
    quantity: 13,
    stockAmount: 20,
    stockNumber: "0021066450000",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Coca-Cola Soda 6 Bottles",
    quantity: 22,
    stockAmount: 50,
    stockNumber: "0004900002468",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Pepsi Cola Soda 6 Pack Bottles",
    quantity: 37,
    stockAmount: 50,
    stockNumber: "0001200050405",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Beef Choice Boneless Top Loin Strip Steak (1 Steak)",
    quantity: 55,
    stockAmount: 100,
    stockNumber: "0020223600000",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Budweiser Lager",
    quantity: 30,
    stockAmount: 50,
    stockNumber: "0001820011047",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Coors Light American Light Lager Beer",
    quantity: 28,
    stockAmount: 50,
    stockNumber: "0007199000048",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Tyson Fully Cooked Crispy Chicken Strips",
    quantity: 18,
    stockAmount: 30,
    stockNumber: "0002370001410",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "Wonder Classic Enriched Hamburger Buns 8 Count",
    quantity: 20,
    stockAmount: 40,
    stockNumber: "0007225002109",
    restaurantid: 1
  });
  db.InventoryItem.create({
    name: "  Frito-Lay Family Fun Snacks & Chips Mix Variety Pack 18 Count",
    quantity: 15,
    stockAmount: 25,
    stockNumber: "0002840015463",
    restaurantid: 1
  });
}
