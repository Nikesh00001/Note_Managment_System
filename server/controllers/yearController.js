import Course from "../models/course.js";
import Year from "../models/year.js";

export const createYear = async (req,res) =>{
    try{
        const {courseId} =req.params;
        const year = new Year({...req.body,course:courseId});
    await year.save();
    await Course.findByIdAndUpdate(courseId,{$push:{years:year._id}})
    res.status(201).json(year);
    }
    catch(err){
        res.status(400).json({error:err.message})
    }
};

export const getYear = async (req,res)=>{
    try{
        const {courseId} =req.params;
        const years = await Year.find({course:courseId}).populate("semesters");
    res.json(years);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};