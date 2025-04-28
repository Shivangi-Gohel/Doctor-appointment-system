import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

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


export { getDoctorInfo, updateProfile, getDoctorById };