const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
//User Model

const User = require("../../models/User");

// @route  Creat User api/users
// @desc   Register new user
// @access Public
router.post("/", (req, res) => {
  const { fname, lname, email, phone_no, password } = req.body;

  //Simple Validation
  if (!fname || !email || !password) {
    return res.status(400).json({ msg: "Please enter all values" });
  }

  //Check the user exist

  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });
    const newUser = new User({
      fname,
      lname,
      email,
      phone_no,
      password
    });
    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            {
              expiresIn: 3600
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.fname,
                  email: user.email
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
