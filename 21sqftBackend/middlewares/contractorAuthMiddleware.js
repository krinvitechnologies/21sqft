import jwt from "jsonwebtoken";
import { Contractor } from "../models/contractorModel.js";

const ContractorAuth = async (req, res, next) => {
  const token = req.cookies['21sqft'];

  if (!token) {
    return res.status(401).json({ message: "You are not authorized." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);

    // Check if the user exists in the Candidate model
    const user = await Contractor.findById(payload._id);
    
    if (!user) {
      return res.status(401).json({ message: "Contractor not found" });
    }

    // Verify user type
    if (user.userRole !== 'contractor') {
      return res.status(401).json({message: "You are not authorized" });
    }

    req.user = { userId: payload._id, userRole: user.userRole };
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default ContractorAuth;
