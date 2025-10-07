import Semester from "../models/semester.js";
import Subject from "../models/subject.js";

export const createSubject = async (req ,res) =>{
    try {
        const {semesterId} =req.params;
        const subject =new Subject({...req.body,semester:semesterId});
        await subject.save()
        await Semester.findByIdAndUpdate(semesterId,{$push:{subjects:subject._id}});
        res.status(201).json(subject);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}
export const getSubject = async (req,res)=>{
    try{
        const{semesterId}=req.params;
        const subject = await Subject.find({semester:semesterId}).populate("notes");
        res.json(subject);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}