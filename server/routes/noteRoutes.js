import express from "express";
import { createNote,getNote } from "../controllers/noteController.js";
import upload from "../middleware/upload.js";

const Router =express.Router();

Router.post("/:subjectId/notes",upload.single("file"),createNote);
Router.get("/:subjectId/notes",getNote);

export default Router;