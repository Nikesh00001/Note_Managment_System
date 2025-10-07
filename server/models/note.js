
import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({
    title:{type:String,require:true},
    file:{type:String,require:true},
    type:{type:String,require:true},
    uploadedAt:{type:Date,default:Date.now},
    subject:{ type: mongoose.Schema.Types.ObjectId,
        ref:"Subject"
     }
});


export default mongoose.model("Note",noteSchema);