const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const Users = require("./models/users");
const { title } = require("process");
const userRoutes = require("./routes/users.route");

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

// assurer la redirection avant d'utiliser les routes:
app.get("/", (req, res) => {
  res.redirect("/users");
});

// utilisation de userRoutes
app.use("/users", userRoutes);

// connection a la BD via mongoose
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

// user routes

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// create the 404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
