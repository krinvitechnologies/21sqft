import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'

const adminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new Error("Invalid Email")
                }
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
        },
        userRole: {
            type: String,
            default: "admin"
        },
    },

    { timestamps: true }
);

// password hashing
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// create jwt token
adminSchema.methods.createJWT = async function () {
    return jwt.sign(
        { _id: this._id, isAdmin: this.isAdmin },
        process.env.JWT_KEY,
        // JWT_KEY,
        {
            expiresIn: "7d",
        }
    );
};


// compare password
adminSchema.methods.comparePassword = async function (userPassword) {
    const isMatch = bcrypt.compare(userPassword, this.password);
    return isMatch;
};

// Creating model
export default mongoose.model("Admin", adminSchema);
