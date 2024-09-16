const express = require("express");
const router = express.Router();
const Users = require("../models/users");
const { title } = require("process");
const usersController = require("../controllers/usersControllers");

const app = express();

router.get("/", usersController.getAllUsers);
router.post("/", usersController.postUser);
router.get("/create", usersController.createUser);
router.get("/:id", usersController.getUserById);
router.delete("/:id", usersController.deleteUser);

// Gestion des erreurs
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});

module.exports = router;
