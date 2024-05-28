import { Contractor } from "../models/contractorModel.js";
import { User } from "../models/userModel.js";
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

// contractor registration
export const contractorRegister = async (req, res) => {
  try {
    const imageBase64 = req.body.image;

    const { name, phoneNo,email, service, address, city, state, password, price, shortDescription } = req.body;

    // Validation checks
    if (!name || !phoneNo || !email || !service || !address || !city || !state || !password || !price || !shortDescription || !imageBase64) {
      return res.status(400).json({ success: false, message: "All Fields Are Required" });
    }

    if (phoneNo.length !== 10 || !/^[0-9]{10}$/.test(phoneNo) || !validator.isMobilePhone(phoneNo, 'en-IN')) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) || !validator.isEmail(email)) {
        return res.status(400).json({ success: false, message: "Invalid Email" });
      }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Password length must be at least 6 characters" });
    }

    // Check if user already exists
    const existingUser = await Contractor.findOne({  email: email, phoneNo: phoneNo });

    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already registered" });
    }

    // Create and save the new user
    const newUser = await Contractor.create({
      name,
      phoneNo,
      email,
      service,
      price,
      shortDescription,
      address,
      city,
      state,
      password,
      // image: [image],
      image: imageBase64,
    });

    // Generate token
    const token = await newUser.createJWT();

    // Set cookie
    res.cookie("21sqft", token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      // sameSite: 'Strict',
    });

    // Respond with success and user details
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      token,
      contractor: {
        id: newUser._id,
        name: newUser.name,
        phoneNo: newUser.phoneNo,
        email: newUser.email,
        service: newUser.service,
        shortDescription: newUser.shortDescription,
        price: newUser.price,
        address: newUser.address,
        city: newUser.city,
        state: newUser.state,
        image: newUser.image,
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


// contractor/supplier login
export const contractorLogin = async (req, res, next) => {
  const { phoneNo, password } = req.body;

  try {
    if (!phoneNo) {
      return res.status(400).json({ success: false, message: "Phone number is required" });
    }

    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    if (phoneNo.length !== 10 || !/^[0-9]{10}$/.test(phoneNo) || !validator.isMobilePhone(phoneNo, 'en-IN')) {
      return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }

    if (password.length < 6) {
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }

    // Find user by phone number
    let user = await Contractor.findOne({ phoneNo }).select("+password");

    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(400).json({ success: false, message: "Invalid phone number or password" });
    }

    // Generate JWT token
    const token = await user.createJWT();

    // Clear password field from user object
    user.password = undefined;

    // Set cookie
    res.cookie("21sqft", token, {
      expires: new Date(Date.now() + 9000000),
      httpOnly: true,
      secure: true,
      sameSite: 'None',
      // sameSite: 'Strict',
    });

    // Send response
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      contractor: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNo: user.phoneNo,
        service: user.service,
        shortDescription: user.shortDescription,
        price: user.price,
        address: user.address,
        city: user.city,
        state: user.state,
        image: user.image
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


// send otp on mail
export const supplierForgotPasswordSendOTP = async (req, res, next) => {
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
    let user = await Contractor.findOne({ email });

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
export const supplierForgotPasswordVerifyOTP = async (req, res, next) => {
  try {
    const user = await Contractor.findOne({ email: req.body.email });

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
export const supplierForgotPasswordChangePassword = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(req.body.email);
  console.log(req.body);
  try {
    let data = await Contractor.findOne({ email });

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
