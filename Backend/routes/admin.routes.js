import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getAllUsers, getAllDoctors, changeAccountStatus } from "../controllers/admin.controller.js";

const router = Router();

router.get("/getAllUsers", verifyJWT, getAllUsers)
router.get("/getAllDoctors", verifyJWT, getAllDoctors)
router.post("/changeAccountStatus", verifyJWT, changeAccountStatus)

export default router;