const express = require("express");
const { signUp, logIn, logOut, emailverifyRequest, emailverifySubmit } = require("../controllers/user.controller.js");
const { verifyAccessToken } = require("../middlewares/auth.middleware.js");
const authRouter = express.Router();

authRouter.post("/sign-up", signUp);

authRouter.post("/log-in", logIn);

authRouter.post("/log-out", logOut);

authRouter.get('/email-verify/request',verifyAccessToken, emailverifyRequest);

authRouter.post('/email-verify/submit',verifyAccessToken, emailverifySubmit);

module.exports = authRouter;