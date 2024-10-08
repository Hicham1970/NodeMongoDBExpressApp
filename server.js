const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Users = require("./models/users");
const { title } = require("process");
const Users = require("./models/users");

dotenv.config();

const app = express();
const PORT = process.env.PORT;
const MONGOURLDBMYDATABASE = process.env.MONGOURLDBMYDATABASE;

// Register view engin : moteur de vues
app.set("view engine", "ejs");
// set path
app.set("views", path.join(__dirname, "views"));

//Cela permettra à Express.js de lire et d'extraire les données du corps de la requête, et de les rendre disponibles dans req.body:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()); // Ajoutez cette ligne pour parser le JSON du corps de la requête
app.use(express.static("public"));
// app.use(express.static("public"));

mongoose
  .connect(MONGOURLDBMYDATABASE)
  .then((result) => {
    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT} and connected to your database`
      );
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to My Database");
});

app.get("/", (req, res) => {
  const users = [
    {
      reg_no: "M131K",
      name: "Vladimir",
      email: "black.swan@gmail.com",
      branche: "IT",
      phone: "0663456789",
      address: "N° 12 AV. des oiseaux qui volent",
    },
    {
      reg_no: "K009K",
      name: "Putin",
      email: "put.ukraina@gmail.com",
      branche: "SCG",
      phone: "0663222689",
      address: "N° 13 St. Bel Air Ain Harris  ",
    },
  ];
  res.render("index", { title: "All-Users", users: users });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});
app.get("/users/create", (req, res) => {
  res.render("create", { title: "Create New User" });
});
// poster le form:

app.post("/post", async (req, res) => {
  const { reg_no, name, email, branch, phone, address } = req.body;

  const user = new Users({
    reg_no,
    name,
    email,
    branch,
    phone,
    address,
  });
  try {
    await user.save();
    console.log("Data was submitted successfully !");
    // redirect ver '/' :
    res.redirect("/");
  } catch (error) {
    res.status(400).send("Error saving data: " + error.message);
  }
});

// create the 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
