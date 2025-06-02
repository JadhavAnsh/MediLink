const express = require("express");
const { signUp, logIn, logOut, emailverifyRequest, emailverifySubmit, getProfile, updateProfile, deleteProfile } = require("../controllers/auth.controller.js");
const { verifyAccessToken } = require("../middlewares/auth.middleware.js");
const authRouter = express.Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/log-in", logIn);

authRouter.post("/log-out", logOut);

authRouter.get('/email-verify/request',verifyAccessToken, emailverifyRequest);

authRouter.post('/email-verify/submit',verifyAccessToken, emailverifySubmit);

authRouter.get("/profile",verifyAccessToken, getProfile);             // Get logged-in user profile

authRouter.put("/profile",verifyAccessToken, updateProfile);          // Update logged-in user profile

authRouter.delete("/profile",verifyAccessToken, deleteProfile);       // Delete own account


module.exports = authRouter;