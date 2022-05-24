const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");
const { registerValidation, loginValidation } = require("../validation");

//POST NEW USER
route.post("/register", async (req, res) => {
  const { name, password, email } = req.body;

  try {
    //VALIDATION CHECK
    const { error } = registerValidation(req.body);

    if (error) {
      throw error.details[0].message;
    }

    //CHECK IF EMAIL ALREADY EXISTS
    const emailExists = await User.findOne({ email: email }).exec();

    if (emailExists) {
      throw "Email already exists. Please register with a unique email.";
    }

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);

    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      password: hashPassword,
      email,
    });

    await User.create(newUser);

    res.status(200).send({ newUser: newUser._id });
  } catch (error) {
    res.status(400).send({ error });
  }
});

//LOGIN EXISTING USER
route.post("/login", async (req, res) => {
  const { password, email } = req.body;

  try {
    //VALIDATION CHECK
    const { error } = loginValidation(req.body);

    if (error) {
      throw error.details[0].message;
    }

    //CHECK IF EMAIL EXISTS
    const user = await User.findOne({ email: email }).exec();

    if (!user) throw "User email does not exist";

    const comparePassword = await bcrypt.compare(password, user.password);

    if (!comparePassword) throw "Passwords don't match";

    //GENERATE TOKEN
    const token = jwt.sign(
      { _id: user._id, name: user.name },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token", token).send(token);
  } catch (error) {
    res.status(400).send({ error });
  }
});

module.exports = route;
