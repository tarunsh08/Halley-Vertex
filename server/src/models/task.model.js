import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  type: { type: String },
  result: { type: String, default: "" },
  status: { type: String, default: "pending" }, 
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
