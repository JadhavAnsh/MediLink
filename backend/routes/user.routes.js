const express = require("express");
const { getAllUsers, getUserById, updateUser, deleteUser } = require("../controllers/user.controller");
const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserById);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

module.exports = userRouter;