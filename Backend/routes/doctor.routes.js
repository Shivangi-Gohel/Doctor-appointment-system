import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getDoctorInfo, updateProfile, getDoctorById } from "../controllers/doctor.controller.js";

const router = Router();

router.post("/getDoctorInfo", verifyJWT, getDoctorInfo)
router.post("/updateProfile", verifyJWT, updateProfile)
router.post("/getDoctorById", verifyJWT, getDoctorById)

export default router;