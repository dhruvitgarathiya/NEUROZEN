const express = require("express");
const {
  allUsers,
  login,
  logout,
  signup,
  getMyDetails
} = require("../controllers/user.controller.js");
const secureRoute = require("../middleware/secureRoute.js");
const router = express.Router();
const User = require("../models/user.model.js");

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/allusers", secureRoute, allUsers);
router.get("/me", secureRoute,getMyDetails);

module.exports = router;