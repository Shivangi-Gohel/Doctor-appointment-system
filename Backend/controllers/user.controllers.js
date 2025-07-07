import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Appointment } from "../models/appointment.model.js";
import moment from "moment";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if ([email, username, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exist");
  }

  const user = await User.create({
    email,
    password,
    username: username.toLowerCase(),
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, createUser, "User registered successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(404, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in Successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => { 

  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "Lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged Out"));
});

const getUserData = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "User not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, user, "User data fetched successfully"));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while getting user data");
  }
});

const applyDoctor = asyncHandler(async (req, res) => {
  try {
    const existingDoctor = await Doctor.findOne({ email: req.body.email });
    if (existingDoctor) {
      return res
        .status(400)
        .json(
        { 
          success: false,
          message: "Doctor with this email already applied." 
        });
    }
    const doctor = await Doctor({ ...req.body, status: "pending" });
    await doctor.save();
    const adminUser = await User.findOne({ isAdmin: true });
    const notification = adminUser.notification || [];
    notification.push({
      type: "apply-doctor",
      message: `${doctor.firstname} ${doctor.lastname} Has applied for a doctor account`,
      data: {
        doctorId: doctor._id,
        name: doctor.firstname + " " + doctor.lastname,
        onClickPath: "/admin/doctors",
      },
    });
    await User.findByIdAndUpdate(adminUser._id, { $set: { notification } });
    // throw new ApiResponse(200, {}, "Doctor applied successfully");
    return res.status(200).json({
      success: true,
      message: "Doctor applied successfully",
      notification: notification,
    });
  } catch (error) {
    console.log(error);
    // throw new ApiError(500, "Error while Applying For Doctor");
    return res.status(500).json({
      success: false,
      message: "Error while applying for doctor",
    });
  }
});

const getNotifications = asyncHandler(async (req, res) => {
  try {
    const user =  await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(404, "User not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, user.notification, "User data fetched successfully"));
    } 
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while getting user data");
  }
}
);

const getAllDoctor = asyncHandler(async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: "approved" });
    if (!doctors) {
      throw new ApiError(404, "Doctors not found");
    } else {
      return res
        .status(200)
        .json(new ApiResponse(200, doctors, "Doctors data fetched successfully"));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while getting user data");
  }
}
);

const bookAppointment = asyncHandler(async (req, res) => {
  try {
    const startDateTime = moment(`${req.body.date} ${req.body.time.start}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
    const endDateTime = moment(`${req.body.date} ${req.body.time.end}`, 'DD-MM-YYYY HH:mm').format('YYYY-MM-DDTHH:mm');
    req.body.date = moment(req.body.date, 'DD-MM-YYYY').format('YYYY-MM-DD');

    req.body.time.start = startDateTime
    req.body.time.end = endDateTime;
    req.body.status = "pending";
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    const user = await User.findOne({ _id: req.body.doctorInfo.userId });
    user.notification.push({
      type: "New-Appointment",
      message: `A new Appointment request from ${req.body.userInfo.user.username}`,
      onClickPath: "/users/appointments",
    });
    await user.save();
    return res
      .status(200)
      .json(new ApiResponse(200, newAppointment, "Appointment booked successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while booking appointment");
  }
});

const bookingAvailability = asyncHandler(async (req, res) => {
  try {
    const date = moment(req.body.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const fromTime = moment(req.body.time.start, 'HH:mm').subtract(1, 'hours').toISOString();
    const toTime = moment(req.body.time.end, 'HH:mm').add(1, 'hours').toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date: { $eq: date },
      "time.start": { $lt: toTime },
      "time.end": { $gt: fromTime },
    });
    
    if(appointments.length === 0) {
      return res.status(200).json(new ApiResponse(200, appointments, "Appointment available at this time"));
    }
    if(appointments.length > 0) {
      return res.status(200).json(new ApiResponse(200, "Appointment not available at this time"));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while fetching booked slots");
  }
});

const userAppointment = asyncHandler(async (req, res) => {
  try {
    const userId = req.user?._id;
    
    const appointments = await Appointment.find({userId})
    
    return res.status(200).json(new ApiResponse(200, appointments, " Users appointments fetch Successfully"))
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Something went wrong while fetching appointment data")
  }
})


export { registerUser, loginUser, logoutUser, getUserData, applyDoctor, getAllDoctor, getNotifications, bookAppointment, bookingAvailability, userAppointment };