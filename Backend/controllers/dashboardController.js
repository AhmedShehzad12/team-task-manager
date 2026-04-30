import Task from "../models/Task.js";

export const getDashboard = async (req, res) => {
  const total = await Task.countDocuments();
  const done = await Task.countDocuments({ status: "Done" });

  res.json({ total, done });
};