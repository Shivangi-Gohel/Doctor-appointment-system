import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";

const getDoctorInfo = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ userId: req.body.userId })
        if (!doctor) {
            throw new ApiError(404, "Doctor not found");
        }
        return res.status(200).json(new ApiResponse(200, doctor, "Doctor info fetched successfully"));
        
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while getting doctor info");
    }
})

const updateProfile = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findOneAndUpdate({ userId: req.body.userId }, req.body);
        return res.status(200).json(new ApiResponse(200, doctor, "Doctor profile updated successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while updating profile");
    }
})

const getDoctorById = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findOne({ _id: req.body.doctorId });
        if (!doctor) {
            throw new ApiError(404, "Doctor not found");
        }
        return res.status(200).json(new ApiResponse(200, doctor, "Doctor info fetched successfully"));
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while getting doctor info");
    }
}
);

const doctorAppointment = asyncHandler(async (req, res) => {
    try {
        const doctor = await Doctor.findOne({userId: req.user._id})
        
        const appointments = await Appointment.find({doctorId: doctor._id})
        return res.status(200).json(new ApiResponse(200, appointments, "Doctor appointments fetch successfully"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error in doctor aapointments")
    }
})

const updateStatus = asyncHandler(asyncHandler(async (req, res) => {
    try {
        const {appointmentsId, status} = req.body;
        const appointments = await Appointment.findByIdAndUpdate(appointmentsId, {status})
        const user = await User.findOne({_id: appointments.userId});
        user.notification.push({
            type: "status-updated",
            message: `Your appointment has been updated ${status}`,
            onClickPath: "/doctors/appointments",
        });
        await user.save();
        return res.status(200).json(new ApiResponse(200, "Appointment status updated"))
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Error in update Status")
    }
}))


export { getDoctorInfo, updateProfile, getDoctorById, doctorAppointment, updateStatus };