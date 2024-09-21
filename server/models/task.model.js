import mongoose, { Schema } from "mongoose";

const TaskSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: ["To Do", "In Progress", "Completed"], default: "To Do" },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    dueDate: Date,
    userId: { type: Schema.Types.ObjectId, ref: 'Usermodel' }
});

export const Taskmodel = mongoose.model('Task', TaskSchema);
