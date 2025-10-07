import express from "express";
import { createYear,getYear } from "../controllers/yearController.js";
import year from "../models/year.js";

const router =express.Router();


router.get("/:courseId/years",getYear);
router.post("/:courseId/years",createYear);

export default router;