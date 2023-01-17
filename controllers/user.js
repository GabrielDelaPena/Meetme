const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// REGISTER
exports.register = async (req, res) => {
  const role = "User";
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(400).send("Email already exist.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    role: role,
    firstname: firstname,
    lastname: lastname,
    email: email,
    password: hashedPassword,
  });

  try {
    await user.save();
    res.status(200).send("User registered.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

// LOGIN
exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("Email or Password invalid.");
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!isEqual) {
    return res.status(400).send("Email or Password invalid.");
  }

  const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: "1h",
  });
  res.status(200).json({ token: token, userID: user._id });
};

// UPDATE PASSWORD
exports.updatePassword = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.status(400).send("No User found with the given email.");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  try {
    user.password = hashedPassword;
    await user.save();
    res.status(200).send("Password Updated.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
  const userID = req.body.userID;

  const user = await User.findOne({ _id: userID });
  if (!user) {
    return res.status(400).send("No User found.");
  }

  try {
    await User.findByIdAndRemove(userID);
    res.status(200).send("User deleted.");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error Server Side.");
  }
};
