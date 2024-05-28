import express from "express";
import {
  contractorEdit,
  contractorLogout,
  getContractor,
  getAllContractor,
  getContractorDetails,
  search,
  like,
} from "../controllers/contractorController.js";
import ContractorAuth from "../middlewares/contractorAuthMiddleware.js";
import UserAuth from "../middlewares/userAuthMiddleware.js";
import upload from "../middlewares/imageUpload.js";

const router = express.Router();

// contractor/supplier route
// router.post("/register", upload.single("file"), contractorRegister);
router.get("/profile", ContractorAuth, getContractor);
// router.put("/edit", ContractorAuth, upload.array("file", 10), contractorEdit);
router.put("/edit", ContractorAuth, contractorEdit);
router.get("/logout", ContractorAuth, contractorLogout);

router.get("/get-all", getAllContractor);
router.get("/get-details/:id", getContractorDetails);
router.put("/like", UserAuth, like);
router.get("/search", search);

export default router;