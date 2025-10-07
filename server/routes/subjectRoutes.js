import express from "express";
import { createSubject,getSubject } from "../controllers/subjectController.js";

const Routes =express.Router();
Routes.post("/:semesterId/subjects",createSubject);
Routes.get("/:semesterId/subjects",getSubject);

export default Routes;