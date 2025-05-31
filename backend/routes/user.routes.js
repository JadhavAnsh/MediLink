const express = require("express");
const userRouter = express.Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);

module.exports = userRouter;