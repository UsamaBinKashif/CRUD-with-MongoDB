const USER = require("../models"); //getting user model from models

//get all user
const handleGetAllUsers = async (req, res) => {
  const users = await USER.find({});
  if (!users) {
    return res.status(404).json({ msg: "users not found" });
  }
  res.json(users);
};

//get all users mapped to HTML only names
const handleGetAllMappedUsers = async (req, res) => {
  const users = await USER.find({});
  if (!users) {
    return res
      .status(404)
      .json({ status: "error", message: "Users not found" });
  }
  const html = `
        <ul>
        ${users
          .map((user) => `<h2>${user.first_name} ${user.last_name}</h2>`)
          .join("")}
        </ul>
        `;

  res.send(html);
};

//get user by id
const handleGetUserByID = async (req, res) => {
  const user = await USER.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  res.send(user);
};

//create a new user
const handleCreateUser = async (req, res) => {
  const body = req.body;

  if (!body) {
    return res
      .status(404)
      .json({ msg: "Please chech all the fields are filled" });
  }

  const result = await USER.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  return res.status(201).json({
    msg: "created a user",
    data: result,
  });
};

//update an existing user
const handleUpdateUser = async (req, res) => {
  const body = req.body;
  const user = await USER.findByIdAndUpdate(req.params.id, {
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }
  return res.json({ msg: "success" });
};

//delete user
const handleDeleteUser = async (req, res) => {
  const user = await USER.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ status: "error", message: "User not found" });
  }

  return res.status(200).json({ status: "deleted" });
};

//exporting all the functions
module.exports = {
  handleGetAllUsers,
  handleGetAllMappedUsers,
  handleGetUserByID,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser,
};
