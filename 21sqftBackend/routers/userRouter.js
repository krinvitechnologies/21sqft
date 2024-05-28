import express from "express";
import {
  userRegister,
  userLogin,
  editUserProfile,
  userLogout,
  getUser,
  userForgotPasswordSendOTP,
  userForgotPasswordVerifyOTP,
  userForgotPasswordChangePassword
} from "../controllers/userController.js";
import UserAuth from "../middlewares/userAuthMiddleware.js";

const router = express.Router();

//user route
router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/get", UserAuth, getUser);
router.put("/edit", UserAuth, editUserProfile);
router.get("/logout", UserAuth, userLogout);
router.post("/forgotpassword/otp/send", userForgotPasswordSendOTP);
router.post("/forgotpassword/otp/verify", userForgotPasswordVerifyOTP);
router.post("/forgotpassword/change-password", userForgotPasswordChangePassword);

export default router;