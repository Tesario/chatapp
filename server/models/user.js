import mongoose from "mongoose";

// Schema
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: String,
  name: String,
  password: String,
});

// Model
const User = mongoose.model("User", UserSchema);

export default User;
