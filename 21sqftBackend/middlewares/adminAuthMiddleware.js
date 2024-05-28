import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";

const AdminAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization)
        return res.status(401).json({ message: "You are not authorized." });

    const token = authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "You are not authorized." });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_KEY);

        // Check if the admin exists in the admin model
        const user = await Admin.findById(payload._id);

        if (!user) {
            return res.status(401).json({ message: "Admin Not Found" });
        }

        // Verify user type
        if (user.userRole !== 'admin') {
            return res.status(401).json({ message: "You are not authorized." });
        }

        req.user = { userId: payload._id, userRole: user.userRole };
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default AdminAuth;
