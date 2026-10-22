import { Router } from "express";
import auth from "../middleware/auth.js";
import {
  getuser,
  getallusers,
  login,
  register,
  updateprofile,
  deleteuser,
} from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/getuser/:id", auth, getuser);
userRouter.get("/getallusers", auth, getallusers);
userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.put("/updateprofile", auth, updateprofile);
userRouter.delete("/deleteuser", auth, deleteuser);

export default userRouter;
