import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getAllUsers, getAllDoctors } from "../controllers/admin.controller.js";
import { ApiResponse } from "../utils/apiResponse.js";

const router = Router();

router.get("/getAllUsers", verifyJWT, getAllUsers)
router.get("/getAllDoctors", verifyJWT, getAllDoctors)

export default router;