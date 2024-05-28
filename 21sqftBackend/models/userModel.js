import mongoose from "mongoose";
import Validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      // required: true,
      unique: true,
      validate(value) {
        if (!Validator.isEmail(value)) {
          throw new Error("Invalid Email")
        }
      }
    },
    userName: {
      type: String,
      trim: true,
      unique: [true, "This user name has been already taken"],
      // unique: true,
      // validate: {
      //   validator: async function (value) {
      //     const user = await this.constructor.findOne({ userName: value });
      //     if (user) {
      //       return false; // userName already exists
      //     }
      //     return true; // userName is unique
      //   },
      //   message: props => `${props.value} is already taken!`
      // }
    },
    password: {
      type: String,
    },
    otp: {
      type: String,
    },
    otpExpireAt: {    //OTP expiration time
      type: Date,
    },
    userRole: {
      type: String,
      default: "user"
    },
    likedBusinesses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contractor' }],
  },
  { timestamps: true }
);


// password hashing
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// create jwt token
userSchema.methods.createJWT = async function () {
  return jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    process.env.JWT_KEY,
    // JWT_KEY,
    {
      expiresIn: "7d",
    }
  );
};


// compare password
userSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// creating model
export const User = mongoose.model("User", userSchema);
