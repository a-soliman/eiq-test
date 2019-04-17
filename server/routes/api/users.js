const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const User = require("../../models/User");
const keys = require("../../config/keys");

/*
    @route      GET api/users/google
    @desc       Startes Google Authentication
    @access     Public
*/
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

/*
    @route      GET api/users/google/redirect
    @desc       Redirects to home after an authentication process
    @access     Public
*/
router.get("/google/redirect/", passport.authenticate("google"), (req, res) => {
  let user = req.user;
  const payload = { id: user.id, name: user.name, avatar: user.avatar };
  jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
    if (err) {
      errors.serverError = "Internal server error.";
      return res.status(500).json(errors);
    }
    res.redirect("/" + `?token=Bearer ${token}`);
  });
});

/*
    @route      GET api/users/current
    @desc       Return current user
    @input      JWT Token
    @access     Private
*/
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userFildsExcludingPassword = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.name,
      avatar: req.user.avatar
    };

    res.json(userFildsExcludingPassword);
  }
);
module.exports = router;
