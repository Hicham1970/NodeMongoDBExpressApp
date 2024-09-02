// Ici on aura le schema et le model de notre blog document
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    snippet: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // mise a jour  automatique des champs createdAt et updatedAt
// Ici on compile le schema en model
const Blog = mongoose.model("Blog", blogSchema);
//export le model
module.exports = Blog;
