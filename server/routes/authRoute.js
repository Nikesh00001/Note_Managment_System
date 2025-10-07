import express from "express";
import { Profile, Signin, Signup } from "../controllers/authcontroller.js";
import { authMiddleware } from "../middleware/AuthMiddleware.js";

const router =express.Router();
router.post("/auth/signup",Signup);
router.post("/auth/signin",Signin);
router.get("/auth/profile",authMiddleware,Profile);
export default router;

