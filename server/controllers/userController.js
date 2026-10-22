import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

const getuser = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.json(user);
};

const getallusers = async (req, res) => {
  const users = await User.find({ _id: { $ne: req.locals } }).select(
    "-password"
  );
  return res.json(users);
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Incorrect credentials" });
  }
  const verifyPass = await bcrypt.compare(password, user.password);
  if (!verifyPass) {
    return res.status(400).json({ message: "Incorrect credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "2 days" }
  );
  return res
    .status(201)
    .json({ message: "User logged in successfully", token });
};

const register = async (req, res) => {
  const emailPresent = await User.findOne({ email: req.body.email });
  if (emailPresent) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPass = await bcrypt.hash(req.body.password, 10);
  const user = new User({ ...req.body, password: hashedPass });
  await user.save();
  return res.status(201).json({ message: "User registered successfully" });
};

const updateprofile = async (req, res) => {
  const updates = { ...req.body };
  if (updates.password && updates.password.length >= 5) {
    updates.password = await bcrypt.hash(updates.password, 10);
  } else {
    delete updates.password;
  }
  const result = await User.findByIdAndUpdate(req.locals, updates, {
    returnDocument: "after",
  });
  if (!result) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(201).json({ message: "User updated successfully" });
};

const deleteuser = async (req, res) => {
  await User.findByIdAndDelete(req.body.userId);
  await Doctor.findOneAndDelete({ userId: req.body.userId });
  await Appointment.deleteMany({ userId: req.body.userId });
  return res.json({ message: "User deleted successfully" });
};

export { getuser, getallusers, login, register, updateprofile, deleteuser };
