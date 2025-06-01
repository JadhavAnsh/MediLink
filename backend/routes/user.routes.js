const express = require("express");
const userRouter = express.Router();

userRouter.get("/users", getAllUsers);

userRouter.get("/users/:id", getUserById);

userRouter.put("/users/:id", updateUser);

userRouter.delete("/users/:id", deleteUser);

authRouter.get("/profile", getProfile);

authRouter.put("/profile", updateProfile);

authRouter.delete("/profile", deleteProfile);

module.exports = userRouter;