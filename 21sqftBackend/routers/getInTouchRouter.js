import express from "express";
import { getInTouch } from "../controllers/getInTouchController.js";

const getInTouchRouter = express.Router();

// get in touch with us
getInTouchRouter.route("/get-in-touch-with-us").post(getInTouch);

export default getInTouchRouter;