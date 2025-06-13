const jwt = require("jsonwebtoken");

function verifyAccessToken(req, res, next) {
  try {
    if (!req.headers.authorization) {
      throw "invalid access";
    }

    const verifiedData = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );

    // ✅ Set a single object on req.user
    req.user = {
      email: verifiedData.email,
      role: verifiedData.role,
      id: verifiedData.userId
    };

    console.log("Verified user:", req.user);

    next();

  } catch (error) {
    return res.status(403).json({
      message: "authentication failed",
      error: "invalid access",
      data: null,
    });
  }
}


module.exports = {
  verifyAccessToken,
};
