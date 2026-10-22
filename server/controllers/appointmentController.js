import Appointment from "../models/appointmentModel.js";
import Notification from "../models/notificationModel.js";
import User from "../models/userModel.js";

const getallappointments = async (req, res) => {
  const keyword = req.query.search
    ? { $or: [{ userId: req.query.search }, { doctorId: req.query.search }] }
    : {};
  const appointments = await Appointment.find(keyword)
    .populate("doctorId")
    .populate("userId");
  return res.json(appointments);
};

const bookappointment = async (req, res) => {
  const appointment = new Appointment({
    date: req.body.date,
    time: req.body.time,
    doctorId: req.body.doctorId,
    userId: req.locals,
  });
  await appointment.save();

  const user = await User.findById(req.locals);

  const usernotification = new Notification({
    userId: req.locals,
    content: `You booked an appointment with Dr. ${req.body.doctorname} for ${req.body.date} ${req.body.time}`,
  });
  await usernotification.save();

  const doctornotification = new Notification({
    userId: req.body.doctorId,
    content: `You have an appointment with ${user.firstname} ${user.lastname} on ${req.body.date} at ${req.body.time}`,
  });
  await doctornotification.save();

  return res.status(201).json(appointment);
};

const completed = async (req, res) => {
  await Appointment.findByIdAndUpdate(req.body.appointid, {
    status: "Completed",
  });

  const user = await User.findById(req.locals);

  const usernotification = new Notification({
    userId: user._id,
    content: `Your appointment with ${req.body.doctorname} has been completed`,
  });
  await usernotification.save();

  const doctornotification = new Notification({
    userId: req.body.doctorId,
    content: `Your appointment with ${user.firstname} ${user.lastname} has been completed`,
  });
  await doctornotification.save();

  return res.status(201).json({ message: "Appointment completed" });
};

export { getallappointments, bookappointment, completed };
