const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");
//User Model

const User = require("../../models/User");

// @route  POST api/auth
// @desc   Auth user
// @access Public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all values" });
  }

  //Check the user exist

  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist" });
    // Validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });

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

// @route  GET api/auth/user
// @desc   GET user data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

// @route  GET api/auth/allUser
// @desc   GET user data
// @access Private
router.get("/allUser", auth, (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then(users => res.json(users));
});

// @route  DELETE api/auth/:id
// @desc   Delete a User
// @access Private
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(users => users.remove().then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }));
});

module.exports = router;
