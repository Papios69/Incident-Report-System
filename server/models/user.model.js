import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      unique: "Email already exists",
      required: "Email is required",
      match: [/.+@.+\..+/, "Please fill a valid email address"],
    },
    passwordHash: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Virtual field for plain-text password (not stored)
UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.passwordHash = bcrypt.hashSync(password, 10);
  })
  .get(function () {
    return this._password;
  });

UserSchema.methods.authenticate = function (plainText) {
  return bcrypt.compareSync(plainText, this.passwordHash);
};

export default mongoose.model("User", UserSchema);
