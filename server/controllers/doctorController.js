import Doctor from "../models/doctorModel.js";
import User from "../models/userModel.js";
import Notification from "../models/notificationModel.js";
import Appointment from "../models/appointmentModel.js";

const getalldoctors = async (req, res) => {
  const doctors = await Doctor.find({ isDoctor: true }).populate("userId");
  return res.json(doctors);
};

const getnotdoctors = async (req, res) => {
  const doctors = await Doctor.find({ isDoctor: false }).populate("userId");
  return res.json(doctors);
};

const applyfordoctor = async (req, res) => {
  const alreadyFound = await Doctor.findOne({ userId: req.locals });
  if (alreadyFound) {
    return res.status(400).json({ message: "Application already exists" });
  }
  const doctor = new Doctor({ ...req.body.formDetails, userId: req.locals });
  await doctor.save();
  return res.status(201).json({ message: "Application submitted successfully" });
};

const acceptdoctor = async (req, res) => {
  await User.findByIdAndUpdate(req.body.id, {
    isDoctor: true,
    status: "accepted",
  });
  await Doctor.findOneAndUpdate({ userId: req.body.id }, { isDoctor: true });
  const notification = new Notification({
    userId: req.body.id,
    content: "Congratulations, Your application has been accepted.",
  });
  await notification.save();
  return res
    .status(201)
    .json({ message: "Application accepted notification sent" });
};

const rejectdoctor = async (req, res) => {
  await User.findByIdAndUpdate(req.body.id, {
    isDoctor: false,
    status: "rejected",
  });
  await Doctor.findOneAndDelete({ userId: req.body.id });
  const notification = new Notification({
    userId: req.body.id,
    content: "Sorry, Your application has been rejected.",
  });
  await notification.save();
  return res
    .status(201)
    .json({ message: "Application rejection notification sent" });
};

const deletedoctor = async (req, res) => {
  await User.findByIdAndUpdate(req.body.userId, { isDoctor: false });
  await Doctor.findOneAndDelete({ userId: req.body.userId });
  await Appointment.deleteMany({ doctorId: req.body.userId });
  return res.json({ message: "Doctor deleted successfully" });
};

export {
  getalldoctors,
  getnotdoctors,
  deletedoctor,
  applyfordoctor,
  acceptdoctor,
  rejectdoctor,
};
