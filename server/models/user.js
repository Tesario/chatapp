import mongoose from "mongoose";
import sha256 from "js-sha256";

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: {
    type: String,
    required: [true, "Please fill an email field"],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "E-mail is not a valid",
    ],
  },
  name: {
    type: String,
    required: [true, "Please fill a name field"],
    unique: true,
    match: [/^[a-zA-Z0-9_.]+$/, "Username is not valid"],
    maxlength: [15, "Maximum length for username is 15 characters"],
    minlength: [3, "Minimum length for username is 3 characters"],
  },
  lowerCaseName: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please fill a password field"],
    minlength: [6, "Minimum length for password is 6 characters"],
    select: false,
  },
  picture: {
    type: String,
    required: true,
    default: "/default-profile-picture.png",
  },
  cloudinary_id: {
    type: String,
    required: true,
    default: null,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await sha256(this.password + process.env.SALT);
});

UserSchema.pre("update", function (next) {
  this.options.runValidators = true;
  next();
});

// Model
const User = mongoose.model("User", UserSchema);

export default User;
