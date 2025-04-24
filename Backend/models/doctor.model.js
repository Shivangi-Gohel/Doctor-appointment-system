import mongoose, { Schema } from "mongoose";

const doctorSchema = new Schema({
    userId: {
        type: String
    },
    firstname: {
        type: String,
        required: [true, 'first name is required']
    },
    lastname: {
        type: String,
        required: [true, 'last name is required']
    },
    phone: {
        type: String,
        required: [true, 'phone number is required']
    },
    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true
    },
    website: {
        type: String
    },
    address: {
        type: String,
        required: [true, 'address is required']
    },
    specialization: {
        type: String,
        required: [true, 'specialization is required']
    },
    experience: {
        type: String,
        required: [true, 'experience is required']
    },
    fees: {
        type: Number,
        required: [true, 'fees is required']
    },
    status: {
        type: String,
        default: 'pending'
    },
    timings: {
        type: Object,
        required: [true, 'work timings is required']
    }
}, {
    timestamps: true
})




export const Doctor = mongoose.model("Doctor", doctorSchema)