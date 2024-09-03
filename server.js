const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Users = require("./models/users");
const { title } = require("process");

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
  res.render("index", { title: "All-Users" });
});
app.get("/about", (req, res) => {
  res.render("about", { title: "404" });
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
