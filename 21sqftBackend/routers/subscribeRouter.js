import express from "express";
import { subscribe } from "../controllers/subscribeContoller.js";

const subscribeRouter = express.Router();

// subscribe route
subscribeRouter.route("/subscribe").post(subscribe);

export default subscribeRouter;