import Admin from '../models/adminModel.js';
import validator from "validator";
import { Contractor } from '../models/contractorModel.js';

// admin candidate
// export const AdminRegister = async (req, res, next) => {
//     try {
//         const { email, password, } = req.body;

//         // Validation checks
//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: "All Fields Are Required" });
//         }

//         if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
//             return res.status(400).json({ success: false, message: "Please enter a valid email address" });
//         }

//         if (!validator.isEmail(email)) {
//             return res.status(400).json({ message: 'Please enter a valid email address' });
//         }

//         if (password.length < 6) {
//             return res.status(400).json({ success: false, message: "Password length must be at least 6 characters" });
//         }

//         // Check if user already exists
//         const existingUser = await Admin.findOne({ email: email });
//         if (existingUser) {
//             return res.status(400).json({ success: false, message: "You have already register Please Login!" });
//         }

//         // Create and save the new user
//         const newUser = await Admin.create(req.body);

//         // Generate token
//         const token = await newUser.createJWT();

//         // Save the user with the token
//         await newUser.save();

//         // Set cookie
//         res.cookie("21sqft", token, {
//             expires: new Date(Date.now() + 9000000),
//             httpOnly: true,
//             secure: true,
//             // sameSite: 'Strict',
//             sameSite: 'None',
//         });

//         // Respond with success and user details
//         res.status(200).json({
//             success: true,
//             message: "Admin Registered Successfully",
//             token,
//             admin: {
//                 email: newUser.email,
//             }
//         });
//     } catch (error) {
//         // Handle Mongoose validation errors
//         if (error.name === 'ValidationError') {
//             const validationErrors = {};
//             Object.keys(error.errors).forEach((key) => {
//                 validationErrors[key] = error.errors[key].message;
//             });
//             console.log('Validation errors:', validationErrors);
//             return res.status(400).json({ success: false, errors: validationErrors });
//         }

//         // Handle other errors
//         console.error('Registration error:', error);
//         res.status(500).json({ success: false, error: "Internal Server Error" });
//     }
// };

// admin login
export const AdminLogin = async (req, res, next) => {

    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email is required" });
    }

    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        return res.status(400).json({ success: false, message: "Invalid Email" });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: 'Please enter a valid email' });
    }

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    }

    if (password.length < 6) {
        return res.status(400).json({ success: false, message: "Wrong Email Or Password" });
    }

    let user = await Admin.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ success: false, message: "Wrong Email Or Password" });

    const check = await user.comparePassword(password);

    if (!check) return res.status(400).json({ success: false, message: "Wrong Email Or Password" });

    const token = await user.createJWT();

    user.password = undefined;

    // cookie generate
    res.cookie("21sqft", token, {
        expires: new Date(Date.now() + 9000000),
        httpOnly: true,
        secure: true,
        // sameSite: 'Strict',
        sameSite: 'None',
    });

    user = { ...user._doc, token };

    res.status(200).json({
        message: "Login Successfully",
        success: true,
        token,
        admin: {
            email: user.email,
        }
    });
};

// contractor status update 
export const updateContractorStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const { _id } = req.params;
        if (!status) throw new Error('status is not defined!');
        if (status === 'Accepted') {
            await Contractor.findOneAndUpdate({ _id }, {
                $set: {
                    status
                }
            })
            return res.status(200).json({ message: 'Contractor status update successfully!' })
        }
        if (status === 'Rejected') {
            await Contractor.findOneAndDelete({ _id });
            return res.status(200).json({ message: 'Contractor delete successfully!' })

        }
        throw new Error('Invalid Status!');
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
