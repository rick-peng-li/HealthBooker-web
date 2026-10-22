import { Router } from "express";
import auth from "../middleware/auth.js";
import { getallnotifs } from "../controllers/notificationController.js";

const notificationRouter = Router();

notificationRouter.get("/getallnotifs", auth, getallnotifs);

export default notificationRouter;
