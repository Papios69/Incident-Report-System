import User from "../models/user.model.js";

const create = async (req, res) => {
  try {
    const user = new User(req.body); // expects { name, email, password }
    await user.save();
    return res.status(200).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(400).json({ error: "Could not create user" });
  }
};

const list = async (req, res) => {
  try {
    const users = await User.find().select("_id name email createdAt updatedAt");
    return res.json(users);
  } catch (err) {
    return res.status(400).json({ error: "Could not list users" });
  }
};

const userByID = async (req, res, next, id) => {
  try {
    const user = await User.findById(id).select("_id name email createdAt updatedAt");
    if (!user) return res.status(400).json({ error: "User not found" });
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({ error: "Could not retrieve user" });
  }
};

const read = (req, res) => {
  return res.json(req.profile);
};

const update = async (req, res) => {
  try {
    let user = req.profile;
    user.name = req.body.name ?? user.name;
    user.email = req.body.email ?? user.email;

    if (req.body.password) {
      user.password = req.body.password; // triggers virtual and rehash
    }

    await user.save();
    return res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    return res.status(400).json({ error: "Could not update user" });
  }
};

const remove = async (req, res) => {
  try {
    const user = req.profile;
    await user.deleteOne();
    return res.json({ message: "User deleted" });
  } catch (err) {
    return res.status(400).json({ error: "Could not delete user" });
  }
};

export default { create, list, userByID, read, update, remove };
