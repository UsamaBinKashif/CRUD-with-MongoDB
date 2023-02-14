//intiailizing express
const express = require("express");
//intializing express router
const router = express.Router();
//getting all the crud opertions from controller
const {
  handleGetAllUsers,
  handleGetAllMappedUsers,
  handleCreateUser,
  handleGetUserByID,
  handleUpdateUser,
  handleDeleteUser,
} = require("../controllers");

//GET, POST
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

//GET
router.get("/names", handleGetAllMappedUsers);

// GET, PATCH, DELETE
router
  .route("/:id")
  .get(handleGetUserByID)
  .patch(handleUpdateUser)
  .delete(handleDeleteUser);

//exporting all the routes
module.exports = { userRouter: router };
