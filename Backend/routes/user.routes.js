import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { loginUser, registerUser, logoutUser, getUserData, applyDoctor } from "../controllers/user.controllers.js";

const router = Router();

router.post('/register', registerUser);
router.post("/login",loginUser)
router.post("/logout", verifyJWT, logoutUser)
router.get("/", verifyJWT, getUserData)
router.get("/me", verifyJWT, getUserData)
router.post("/apply-doctor", verifyJWT, applyDoctor)

export default router;