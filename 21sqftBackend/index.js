import express from "express"; // changed type to module in package.json
import cors from "cors"; // to allow cross origin requests
import morgan from "morgan"; // logs which api has been hit
import cookieParser from "cookie-parser";
import connectDb from "./utils/db.js"; //to connect to database

//security packages
import ExpressMongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

import subscribeRouter from "./routers/subscribeRouter.js";
import contactUsRouter from "./routers/contactusRouter.js";
import getInTouchRouter from "./routers/getInTouchRouter.js";
import contractorRouter from "./routers/contractorRouter.js";
import contractorAuthRouter from "./routers/contractorAuthRouter.js";
import userRouter from "./routers/userRouter.js";
import sendEnquiryRouter from "./routers/sendEnquiryRouter.js";
import adminRouter from './routers/adminRouter.js'

//database connection
connectDb();

// initializing express
const app = express()

// middlewares
app.use(ExpressMongoSanitize()); //to secure database
app.use(helmet()); //to secure header data
app.use(express.json({ limit: '20mb' })); //to use json data in our application
app.use(express.urlencoded({ limit: '20mb', extended: true }));
app.use(cookieParser());
app.use(
  cors({
    // origin: 'http://localhost:3000', // Allow requests from this origin
    origin: 'https://21sqft.netlify.app', // Allow requests from this origin
    credentials: true,
  })
);
app.use(morgan("dev")); //logs which api route has been called and other info
app.use(express.static('public'));

app.use("/api/V1/user", userRouter);
app.use("/api/v1/contractor", contractorRouter);
app.use("/api/v1/contractor/auth", contractorAuthRouter);
app.use("/api/v1", subscribeRouter);
app.use("/api/v1", getInTouchRouter);
app.use("/api/v1", contactUsRouter);
app.use("/api/v1/send-enquiry", sendEnquiryRouter);
app.use("/api/V1/admin", adminRouter);

// Listen on port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
