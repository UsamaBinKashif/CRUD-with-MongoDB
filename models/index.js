const mongoose = require("mongoose"); //initializing mongoose

//creating user schema
const usersSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    job_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
//intializing users schema as a module
const USER = mongoose.model("user", usersSchema);
module.exports = USER;
