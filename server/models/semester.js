import mongoose from "mongoose";
import Subjects from "./subject.js";


const semesterSchema = new mongoose.Schema({
    name:{type:String,require:true},
    year:{type:mongoose.Schema.Types.ObjectId,ref:"Year"},
    subjects:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Subject"
    }]
});

export default mongoose.model("Semester",semesterSchema);