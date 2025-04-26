import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({}).select("-password -refreshToken");
    if (!users || users.length === 0) {
      throw new ApiError(404, "No users found");
    }
    return res.status(200).json(new ApiResponse(200, users, "Users fetched successfully"));
  } catch (error) {
    throw new ApiError(500, "Error fetching users");
  }
}); 

const getAllDoctors = asyncHandler(async (req, res) => {
    try {
      const doctors = await Doctor.find({}).select("-password -refreshToken");
      if (!doctors || doctors.length === 0) {
        throw new ApiError(404, "No Doctor found");
      }
      return res.status(200).json(new ApiResponse(200, doctors, "Doctors fetched successfully"));
    } catch (error) {
      throw new ApiError(500, "Error fetching doctors");
    }
}); 

const changeAccountStatus = asyncHandler(async (req, res) => {  
  try {
    const {doctorId, status} = req.body;
    const doctor = await Doctor.findByIdAndUpdate(doctorId, {status});
    const user = await User.findOne({_id: doctor.userId});
    
    const notification = user.notification;
    notification.push({
      type: "doctor-status-updated",
      message: `Your account status has been updated to ${status}`,
      onClickPath: "/notification",
    })
    user.isDoctor = status === 'approved' ? true: false;
    await user.save();
    res.status(200).json(new ApiResponse(200, doctor, "Doctor status updated successfully"));
  } catch (error) {
    throw new ApiError(500, "Error updating Doctor status");
  }
}
);

export { getAllUsers, getAllDoctors, changeAccountStatus };