const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const createTokenAndSaveCookie = require("../jwt/generateToken.js");

exports.signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    console.log(req.body);
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already registered" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      fullname:name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    if (newUser) {
      console.log(createTokenAndSaveCookie(newUser._id, res));
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: newUser._id,
          fullname: newUser.fullname,
          email: newUser.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ error: "Invalid user credential" });
    }
    createTokenAndSaveCookie(user._id, res);
    const token=createTokenAndSaveCookie(user._id, res);

    res.status(201).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token:{
        token
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    res.status(201).json({ message: "User logged out successfully" });
  } catch (error) {
    
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.allUsers = async (req, res) => {
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUser },
    }).select("-password");
    res.status(201).json(filteredUsers);
  } catch (error) {
    console.log("Error in allUsers Controller: " + error);
  }
};

exports.getMyDetails =  async (req, res) => {
  try {
    // The user ID is set in req.user by the authentication middleware
    const user = await User.findById(req.user.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}