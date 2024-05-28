import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
  },
});

export const Subscribe = new mongoose.model("Subscribe", userSchema);
