import express from "express";
import { getCourse,createCourse } from "../controllers/courseController.js";

const router = express.Router();



router.post("/courses",createCourse);
router.get("/courses",getCourse);

export default router;