const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    pwd: {
      type: String,
      required: true,
    },
  },
  {
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
