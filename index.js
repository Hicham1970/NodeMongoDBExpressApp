const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const path = require("path");

dotenv.config();
const MONGOURL = process.env.MONGOURL;
const PORT = process.env.PORT || 3000;

const app = express();

// Configuration du moteur de vue
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connexion à MongoDB
mongoose
  .connect(MONGOURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
      console.log("Connecté à MongoDB");
    });
  })

  .catch((err) => console.error("Erreur de connexion à MongoDB:", err));

// Routes
app.get("/", (req, res) => {
  res.render("index", { title: "Accueil" });
});

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Quelque chose s'est mal passé !");
});

// Démarrage du serveur
