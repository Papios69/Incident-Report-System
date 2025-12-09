import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import User from "../models/user.model.js";
import config from "../config/config.js"; // adjust path if your config is different

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user || !user.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "Email and password do not match" });
    }

    const token = jwt.sign({ _id: user._id }, config.jwtSecret, {
      expiresIn: "7d",
    });

    return res.json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Signin error:", err);
    return res.status(400).json({ error: "Could not sign in" });
  }
};

const signout = (req, res) => {
  return res.json({ message: "Signed out" });
};

const requireSignin = expressjwt({
  secret: config.jwtSecret,
  algorithms: ["HS256"],
  requestProperty: "auth",
});

const me = async (req, res) => {
  try {
    const userId = req.auth?._id;
    if (!userId) {
      return res.status(401).json({ error: "Not authenticated" });
    }

    const user = await User.findById(userId).select("_id name email createdAt");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.json(user);
  } catch (err) {
    return res.status(400).json({ error: "Could not load profile" });
  }
};

export default { signin, signout, requireSignin, me };
