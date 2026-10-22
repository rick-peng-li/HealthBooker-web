import Notification from "../models/notificationModel.js";

const getallnotifs = async (req, res) => {
  const notifs = await Notification.find({ userId: req.locals }).sort({
    createdAt: -1,
  });
  return res.json(notifs);
};

export { getallnotifs };
