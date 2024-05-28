import express from "express";
import AdminAuth from "../middlewares/adminAuthMiddleware.js";
import {
    // AdminRegister,
    AdminLogin,
    updateContractorStatus,
} from "../controllers/adminController.js";

const router = express.Router();

// router.post("/register", AdminRegister);
router.post("/login", AdminLogin);
router.put("/update/contractor-status/:_id", AdminAuth, updateContractorStatus);

export default router;
