import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  service: {
    type: String,
  },
  message: {
    type: String,
  }
});

export const Contact = new mongoose.model("Contact", userSchema);