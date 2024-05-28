import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";
import nodemailer from 'nodemailer';

// nodemailer
export const mailer = (email, otp) => {

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.NODEMAILER_EMAIL_ID,
      pass: process.env.NODEMAILER_EMAIL_ID_PASSWORD
    },
    tls: {
      // Disable SSL certificate verification
      rejectUnauthorized: false
    }
  });

  var mailOptions = {
    from: "", // sender address
    to: email, // list of receivers
    subject: "Password Reset OTP", // Subject line
    text: `Your OTP for resetting the password is: ${otp}. Please use this OTP within the next 5 minutes to reset your password.`
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

// user registration
export const userRegister = async (req, res, next) => {
  try {
    const { email, userName, password } = req.body;

    // Validation checks
    if (!email || !userName || !password) {
      return res.status(400).json({ success: false, message: "All Fields Are Required" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password length must be at least 6 characters" });
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }


    // Check if user already exists
    // const existingUser = await User.findOne({ email: email, userName: userName });

    // if (existingUser) {
    //   return res.status(400).json({ success: false, message: "User already register" });
    // }
    // Check if user already exists by email or username
    const existingUserByEmail = await User.findOne({ email });
    const existingUserByUserName = await User.findOne({ userName });

    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: "User with this email already exists" });
    }

    if (existingUserByUserName) {
      return res.status(400).json({ success: false, message: "User with this username already exists" });
    }

    // Create and save the new user
    const newUser = await User.create({
      email, userName, password
    });

    // Generate token
    const token = await newUser.createJWT();

    // Save the user with the token
    await newUser.save();

    // Set cookie
    res.cookie("21sqft", token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
      secure: true,
      // sameSite: 'Strict',
      sameSite: 'None',
    });

    // Respond with success and user details
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      token,
      user: {
        _id: newUser._id,
        email: newUser.email,
        userName: newUser.userName,
      }
    });
  } catch (error) {
    // Handle Mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      Object.keys(error.errors).forEach((key) => {
        validationErrors[key] = error.errors[key].message;
      });
      console.log('Validation errors:', validationErrors);
      return res.status(400).json({ success: false, errors: validationErrors });
    }
    // Handle other errors
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


// login candidate
export const userLogin = async (req, res, next) => {

  const { userName, password } = req.body;

  if (!userName) {
    return res.status(400).json({ success: false, message: "Username is required" });
  }

  if (!password) {
    return res.status(400).json({ success: false, message: "Password is required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ success: false, message: "Wrong Email Or Password" });
  }

  let user = await User.findOne({ userName }).select("+password");

  if (!user) return res.status(400).json({ success: false, message: "Wrong Email Or Password" });

  const check = await user.comparePassword(password);

  if (!check) return res.status(400).json({ success: false, message: "Wrong Email Or Password" });

  const token = await user.createJWT();
  // console.log(token);
  user.password = undefined;

  // cookie generate
  res.cookie("21sqft", token, {
    expires: new Date(Date.now() + 9000000),
    httpOnly: true,
    secure: true,
    // sameSite: 'Strict',
    sameSite: 'None',
  });

  // user.password = undefined;
  user = { ...user._doc, token };

  res.status(200).json({
    message: "Login in successfully",
    success: true,
    token,
    user: {
      _id: user._id,
      email: user.email,
      userName: user.userName,
    }
  });
};


// get user profile
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    // Extract only the fields you want to send to the frontend
    const { _id, userName, email, likedBusinesses } = user;

    res.status(200).json({
      success: true,
      user: {
        _id,
        userName,
        email,
        likedBusinesses
      }
    });
  } catch (error) {
    console.error("Error fetching User profile:", error);
    res.status(500).json({
      success: false,
      message: "Something Went Wrong",
    });
  }
};


// edit profile
export const editUserProfile = async (req, res) => {
  try {
    const { email, userName, newPassword, confirmPassword } = req.body;

    // Consolidated validation checks
    if (!email || !userName || !newPassword || !confirmPassword) {
      return res.status(400).json({ success: false, message: "All Fields Are Required" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (newPassword.length < 6 || confirmPassword.length < 6) {
      return res.status(400).json({ success: false, message: "Password length must be at least 6 characters" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ success: false, message: "Password and confirm password do not match" });
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const newHashPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password in the database
    const updatedUser = await User.findByIdAndUpdate(req.user.userId, {
      $set: {
        email,
        userName,
        password: newHashPassword,
      },
    }, { new: true }); // { new: true } ensures that the updated document is returned

    if (!updatedUser) {
      return res.status(500).json({ success: false, message: "Failed to update user profile" });
    }

    // Extract only the fields you want to send to the frontend
    const { _id, userName: updatedUserName, email: updatedEmail } = updatedUser;

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: {
        _id,
        userName: updatedUserName,
        email: updatedEmail
      }
    });
  } catch (error) {
    // Capture userName from req.body
    const { userName, email } = req.body;

    if (error.name === 'ValidationError') {
      // Validation error handling...
    } else if (error.code === 11000 && error.keyPattern?.userName === 1) {
      // Duplicate key error for userName
      return res.status(400).json({ success: false, message: `${userName} is already taken!` });
    } else if (error.code === 11000 && error.keyPattern?.email === 1) {
      // Duplicate key error for userName
      return res.status(400).json({ success: false, message: `${email} is already register!` });
    } else {
      // Other errors
      console.error('Profile update error:', error);
      res.status(500).json({ success: false, error: "Internal Server Error" });
    }
  }
};


// user logout
export const userLogout = async (req, res, next) => {

  res.cookie("21sqft", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out"
  })

}

// send otp on mail
export const userForgotPasswordSendOTP = async (req, res, next) => {
  const { email } = req.body;
  console.log('req.body', req.body);

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email" });
  }

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Email id does not exist" });
    }

    // Generate OTP and set expiry
    let otpcode = Math.floor(Math.random() * 10000 + 1);
    user.otp = otpcode;
    const otpExpireAt = new Date();
    otpExpireAt.setMinutes(otpExpireAt.getMinutes() + 5);
    user.otpExpireAt = otpExpireAt;

    // Save the updated user data
    await user.save();

    // Send the OTP via email using your mailer function
    mailer(email, otpcode);

    return res.status(200).json({
      success: true,
      message: "Please check your email. OTP is valid for 5 minutes"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: error.message || "Internal Server Error" });
  }
};


// ----verify otp----
export const userForgotPasswordVerifyOTP = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const currentTime = new Date().getTime();
    const diff = currentTime - user.otpExpireAt;

    if (diff > 0) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    if (user.otp === req.body.otp) {
      return res.status(200).json({ success: true, message: "OTP verified successfully" });
    } else {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//  ----Change password----
export const userForgotPasswordChangePassword = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body.email);
  console.log(req.body);
  try {
    let data = await User.findOne({ email });

    if (!data) {
      return res.status(404).json({ success: false, message: "Invalid OTP" });
    }

    let currentTime = new Date().getTime();
    let diff = data.otpExpireAt - currentTime;

    if (diff < 0) {
      return res.status(400).json({ success: false, message: "OTP Expired" });
    }

    data.password = password;
    await data.save();

    return res.status(200).json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};