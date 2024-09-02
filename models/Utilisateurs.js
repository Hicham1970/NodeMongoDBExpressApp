// Ici on aura le schema et le model de notre blog document
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
); // mise a jour  automatique des champs createdAt et updatedAt
// Ici on compile le schema en model
const User = mongoose.model("User", UserSchema);
//export le model
module.exports = User;
