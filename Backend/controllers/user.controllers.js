import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Doctor } from "../models/doctor.model.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

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
  console.log(accessToken, refreshToken);

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
  console.log("REQ.USER: ", req.user);

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

export { registerUser, loginUser, logoutUser, getUserData, applyDoctor };
