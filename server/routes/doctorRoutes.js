import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getalldoctors,
  getnotdoctors,
  deletedoctor,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
} from "../controllers/doctorController.js";

const doctorRouter = Router();

doctorRouter.get("/getalldoctors", getalldoctors);
doctorRouter.get("/getnotdoctors", auth, getnotdoctors);
doctorRouter.post("/applyfordoctor", auth, applyfordoctor);
doctorRouter.put("/deletedoctor", auth, deletedoctor);
doctorRouter.put("/acceptdoctor", auth, acceptdoctor);
doctorRouter.put("/rejectdoctor", auth, rejectdoctor);

export default doctorRouter;
