const express = require("express");
const { signUp, logIn, logOut, emailverifyRequest, emailverifySubmit, getProfile, updateProfile, deleteProfile } = require("../controllers/user.controller.js");
const authRouter = express.Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/log-in", logIn);

authRouter.post("/log-out", logOut);

authRouter.get('/email-verify/request', emailverifyRequest);

authRouter.post('/email-verify/submit', emailverifySubmit);

authRouter.get("/profile", getProfile);

authRouter.put("/profile", updateProfile);

authRouter.delete("/profile", deleteProfile);

module.exports = authRouter;