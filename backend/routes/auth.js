const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Session = require("../models/Session");

const router = express.Router();

/* REGISTER */
router.post("/register", async (req, res) => {
  try {
    console.log("BODY:", req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const hashed = await bcrypt.hash(password, 10);
    await User.create({ username, email, password: hashed });

    res.json({ message: "Registered" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* LOGIN */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Wrong password" });

    await Session.updateMany({ userId: user._id }, { isActive: false });
    const session = await Session.create({ userId: user._id });

    const token = jwt.sign(
      { userId: user._id, sessionId: session._id },
      process.env.JWT_SECRET
    );

    res.json({
  success: true,
  token
});

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
