const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { title } = require("process");

router.get("/", (req, res) => {
  Users.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", { title: "All Users", users: result });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/", async (req, res) => {
  const { reg_no, name, email, branche, phone, address } = req.body;

  const user = new Users({
    reg_no,
    name,
    email,
    branche,
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

router.get("/create", (req, res) => {
  res.render("create", { title: "Create New User" });
});

router.get("/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .render("404", { message: "Utilisateur non trouvé" });
    }
    res.render("details", { user: user, title: "Détails de l'utilisateur" });
    console.log("Utilisateur supprimé avec succès");
  } catch (err) {
    console.error(err);
    res.status(500).render("404", { message: "Erreur serveur" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const result = await Users.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ redirect: "/" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
