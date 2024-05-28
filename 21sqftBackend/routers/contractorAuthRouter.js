import express from "express";
import {
    contractorRegister,
    contractorLogin,
    supplierForgotPasswordSendOTP,
    supplierForgotPasswordVerifyOTP,
    supplierForgotPasswordChangePassword
} from "../controllers/contractorAuthController.js";

const router = express.Router();

router.post("/register", contractorRegister);
router.post("/login", contractorLogin);

router.post("/forgotpassword/otp/send", supplierForgotPasswordSendOTP);
router.post("/forgotpassword/otp/verify", supplierForgotPasswordVerifyOTP);
router.post("/forgotpassword/change-password", supplierForgotPasswordChangePassword);

export default router;