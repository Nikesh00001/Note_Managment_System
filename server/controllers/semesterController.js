import Semester from "../models/semester.js";
import Year from "../models/year.js";

export const createsemester = async (req ,res )=>{
    try{
        const {yearId}=req.params;
        const semester =new Semester({...req.body,year:yearId});
    await semester.save();
    await Year.findByIdAndUpdate(yearId,{$push:{semesters:semester._id}});
    res.status(201).json(semester);
    }
    catch(err){
        res.status(400).json({error :err.message})
    }
}

export const getsemester = async (req ,res)=>{
    try{
        const {yearId} =req.params;
        const semesters =await Semester.find({year:yearId}).populate("subjects");
    res.json(semesters);

    }
    catch(err){
        res.status(500).json({error:err.message})
    }
}