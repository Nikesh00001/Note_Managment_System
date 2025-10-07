import express from "express";
import { createsemester,getsemester } from "../controllers/semesterController.js";

const Router =express.Router();

Router.get("/:yearId/semesters",getsemester);
Router.post("/:yearId/semesters",createsemester);

export default Router;
