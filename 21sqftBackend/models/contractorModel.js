import mongoose from "mongoose";
import Validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const contractorSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  phoneNo: {
    type: String,
    // required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return Validator.isMobilePhone(value, 'any', { strictMode: false });
      },
      message: 'Please enter a valid phone number'
    }
  },
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
  service: {
    type: String,
  },
  address: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: [String],
    required: true,
  },
  price: {
    type: String,
  },
  shortDescription: {
    type: String,
  },
  description: {
    type: String,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  totalLikes: {
    type: Number,
    default: 0,
  },
  otp: {
    type: String,
  },
  otpExpireAt: {    //OTP expiration time
    type: Date,
  },
  userRole: {
    type: String,
    default: "contractor"
  },
  status: {
    type: String,
    default: "Pending"
  }
});

// password hashing
contractorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});


// create jwt token
contractorSchema.methods.createJWT = async function () {
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
contractorSchema.methods.comparePassword = async function (userPassword) {
  const isMatch = bcrypt.compare(userPassword, this.password);
  return isMatch;
};

// creating model
export const Contractor = new mongoose.model("Contractor", contractorSchema);
