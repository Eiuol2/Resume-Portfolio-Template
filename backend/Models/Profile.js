const mongoose = require("mongoose");
const Schema = mongoose.Schema;
let profileSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    major: {
      type: String,
      required: true,
    },
    desiredRole: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    collection: "profiles",
  }
);

module.exports = mongoose.model("Profile", profileSchema);
