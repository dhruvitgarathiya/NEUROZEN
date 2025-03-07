const jwt = require("jsonwebtoken");
const User = require("../models/user.model.js");
const { oAuth2Client } = require("../config/google.config");

const secureRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
   
    if (!authHeader) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "No token, authorization denied" });
    }

   

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ error: "No user found" });
    }

    req.user = user;
    if (req.session.tokens) {
      oAuth2Client.setCredentials(req.session.tokens);
    }
    req.userProfileData = req.session.userProfile; // Access userProfileData from session

    next();
  } catch (error) {
    console.log("Error in secureRoute: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = secureRoute;