const UserProfile = require("../models/UserProfile.model");

exports.createUserProfile = async (req, res) => {
  try {
    const userProfile = new UserProfile(req.body);
    await userProfile.save();
    res.status(201).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findById(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUserProfile = async (req, res) => {
  try {
    const userProfile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }
    res.status(200).json({ message: "UserProfile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserProfileByUserId = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOne({ userId: req.params.userId });
    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUserProfileByUserId = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }
    res.status(200).json(userProfile);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUserProfileByUserId = async (req, res) => {
  try {
    const userProfile = await UserProfile.findOneAndDelete({ userId: req.params.userId });
    if (!userProfile) {
      return res.status(404).json({ error: "UserProfile not found" });
    }
    res.status(200).json({ message: "UserProfile deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
