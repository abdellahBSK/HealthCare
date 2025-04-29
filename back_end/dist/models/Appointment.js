import mongoose from "mongoose";
const appointmentSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    date: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    status: {
        type: String,
        enum: [
            "scheduled",
            "confirmed",
            "in-progress",
            "completed",
            "cancelled",
            "no-show",
        ],
        default: "scheduled",
    },
    reason: {
        name: String,
        reasonType: {
            type: String,
            enum: ["physic", "mental"],
        },
    },
    notes: [String],
    meetingLink: String,
    meetingId: String,
    message: {
        text: String,
        userType: { enum: ["patient", "doctor"], type: String },
    },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.models.Appointment ||
    mongoose.model("Appointment", appointmentSchema);
