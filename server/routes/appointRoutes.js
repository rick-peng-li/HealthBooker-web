import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getallappointments,
  bookappointment,
  completed,
} from "../controllers/appointmentController.js";

const appointRouter = Router();

appointRouter.get("/getallappointments", auth, getallappointments);
appointRouter.post("/bookappointment", auth, bookappointment);
appointRouter.put("/completed", auth, completed);

export default appointRouter;
