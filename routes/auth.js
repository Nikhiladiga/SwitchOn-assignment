const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // CHECK Db and send appropriate response
  try {
    const user = await User.findOne({
      email,
      password
    });
    if (!user) {
      throw new Error("invalid user");
    } else {
      res.json({
        success: true,
        token: jwt.sign({ email }, process.env.JWT_SECRET)
      });
    }
  } catch (e) {
    res.json({ success: false });
  }
});

router.post("/check_auth", (req, res) => {
  try {
    jwt.verify(req.body.token, process.env.JWT_SECRET);
    res.json({ success: true });
  } catch (e) {
    res.json({ success: false });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const savedUser = await new User({
      name,
      email,
      password
    }).save();

    res.json({
      success: true,
      token: jwt.sign({ email }, process.env.JWT_SECRET)
    });
  } catch (e) {
    res.json({
      success: false
    });
  }
});

module.exports = router;
