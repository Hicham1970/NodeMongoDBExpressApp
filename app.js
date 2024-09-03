const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const morgan = require("morgan");
const mongoose = require("mongoose");
const Blog = require("./models/blog");

dotenv.config();
const PORT = process.env.PORT;
const MONGOURLDBBLOGS = process.env.MONGOURLDBBLOGS;
const MONGOURLDBMYDATABASE = process.env.MONGOURLDBMYDATABASE;
// create application express:
const app = express();

// Mongoose connection:
mongoose
  .connect(MONGOURLDBMYDATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
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

// register views engin
app.set("views engin", "ejs");

//middlewares:
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// using the middleware morgan
app.use(morgan("dev"));

// Mongoose and Mongo sandbox routes
app.get("/add-blog", (req, res) => {
  // creation d'une nouvelle instance Blog:
  const blog = new Blog({
    title: "Second  blog post",
    snippet: "This is the second blog post",
    body: "C'est une injection mongoose faite par le second document de blog et cette fois dans myDatabase et ca crée une collection blogs si elle n'existe pas et y ajoute les nouveaux docs ",
  });
  //save the document:
  blog
    .save()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get all documents
app.get("/all-blogs", (req, res) => {
  Blog.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// get a single document:
app.get("/single-blog", (req, res) => {
  Blog.findById("66d4f85b870c86c6cf17a73f")
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// the blog or any collection routes

// page principale index par exemple
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/blogs", (req, res) => {
  Blog.find()
    .then((data) => {
      res.render("index", { title: "All blogs", blogs: data });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "about.html"));
});

app.get("/create", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "create.html"));
});

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

//* add the 404 doc
// gestion des erreurs:
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Une erreur est survenue !");
// });
