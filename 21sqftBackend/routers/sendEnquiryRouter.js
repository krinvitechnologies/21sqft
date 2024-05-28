import express from "express";
import { sendEnquiry } from "../controllers/sendEnquiryController.js";

const router = express.Router();

//user route
router.post("/:id", sendEnquiry);

export default router;