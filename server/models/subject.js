import mongoose from "mongoose";


const subjectSchema = new mongoose.Schema({
    name:{type:String,require:true},
    semester:{type:mongoose.Schema.Types.ObjectId,ref:"Semester"},
    notes:[
        {
        type : mongoose.Schema.Types.ObjectId,
        ref:"Note",
        }
    ]

});
export default mongoose.model("Subject",subjectSchema);