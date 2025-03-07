const express = require("express");
const router = express.Router();
const UserProfileController = require("../controllers/UserProfile.controller");
const secureRoute=require('../middleware/secureRoute')

router.post("/",secureRoute, UserProfileController.createUserProfile);
router.get("/:id",secureRoute, UserProfileController.getUserProfile);
router.put("/:id",secureRoute, UserProfileController.updateUserProfile);
router.delete("/:id",secureRoute, UserProfileController.deleteUserProfile);

router.get("/user/:userId", UserProfileController.getUserProfileByUserId);
router.put("/user/:userId", UserProfileController.updateUserProfileByUserId);
router.delete("/user/:userId", UserProfileController.deleteUserProfileByUserId);

module.exports = router;