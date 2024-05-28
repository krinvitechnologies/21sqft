import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDb = async () => {
    try {
        const connect_ = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Database Connected at ${mongoose.connection.host}`);
    } catch (error) {
        console.log(`Mongoose Error ${error}`);
    }
};

export default connectDb;