import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

const UserAuth = async (req, res, next) => {
  const token = req.cookies['21sqft'];
  // console.log('token', token);
  if (!token) {
    return res.status(401).json({ message: "You are not authorized." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_KEY);

    // Check if the user exists in the Candidate model
    const user = await User.findById(payload._id);

    if (!user) {
      return res.status(401).json({ messsage: "User not found" });
    }

    // Verify user type
    if (user.userRole !== 'user') {
      return res.status(401).json({ message: "You are not authorized" });
    }

    req.user = { userId: payload._id, userRole: user.userRole };
    next();
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default UserAuth;
