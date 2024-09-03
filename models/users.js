const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    reg_no: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    branch: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// creation du model:
const Users = mongoose.model("users", UserSchema);

// exporter le modèle:
module.exports = Users;
