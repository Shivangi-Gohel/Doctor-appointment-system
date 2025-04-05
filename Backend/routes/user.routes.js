import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { loginUser, registerUser, logoutUser } from "../controllers/user.controllers.js";

const router = Router();

router.post('/register', registerUser);
router.post("/login",loginUser)
router.post("/logout", verifyJWT, logoutUser)

export default router;