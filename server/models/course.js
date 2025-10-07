import mongoose from "mongoose";


const courseSchema =new mongoose.Schema({
    name:{type:String,require:true},
    code:{type:String,default:"N/A" , unique: true },
    years:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Year",
        }
    ]
});

export default mongoose.model("Course",courseSchema);