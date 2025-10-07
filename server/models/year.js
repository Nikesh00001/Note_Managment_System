import mongoose from "mongoose";


const yearSchema = new mongoose.Schema({
    name:{type:String,require:true},
    semesters:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Semester",
        }
    ],
    course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"}
});

export default mongoose.model("Year",yearSchema);