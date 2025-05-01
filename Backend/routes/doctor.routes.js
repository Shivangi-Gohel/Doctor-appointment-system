import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getDoctorInfo, updateProfile, getDoctorById, doctorAppointment, updateStatus } from "../controllers/doctor.controller.js";

const router = Router();

router.post("/getDoctorInfo", verifyJWT, getDoctorInfo)
router.post("/updateProfile", verifyJWT, updateProfile)
router.post("/getDoctorById", verifyJWT, getDoctorById)
router.get("/doctor-appointments", verifyJWT, doctorAppointment)
router.post("/update-status", verifyJWT, updateStatus)

export default router;