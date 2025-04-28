import mongoose, { Schema } from "mongoose";

const appointmentSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    doctorInfo: {
        type: Object,
        required: true
    },
    userInfo: {
        type: Object,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    time: {
        type: Object,
        required: true
    },
}, {
    timestamps: true
})




export const Appointment = mongoose.model("Appointment", appointmentSchema)