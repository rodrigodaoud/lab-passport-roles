// routes/auth-routes.js
const express = require("express");
const createRoute = express.Router();

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

createRoute.get("/create", (req, res, next) => {
  res.render("create");
});

createRoute.post("/create", (req, res, next) => {
  const username  = req.body.username;
  const password  = req.body.password;
  const firstName = req.body.firstName;
  const lastName  = req.body.lastName;
  const role      = req.body.role;

  if (username === "" || password === "") {
    res.render("create", { message: "Indicate username and password" });
    return;
  }

  User.findOne({ username }, "username", (err, user) => {
    if (user !== null) {
      res.render("create", { message: "The username already exists" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
      firstName,
      lastName,
      role
    });

    newUser.save((err) => {
      if (err) {
        res.render("create", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
  });
});

module.exports = createRoute;